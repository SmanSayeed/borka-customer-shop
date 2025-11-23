import { sentUserCartDetails } from '@/actions/cart';
import { getBusinessCategories, getParentCategories } from '@/actions/category';
import { getProductColors, getProductSizes } from '@/actions/product';
import { initialCart } from '@/constants/cart';
import { getCartFromStorage, saveCartToStorage } from '@/lib/cartStorage';
import { ICategory, IColor, ISize } from '@/types';
import { ICart, ICartData } from '@/types/cart';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

// -------------------------------------------------------
// 1. Create Context
// -------------------------------------------------------
interface GlobalContextType {
  user: string | null;
  setUser: (value: string | null) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  categories: ICategory[];
  businessCategories: any[]; // Replace 'any' with proper type if available
  isCategoryLoading: boolean;
  isBusinessCategoryLoading: boolean;
  cartDetails: ICartData;
  setCartDetails: (cart: ICartData) => void;
  colors: IColor[];
  sizes: ISize[];
  isColorLoading: boolean;
  isSizeLoading: boolean;
  fetchCart: (products: ICart[]) => void;
  addToCart: (payload: { items: ICart[] }) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number, sizeId?: number) => void;
  clearCart: () => void;
  isCartLoading: boolean;
}

const GlobalContext = createContext<GlobalContextType | null>(null);

// -------------------------------------------------------
// 2. Provider Component
// -------------------------------------------------------
export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // * Get all business categories
  const { data: businessCategoriesData, isLoading: isBusinessCategoryLoading } =
    useQuery({
      queryKey: ['businessCategories'],
      queryFn: getBusinessCategories,
    });

  // * Get all parent categories
  const { data: categoriesData, isLoading: isCategoryLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getParentCategories,
    staleTime: 60 * 60 * 1000,
  });

  const categories = categoriesData?.data || [];
  const businessCategories = businessCategoriesData?.data || [];

  // * Get all product colors
  const { data: colorsData, isLoading: isColorLoading } = useQuery({
    queryKey: ['colors'],
    queryFn: getProductColors,
  });

  // * Get all product sizes
  const { data: sizesData, isLoading: isSizeLoading } = useQuery({
    queryKey: ['sizes'],
    queryFn: getProductSizes,
  });

  const colors = colorsData?.data || [];
  const sizes = sizesData?.data || [];

  // * Cart State
  const [cartDetails, setCartDetails] = useState<ICartData>(initialCart);
  const [isCartLoading, setIsCartLoading] = useState(false);

  // -------------------------------
  // 🔥 Mutation: Fetch Cart Details
  // -------------------------------
  const fetchCartMutation = useMutation({
    mutationFn: (products: ICart[]) => {
      setIsCartLoading(true);
      return sentUserCartDetails({ items: products });
    },

    onSuccess: (response, variables) => {
      if (response.success) {
        setCartDetails(response.data);
        saveCartToStorage(variables);
      } else {
        toast.error('Failed to update cart');
      }
    },

    onError: () => toast.error('Something went wrong!'),
    onSettled: () => setIsCartLoading(false),
  });

  // Load initial cart
  useEffect(() => {
    const stored = getCartFromStorage();
    if (stored.length > 0) {
      fetchCartMutation.mutate(stored);
    }
  }, []);

  // -------------------------------
  // 🔥 Mutation: Add to Cart
  // -------------------------------
  const addToCartMutation = useMutation({
    mutationFn: async (payload: { items: ICart[] }) => {
      const currentCart = getCartFromStorage();

      const newItems = payload.items.map((item) => ({
        ...item,
        cart_expiry: new Date().getTime() + 24 * 60 * 60 * 1000,
      }));

      let updatedCart = [...currentCart];

      // Merge logic
      newItems.forEach((newItem) => {
        const existingIndex = updatedCart.findIndex(
          (item) =>
            item.product_id === newItem.product_id &&
            item.size_id === newItem.size_id
        );

        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity += newItem.quantity;
          updatedCart[existingIndex].cart_expiry = newItem.cart_expiry;
        } else {
          updatedCart.push(newItem);
        }
      });

      saveCartToStorage(updatedCart);
      return sentUserCartDetails({ items: updatedCart });
    },

    onSuccess: (response) => {
      if (response.success) {
        setCartDetails(response.data);
        toast.success('Added to cart successfully!');
        window.location.href = '/cart';
      } else {
        toast.error('Failed to update cart');
      }
    },

    onError: () => toast.error('Something went wrong!'),
  });

  // -------------------------------
  // 🔥 Mutation: Update Quantity
  // -------------------------------
  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      const currentCart = getCartFromStorage();
      const updatedCart = currentCart.map((p) =>
        p.product_id === id ? { ...p, quantity } : p
      );

      saveCartToStorage(updatedCart);
      return sentUserCartDetails({ items: updatedCart });
    },

    onSuccess: (response) => {
      if (response.success) {
        setCartDetails(response.data);
      }
    },

    onError: () => toast.error('Something went wrong!'),
  });

  // -------------------------------
  // 🔥 Mutation: Remove Item
  // -------------------------------
  const removeItemMutation = useMutation({
    mutationFn: async ({ id, sizeId }: { id: number; sizeId?: number }) => {
      console.log('Removing item:', { id, sizeId });
      const currentCart = getCartFromStorage();
      
      const updatedCart = currentCart.filter((p) => {
        const isSameProduct = Number(p.product_id) === Number(id);
        const isSameSize = sizeId ? Number(p.size_id) === Number(sizeId) : true;
        
        // Keep item if it's NOT the one we want to remove
        return !(isSameProduct && isSameSize);
      });

      saveCartToStorage(updatedCart);
      return sentUserCartDetails({ items: updatedCart });
    },

    onSuccess: (response) => {
      if (response.success) {
        setCartDetails(response.data);
        toast.success('Item removed from cart');
      }
    },

    onError: (error) => {
      console.error('Remove item error:', error);
      toast.error('Something went wrong!');
    },
  });

  // -------------------------------
  // 🔥 Mutation: Clear Cart
  // -------------------------------
  const clearCartMutation = useMutation({
    mutationFn: async () => {
      console.log('Clearing cart...');
      saveCartToStorage([]);
      return sentUserCartDetails({ items: [] });
    },

    onSuccess: (response) => {
      console.log('Clear cart success response:', response);
      if (response.success) {
        setCartDetails(initialCart);
        toast.success('Cart cleared successfully');
      }
    },

    onError: (error) => {
      console.error('Clear cart error:', error);
      toast.error('Something went wrong!');
    },
  });

  const value = {
    user,
    setUser,
    theme,
    toggleTheme,
    categories,
    businessCategories,
    isCategoryLoading,
    isBusinessCategoryLoading,
    cartDetails,
    setCartDetails,
    colors,
    sizes,
    isColorLoading,
    isSizeLoading,
    fetchCart: fetchCartMutation.mutate,
    addToCart: addToCartMutation.mutate,
    updateQuantity: (id: number, quantity: number) =>
      updateQuantityMutation.mutate({ id, quantity }),
    removeItem: (id: number, sizeId?: number) =>
      removeItemMutation.mutate({ id, sizeId }),
    clearCart: clearCartMutation.mutate,
    isCartLoading,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used inside GlobalProvider');
  }
  return context;
};
