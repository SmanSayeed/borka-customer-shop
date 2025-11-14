import { Minus, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartItemProps {
  id: string;
  image: string;
  name: string;
  color: string;
  size: string;
  stock: string;
  price: number;
  quantity: number;
  onQuantityChange: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem = ({
  id,
  image,
  name,
  color,
  size,
  stock,
  price,
  quantity,
  onQuantityChange,
  onRemove,
}: CartItemProps) => {
  const total = price * quantity;

  return (
    <tr className='border-b border-border'>
      <td className='py-6'>
        <div className='flex items-start gap-4'>
          <div className='relative'>
            <img
              src={image}
              alt={name}
              className='w-24 h-24 object-cover rounded-lg bg-secondary'
            />
            <button
              onClick={() => onRemove(id)}
              className='absolute -top-2 -right-2 bg-card border border-border rounded-full p-1 hover:bg-destructive hover:text-destructive-foreground transition-colors'
              aria-label='Remove item'
            >
              <X className='w-3 h-3' />
            </button>
          </div>
          <div className='flex-1'>
            <h4 className='font-medium text-foreground mb-2'>{name}</h4>
            <div className='text-sm text-muted-foreground space-y-1'>
              <p>
                Color: <span className='text-foreground'>{color}</span>
              </p>
              <p>
                Size: <span className='text-foreground'>{size}</span>
              </p>
            </div>
          </div>
        </div>
      </td>

      <td className='py-6 px-4'>
        <div className='flex items-center gap-2'>
          <div className='w-2 h-2 bg-foreground rounded-full'></div>
          <span className='text-sm text-foreground'>{stock}</span>
        </div>
      </td>

      <td className='py-6 px-4'>
        <span className='font-medium text-foreground'>${price.toFixed(2)}</span>
      </td>

      <td className='py-6 px-4'>
        <div className='flex items-center gap-2 bg-[#f7fbfe] rounded-md p-1 w-fit'>
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8'
            onClick={() => onQuantityChange(id, Math.max(1, quantity - 1))}
          >
            <Minus className='w-4 h-4' />
          </Button>
          <span className='w-8 text-center font-medium text-foreground'>
            {quantity}
          </span>
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8'
            onClick={() => onQuantityChange(id, quantity + 1)}
          >
            <Plus className='w-4 h-4' />
          </Button>
        </div>
      </td>

      <td className='py-6 px-4 text-right'>
        <span className='font-semibold text-foreground'>
          ${total.toFixed(2)}
        </span>
      </td>
    </tr>
  );
};

export default CartItem;
