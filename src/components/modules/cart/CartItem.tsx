import { Button } from '@/components/ui/button';
import { ICartProduct } from '@/types/cart';
import { Minus, Plus, X } from 'lucide-react';

interface ICartItemProps {
  item: ICartProduct;
  onQuantityChange?: (id: number, newQuantity: number) => void;
  onRemove?: (id: number, sizeId?: number) => void;
}

const CartItem = ({ item, onQuantityChange, onRemove }: ICartItemProps) => {
  const price = item.price_info.sale_price;
  const total = price * item.quantity;

  return (
    <div className='grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-gray-100 items-center relative bg-white'>
      {/* Product Info - Spans 6 columns on desktop */}
      <div className='col-span-1 md:col-span-6'>
        <div className='flex items-start gap-4'>
          <div className='relative shrink-0'>
            <img
              src={item.thumbnail_url}
              alt={item.product_label}
              className='w-20 h-20 object-cover rounded-lg bg-secondary'
            />
          </div>

          <div className='flex-1 min-w-0'>
            <h4 className='font-medium text-foreground mb-1 truncate pr-8 md:pr-0'>
              {item.product_label}
            </h4>

            <div className='text-sm text-muted-foreground space-y-1'>
              <p>
                Size: <span className='text-foreground'>{item.size_name || '-'}</span>
              </p>
              <p>
                Stock: <span className='text-foreground'>{item.stock}</span>
              </p>
              {/* Mobile Price Display */}
              <p className='md:hidden font-medium text-primary mt-1'>
                ৳{price}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Price - Spans 2 columns, hidden on mobile */}
      <div className='hidden md:block md:col-span-2 text-center'>
        <span className='font-medium text-foreground'>৳{price}</span>
      </div>

      {/* Quantity - Spans 2 columns */}
      <div className='col-span-1 md:col-span-2 flex items-center justify-between md:justify-center'>
        <span className='md:hidden text-sm text-muted-foreground'>Quantity:</span>
        
        {onQuantityChange ? (
          <div className='flex items-center gap-2 bg-[#f7fbfe] rounded-md p-1'>
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
      </div>

      {/* Total - Spans 2 columns */}
      <div className='col-span-1 md:col-span-2 flex items-center justify-between md:justify-end'>
        <span className='md:hidden text-sm text-muted-foreground'>Total:</span>
        <span className='font-semibold text-foreground'>
          ৳{total.toFixed(2)}
        </span>
      </div>

      {/* Remove Button - Absolute on mobile, part of layout/hover on desktop could be better but sticking to design */}
      {onRemove && (
        <button
          onClick={() => onRemove(item.id, item.size_id)}
          className='absolute top-4 right-4 md:static md:ml-4 text-muted-foreground hover:text-destructive transition-colors p-1'
          title="Remove item"
        >
          <X className='w-5 h-5' />
        </button>
      )}
    </div>
  );
};

export default CartItem;
