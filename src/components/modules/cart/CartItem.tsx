import { Button } from '@/components/ui/button';
import { ICart } from '@/types';
import { Minus, Plus, X } from 'lucide-react';

interface CartItemProps {
  cart: ICart;
  onQuantityChange: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem = ({ cart, onQuantityChange, onRemove }: CartItemProps) => {
  const total = Number(cart.price * cart.quantity);

  return (
    <tr className='border-b border-border'>
      {/* PRODUCT */}
      <td className='py-4 pl-4'>
        <div className='flex items-start gap-4'>
          {/* Thumbnail */}
          <div className='relative'>
            <img
              src={cart.image}
              alt={cart.name}
              className='w-20 h-20 object-cover rounded-lg bg-secondary'
            />

            {/* Remove Button */}
            <button
              onClick={() => onRemove(cart.id)}
              className='absolute -top-2 -right-2 bg-card border border-border 
                         rounded-full p-1 hover:bg-destructive hover:text-destructive-foreground 
                         transition-colors'
              aria-label='Remove item'
            >
              <X className='w-3 h-3' />
            </button>
          </div>

          {/* Product Details */}
          <div className='flex-1'>
            <h4 className='font-medium text-foreground mb-2'>{cart.name}</h4>

            <div className='text-sm text-muted-foreground space-y-1'>
              <p>
                Color: <span className='text-foreground'>{cart.color}</span>
              </p>
              <p>
                Size:{' '}
                <span className='text-foreground'>{cart.size || 'XL'}</span>
              </p>
            </div>
          </div>
        </div>
      </td>

      {/* STOCK */}
      <td className='py-4 px-4'>
        <span className='text-sm text-foreground'>{cart.stock} in stocks</span>
      </td>

      {/* PRICE */}
      <td className='py-4 px-4'>
        <span className='font-medium text-foreground'>৳{cart.price}</span>
      </td>

      {/* QUANTITY CONTROLS */}
      <td className='py-4 px-4'>
        <div className='flex items-center gap-2 bg-[#f7fbfe] rounded-md p-1 w-fit'>
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8'
            onClick={() =>
              onQuantityChange(cart.id, Math.max(1, cart.quantity - 1))
            }
          >
            <Minus className='w-4 h-4' />
          </Button>

          <span className='w-8 text-center font-medium text-foreground'>
            {cart.quantity}
          </span>

          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8'
            onClick={() => onQuantityChange(cart.id, cart.quantity + 1)}
          >
            <Plus className='w-4 h-4' />
          </Button>
        </div>
      </td>

      {/* TOTAL */}
      <td className='py-4 px-4 text-right'>
        <span className='font-semibold text-foreground'>
          ৳{total.toFixed(2)}
        </span>
      </td>
    </tr>
  );
};

export default CartItem;
