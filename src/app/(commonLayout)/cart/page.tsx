// 'use client';

// import Loader from '@/components/shared/Loader';
// import OrderStepper from '@/components/shared/OrderStepper';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { getCartFromStorage, saveCartToStorage } from '@/lib/cartStorage';
// import { Minus, Plus, Trash } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';

// export interface CartItem {
//   id: number;
//   slug: string;
//   product_code: string;
//   thumbnail_url: string;
//   product_label: string;
//   sale_price: number;
//   color_name: string;
//   quantity: number;
// }

// const CartPage = () => {
//   const router = useRouter();
//   const [promoCode, setPromoCode] = useState('');
//   const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch cart from localStorage
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       const items = getCartFromStorage() || [];
//       setCartItems(items);
//       setIsLoading(false);
//     }, 500);
//     return () => clearTimeout(timeout);
//   }, []);

//   // Update quantity
//   const updateQuantity = (id: number, change: number) => {
//     if (!cartItems) return;
//     const updated = cartItems.map((item) =>
//       item.id === id
//         ? { ...item, quantity: Math.max(1, item.quantity + change) }
//         : item
//     );
//     setCartItems(updated);
//     saveCartToStorage(updated);
//   };

//   // Remove item
//   const removeItem = (id: number) => {
//     if (!cartItems) return;
//     const updated = cartItems.filter((item) => item.id !== id);
//     setCartItems(updated);
//     saveCartToStorage(updated);
//   };

//   // Clear cart
//   const clearCart = () => {
//     setCartItems([]);
//     saveCartToStorage([]);
//   };

//   // Calculate subtotal
//   const subtotal =
//     cartItems?.reduce(
//       (sum, item) => sum + item.sale_price * item.quantity,
//       0
//     ) || 0;

//   if (isLoading) {
//     return (
//       <div className='flex justify-center items-center h-[60vh]'>
//         <Loader text='Loading your cart...' />
//       </div>
//     );
//   }

//   if (!cartItems || cartItems.length === 0) {
//     return (
//       <div className='flex flex-col justify-center items-center h-[60vh] text-center'>
//         <p className='text-lg font-semibold text-gray-700 dark:text-gray-300'>
//           Your cart is empty 🛒
//         </p>
//         <button
//           onClick={() => router.push('/products')}
//           className='mt-4 px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition'
//         >
//           Continue Shopping
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <OrderStepper currentStep={1}/>

//       {/* Cart Content */}
//       <div className='container mx-auto'>
//         <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
//           {/* Cart Items */}
//           <div className='lg:col-span-2'>
//             <div className='bg-card rounded-lg shadow-sm overflow-hidden'>
//               <div className='hidden md:grid md:grid-cols-12 gap-4 p-4 border-b bg-muted/50 font-medium text-sm'>
//                 <div className='col-span-4'>Product</div>
//                 <div className='col-span-2'>Price</div>
//                 <div className='col-span-3'>Quantity</div>
//                 <div className='col-span-2'>Total</div>
//                 <div className='col-span-1'>Delete</div>
//               </div>

//               <div className='divide-y'>
//                 {cartItems.map((item) => (
//                   <div
//                     key={item.id}
//                     className='grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center'
//                   >
//                     {/* Product Info */}
//                     <div className='col-span-1 md:col-span-4 flex items-center gap-4'>
//                       <img
//                         src={item.thumbnail_url}
//                         alt={item.product_label}
//                         className='w-16 h-16 object-cover rounded'
//                       />
//                       <div>
//                         <p className='font-medium'>{item.product_label}</p>
//                         <p className='text-sm text-muted-foreground'>
//                           Color: {item.color_name}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Price */}
//                     <div className='col-span-1 md:col-span-2'>
//                       <span className='text-sm md:hidden font-medium mr-2'>
//                         Price:
//                       </span>
//                       ৳{item.sale_price}
//                     </div>

//                     {/* Quantity */}
//                     <div className='col-span-1 md:col-span-3'>
//                       <div className='flex items-center gap-2'>
//                         <Button
//                           variant='outline'
//                           size='icon'
//                           className='h-8 w-8'
//                           onClick={() => updateQuantity(item.id, -1)}
//                         >
//                           <Minus className='h-3 w-3' />
//                         </Button>
//                         <span className='w-12 text-center'>
//                           {item.quantity}
//                         </span>
//                         <Button
//                           variant='outline'
//                           size='icon'
//                           className='h-8 w-8'
//                           onClick={() => updateQuantity(item.id, 1)}
//                         >
//                           <Plus className='h-3 w-3' />
//                         </Button>
//                       </div>
//                     </div>

//                     {/* Total */}
//                     <div className='col-span-1 md:col-span-2 font-medium'>
//                       <span className='text-sm md:hidden font-medium mr-2'>
//                         Total:
//                       </span>
//                       ৳{(item.sale_price * item.quantity).toFixed(2)}
//                     </div>

//                     {/* Delete */}
//                     <button
//                       onClick={() => removeItem(item.id)}
//                       className='text-destructive hover:text-destructive/80'
//                     >
//                       <Trash className='h-4 w-4' />
//                     </button>
//                   </div>
//                 ))}
//               </div>

