import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  image: string;
  alt: string;
}

const PromoProductCard = ({ image, alt }: ProductCardProps) => {
  return (
    <div className='group relative overflow-hidden rounded-2xl bg-secondary h-full'>
      <div className='aspect-3/5'>
        <img
          src={image}
          alt={alt}
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
        />
      </div>

      <div className='absolute bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)]'>
        <Button
          variant='secondary'
          className='w-full bg-white hover:bg-white/90 text-foreground shadow-lg rounded-full py-6 font-medium'
        >
          <ShoppingBag className='w-5 h-5 mr-2' />
          View Products
        </Button>
      </div>
    </div>
  );
};

export default PromoProductCard;