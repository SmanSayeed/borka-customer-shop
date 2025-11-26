'use client';

import { ICartProduct } from '@/types/cart';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface ICartItemProps {
  item: ICartProduct;
  onQuantityChange?: (id: number, newQuantity: number) => void;
  onRemove?: (id: number, sizeId?: number) => void;
}

const CartItem = ({ item, onQuantityChange, onRemove }: ICartItemProps) => {
  const price = Number(item.price_info.sale_price) || 0;
  const total = price * item.quantity;

  return (
    <div className='gap-4 p-4 border border-gray-50 bg-white relative'>
      {onRemove && (
        <button
          onClick={() => onRemove(item.id, item.size_id)}
          className='absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors p-1'
        >
          <Trash2 className='size-5' />
        </button>
      )}

      <div className='grid grid-cols-12 gap-4 w-full'>
        <div className='col-span-3'>
          <img
            src={item.thumbnail_url}
            alt={item.product_label}
            className='w-full h-full object-cover rounded-sm'
          />
        </div>

        <div className='col-span-9 flex flex-col gap-2'>
          <h4 className='font-medium text-foreground mb-1 truncate'>
            {item.product_label}
          </h4>

          <div className='flex items-center gap-4 text-sm text-muted-foreground'>
            <p>
              Size: <span className='text-foreground'>{item.size_code}</span>
            </p>
            <p>
              Stock: <span className='text-foreground'>{item.stock}</span>
            </p>
            <p className='font-medium text-foreground'>৳ {price}</p>
          </div>

          <div className='flex items-center gap-3'>
            <span className='text-muted-foreground text-sm'>Quantity:</span>
            <div className='flex items-center gap-1'>
              <button
                className='border p-2 rounded-sm hover:border-primary hover:bg-primary/10 transition'
                onClick={() =>
                  onQuantityChange?.(item.id, Math.max(1, item.quantity - 1))
                }
              >
                <Minus size={14} />
              </button>

              <span className='w-8 text-center font-medium'>
                {item.quantity}
              </span>

              <button
                className='border p-2 rounded-sm hover:border-primary hover:bg-primary/10 transition'
                onClick={() => onQuantityChange?.(item.id, item.quantity + 1)}
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <p className='text-sm text-muted-foreground'>Total:</p>
            <p className='font-semibold text-foreground'>
              ৳ {total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