//               {/* Promo Code */}
//               {/* <div className='p-4 border-t'>
//                 <div className='flex gap-2 max-w-md'>
//                   <Input
//                     placeholder='Add promo code'
//                     value={promoCode}
//                     onChange={(e) => setPromoCode(e.target.value)}
//                   />
//                   <Button variant='secondary' className='shrink-0'>
//                     APPLY
//                   </Button>
//                 </div>
//               </div> */}
//             </div>

//             <div className='mt-4'>
//               <Button
//                 variant='outline'
//                 onClick={clearCart}
//                 disabled={cartItems.length === 0}
//               >
//                 Clear Cart
//               </Button>
//             </div>
//           </div>

//           {/* Cart Totals */}
//           <div className='lg:col-span-1 space-y-6'>
//             <Card className='p-6'>
//               <h2 className='text-xl font-semibold mb-6'>Cart Totals</h2>
//               <div className='space-y-4'>
//                 <div className='flex justify-between text-muted-foreground'>
//                   <span>Subtotals:</span>
//                   <span>৳{subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className='flex justify-between font-semibold text-lg pt-4 border-t'>
//                   <span>Totals:</span>
//                   <span>৳{subtotal.toFixed(2)}</span>
//                 </div>
//                 <p className='text-xs text-muted-foreground flex items-start gap-2'>
//                   <span className='text-accent'>■</span>
//                   <span>Shipping & taxes calculated at checkout</span>
//                 </p>
//                 <Button
//                   variant='secondary'
//                   className='w-full'
//                   onClick={() => {
//                     const checkoutData = {
//                       cartItems,
//                       subtotal,
//                     };
//                     // Send data to checkout page via sessionStorage
//                     sessionStorage.setItem(
//                       'checkout-data',
//                       JSON.stringify(checkoutData)
//                     );
//                     router.push('/checkout');
//                   }}
//                 >
//                   Proceed To Checkout
//                 </Button>
//               </div>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;

'use client';

import CartItem from '@/components/modules/cart/CartItem';
import { Button } from '@/components/ui/button';
import { Flame, Phone } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface CartProduct {
  id: string;
  image: string;
  name: string;
  color: string;
  size: string;
  stock: string;
  price: number;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([
    {
      id: '1',
      image:
        'https://borka-asset.tanzid.site/product-images/69163d20f404e.webp',
      name: 'Cover Up Chiffon (Blue)',
      color: 'Green-D',
      size: 'XL',
      stock: 'In Stock (12 Pcs)',
      price: 41.78,
      quantity: 1,
    },
    {
      id: '2',
      image: '/images/product-2.jpg',
      name: 'Cover Up Chiffon (White)',
      color: 'Green-D',
      size: 'XL',
      stock: 'In Stock (1 Pcs)',
      price: 41.78,
      quantity: 2,
    },
    {
      id: '3',
      image: '/images/product-7.jpg',
      name: 'Abaya Blooming Flower (Black)',
      color: 'Green-D',
      size: 'XL',
      stock: 'In Stock (12 Pcs)',
      price: 41.78,
      quantity: 1,
    },
  ]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemove = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto px-4 py-8 max-w-7xl'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
          <nav className='text-sm text-muted-foreground mb-6'>
            Home /Products/ <span className='text-foreground'>Cart</span>
          </nav>
          <div className='flex items-center gap-2 bg-card rounded-lg px-4 py-2'>
            <Flame className='w-5 h-5 text-primary' />
            <span className='text-sm text-foreground'>
              Hurry up! Your items are reserved for 24 hours
            </span>
          </div>
          <div className='flex items-center gap-2 text-sm text-foreground'>
            <Phone className='w-4 h-4' />
            <span>Help line: 01819-491091</span>
          </div>
        </div>

        <h1 className='text-3xl md:text-4xl font-bold text-foreground mb-10'>
          Shopping Cart
        </h1>
        {/* Cart Info */}
        <div className='bg-white p-6 md:p-8 rounded-2xl'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
            <p className='text-foreground'>
              You have <span className='font-semibold'>{cartItems.length}</span>{' '}
              products in your cart
            </p>
            <p className='text-sm text-muted-foreground'>
              Expected Delivery:{' '}
              <span className='font-semibold text-foreground'>Friday</span>
            </p>
          </div>

          <div className='bg-card rounded-lg border border-border overflow-x-auto mb-8'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-border'>
                  <th className='text-left py-4 px-4 font-medium text-foreground'>
                    Product
                  </th>
                  <th className='text-left py-4 px-4 font-medium text-foreground'>
                    Stock
                  </th>
                  <th className='text-left py-4 px-4 font-medium text-foreground'>
                    Price
                  </th>
                  <th className='text-left py-4 px-4 font-medium text-foreground'>
                    Quantity
                  </th>
                  <th className='text-right py-4 px-4 font-medium text-foreground'>
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    {...item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemove}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className='flex flex-col md:flex-row justify-end gap-4'>
            <div className='md:w-96'>
              <div className='flex justify-between items-center text-lg'>
                <span className='font-semibold text-foreground'>
                  Sub Total:
                </span>
                <span className='font-bold text-foreground text-xl'>
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className='flex gap-3 pt-4 items-center justify-end my-10'>
                <Link
                  href={'/products'}
                  className='underline hover:text-primary hover:underline-offset-2'
                >
                  Continue Shopping
                </Link>
                <Button className='bg-primary hover:bg-primary/90'>
                  Process To Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
