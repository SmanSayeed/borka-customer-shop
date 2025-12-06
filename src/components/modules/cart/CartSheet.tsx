'use client';

import CartItem from '@/components/modules/cart/CartItem';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '@/components/ui/sheet';
import { useGlobalContext } from '@/context/GlobalContext';
import { Phone, ShoppingBag, Trash2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartSheet() {
  const {
    isCartSheetOpen,
    setIsCartSheetOpen,
    cartDetails,
    updateQuantity,
    removeItem,
  } = useGlobalContext();
  const router = useRouter();

  const { products, cart_total, discount_amount, payable_amount } = cartDetails;

  const handleCheckout = () => {
    setIsCartSheetOpen(false);
    router.push('/checkout');
  };

  return (
    <Sheet
      open={isCartSheetOpen}
      onOpenChange={setIsCartSheetOpen}
      position='right'
    >
      <SheetContent className='w-full sm:w-[500px] bg-[#f7fbfe] flex flex-col h-full pb-6'>
        <SheetHeader className='flex items-center justify-between'>
          <div className='flex items-center justify-between gap-16 w-full'>
            <div className='text-left'>
              <SheetTitle className='text-xl font-bold text-primary flex items-center gap-2'>
                <ShoppingBag className='w-5 h-5' />
                Shopping Cart
              </SheetTitle>
              <SheetDescription className='mt-1'>
                Selected item{products.length !== 1 ? 's' : ''}{' '}
                {products.length}
              </SheetDescription>
            </div>
            <SheetClose asChild>
              <button className='rounded-full p-2 hover:bg-primary hover:text-white'>
                <span className='sr-only'>Close</span>
                <X />
              </button>
            </SheetClose>
          </div>
        </SheetHeader>

        {/* Body */}
        <div className='flex-1 overflow-y-auto p-4'>
          {products.length === 0 ? (
            <div className='h-full flex flex-col items-center justify-center text-center space-y-4'>
              <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center'>
                <Trash2 className='w-8 h-8 text-gray-400' />
              </div>
              <div className='space-y-1'>
                <h3 className='text-lg font-semibold'>Your cart is empty</h3>
                <p className='text-muted-foreground text-sm'>
                  Looks like you haven&apos;t added anything yet.
                </p>
              </div>
              <Button onClick={() => setIsCartDrawerOpen(false)}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className='space-y-4'>
              {products.map((item) => (
                <div
                  key={`${item.id}-${item.size_id}`}
                  className='rounded-lg overflow-hidden'
                >
                  <CartItem
                    item={item}
                    onQuantityChange={updateQuantity}
                    onRemove={removeItem}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {products.length > 0 && (
          <div className='p-4 space-y-4 bg-gray-50 shrink-0'>
            <div className='space-y-2 text-sm'>
              <div className='flex justify-between text-muted-foreground'>
                <span>Subtotal</span>
                <span className='text-foreground'>৳{cart_total}</span>
              </div>
              {discount_amount > 0 && (
                <div className='flex justify-between text-green-600'>
                  <span>Discount</span>
                  <span>-৳{discount_amount}</span>
                </div>
              )}
              <div className='flex justify-between font-bold text-lg pt-2 border-t'>
                <span>Total</span>
                <span className='text-primary'>৳ {payable_amount}</span>
              </div>
            </div>

            <Button onClick={handleCheckout} className='w-full'>
              Checkout
            </Button>
            <div className='flex items-center justify-center gap-2 text-sm text-gray-500'>
              <Phone className='w-4 h-4' />
              <span>Need help? Call 01819-491091</span>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
