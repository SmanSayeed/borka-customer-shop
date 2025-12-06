import { sentUserCartDetails } from '@/actions/cart';
import { getBusinessCategories, getParentCategories } from '@/actions/category';
import { getProductColors, getProductSizes } from '@/actions/product';
import { initialCart } from '@/constants/cart';
import { getCartFromStorage, saveCartToStorage } from '@/lib/cartStorage';
import { ICategory, IColor, ISize } from '@/types';
import { ICart, ICartData } from '@/types/cart';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'sonner';

interface GlobalContextType {
  categories: ICategory[];
  businessCategories: any[];
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
  updateQuantity: (id: number, quantity: number, sizeId?: number) => void;
  removeItem: (id: number, sizeId?: number) => void;
  clearCart: () => void;
  isCartLoading: boolean;
  isCartSheetOpen: boolean;
  setIsCartSheetOpen: (open: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cartDetails, setCartDetails] = useState<ICartData>(initialCart);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [isCartSheetOpen, setIsCartSheetOpen] = useState(false);

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
    staleTime: 20 * 60 * 1000,
  });

  const categories = categoriesData?.data || [];
  const businessCategories = businessCategoriesData?.data || [];

  // * Get all product colors
  const { data: colorsData, isLoading: isColorLoading } = useQuery({
    queryKey: ['colors'],
    queryFn: getProductColors,
    staleTime: 20 * 60 * 1000,
  });

  // * Get all product sizes
  const { data: sizesData, isLoading: isSizeLoading } = useQuery({
    queryKey: ['sizes'],
    queryFn: getProductSizes,
    staleTime: 20 * 60 * 1000,
  });

  const colors = colorsData?.data || [];
  const sizes = sizesData?.data || [];

  const fetchCartMutation = useMutation({
    mutationFn: (products: ICart[]) => {
      setIsCartLoading(true);
      const apiPayload = products.map(({ cart_expiry, ...rest }) => rest);
      return sentUserCartDetails({ items: apiPayload });
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
      const apiPayload = updatedCart.map(({ cart_expiry, ...rest }) => rest);
      return sentUserCartDetails({ items: apiPayload });
    },

    onSuccess: (response) => {
      console.log(response, 'in success');
      if (response.success) {
        setCartDetails(response.data);
        toast.success('Added to cart successfully!');
      } else {
        toast.error('Failed to update cart');
      }
    },

    onError: () => toast.error('Something went wrong!'),
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({
      id,
      quantity,
      sizeId,
    }: {
      id: number;
      quantity: number;
      sizeId?: number;
    }) => {
      const currentCart = getCartFromStorage();
      const updatedCart = currentCart.map((p) => {
        const isSameProduct = Number(p.product_id) === Number(id);
        const isSameSize = sizeId ? Number(p.size_id) === Number(sizeId) : true;

        if (isSameProduct && isSameSize) {
          return { ...p, quantity };
        }
        return p;
      });

      saveCartToStorage(updatedCart);
      const apiPayload = updatedCart.map(({ cart_expiry, ...rest }) => rest);
      return sentUserCartDetails({ items: apiPayload });
    },

    onSuccess: (response) => {
      if (response.success) {
        setCartDetails(response.data);
      }
    },

    onError: () => toast.error('Something went wrong!'),
  });

  const removeItemMutation = useMutation({
    mutationFn: async ({ id, sizeId }: { id: number; sizeId?: number }) => {
      const currentCart = getCartFromStorage();

      const updatedCart = currentCart.filter((p) => {
        const isSameProduct = Number(p.product_id) === Number(id);
        const isSameSize = sizeId ? Number(p.size_id) === Number(sizeId) : true;

        // Keep item if it's NOT the one we want to remove
        return !(isSameProduct && isSameSize);
      });

      saveCartToStorage(updatedCart);
      const apiPayload = updatedCart.map(({ cart_expiry, ...rest }) => rest);
      return sentUserCartDetails({ items: apiPayload });
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

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      saveCartToStorage([]);
      return sentUserCartDetails({ items: [] });
    },

    onSuccess: (response) => {
      setCartDetails(initialCart);
      if (response?.success) {
        toast.success('Cart cleared successfully');
      }
    },

    onError: (error) => {
      console.error('Clear cart error:', error);
      toast.error('Something went wrong!');
    },
  });

  const value = {
    categories,
    businessCategories,
    isCategoryLoading,
    isBusinessCategoryLoading,
    cartDetails,
    setCartDetails,
    colors,
    sizes,
    fetchCart: fetchCartMutation.mutate,
    addToCart: addToCartMutation.mutate,
    updateQuantity: (id: number, quantity: number, sizeId?: number) =>
      updateQuantityMutation.mutate({ id, quantity, sizeId }),
    removeItem: (id: number, sizeId?: number) =>
      removeItemMutation.mutate({ id, sizeId }),
    clearCart: clearCartMutation.mutate,
    isColorLoading,
    isSizeLoading,
    isCartLoading,
    isCartSheetOpen,
    setIsCartSheetOpen,
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
