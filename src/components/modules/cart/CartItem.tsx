import { Button } from '@/components/ui/button';
import { ICartProduct } from '@/types/cart';
import { Minus, Plus, X } from 'lucide-react';

interface ICartItemProps {
  item: ICartProduct;
  onQuantityChange?: (id: number, newQuantity: number) => void;
  onRemove?: (id: number) => void;
}

const CartItem = ({ item, onQuantityChange, onRemove }: ICartItemProps) => {
  const price = item.price_info.sale_price;
  const total = price * item.quantity;

  return (
    <tr className='border-b border-border'>
      <td className='py-4 pl-4'>
        <div className='flex items-start gap-4'>
          <div className='relative'>
            <img
              src={item.thumbnail_url}
              alt={item.product_label}
              className='w-20 h-20 object-cover rounded-lg bg-secondary'
            />

            {onRemove && (
              <button
                onClick={() => onRemove(item.id)}
                className='absolute -top-2 -right-2 bg-card border border-border rounded-full p-1 hover:bg-destructive hover:text-destructive-foreground transition-colors'
              >
                <X className='w-3 h-3' />
              </button>
            )}
          </div>

          <div className='flex-1'>
            <h4 className='font-medium text-foreground mb-2'>
              {item.product_label}
            </h4>

            <div className='text-sm text-muted-foreground space-y-1'>
              <p>
                Size:{' '}
                <span className='text-foreground'>{item.size_name || '-'}</span>
              </p>
              <p>
                Stock: <span className='text-foreground'>{item.stock}</span>
              </p>
            </div>
          </div>
        </div>
      </td>

      <td className='py-4 px-4'>
        <span className='font-medium text-foreground'>৳{price}</span>
      </td>

      <td className='py-4 px-4'>
        {onQuantityChange ? (
          <div className='flex items-center gap-2 bg-[#f7fbfe] rounded-md p-1 w-fit'>
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8'
              onClick={() =>
                onQuantityChange(item.id, Math.max(1, item.quantity - 1))
              }
            >
              <Minus className='w-4 h-4' />
            </Button>

            <span className='w-8 text-center font-medium text-foreground'>
              {item.quantity}
            </span>

            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8'
              onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            >
              <Plus className='w-4 h-4' />
            </Button>
          </div>
        ) : (
          <span>{item.quantity}</span>
        )}
      </td>

      <td className='py-4 px-4 text-right'>
        <span className='font-semibold text-foreground'>
          ৳{total.toFixed(2)}
        </span>
      </td>
    </tr>
  );
};

export default CartItem;
