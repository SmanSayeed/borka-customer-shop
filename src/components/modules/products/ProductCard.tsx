import { ShoppingCart, Heart, Shuffle, Eye, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  outOfStock?: boolean;
}

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

const ProductCard = ({ product, viewMode }: ProductCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating)
            ? 'fill-primary text-primary'
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <Card className='group relative overflow-hidden transition-shadow hover:shadow-lg'>
      <CardContent className='p-0'>
        <div className={viewMode === 'list' ? 'flex gap-4' : ''}>
          {/* Image Container */}
          <div
            className={`relative overflow-hidden bg-muted ${
              viewMode === 'list' ? 'w-48' : ''
            }`}
          >
            <img
              src={product.image}
              alt={product.name}
              className='h-64 w-full object-cover transition-transform group-hover:scale-105'
            />

            {product.outOfStock && (
              <Badge className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-foreground text-background'>
                OUT OF STOCK
              </Badge>
            )}

            {/* Action Buttons - Show on hover */}
            <div className='absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 opacity-0 transition-opacity group-hover:opacity-100'>
              <Button
                size='icon'
                variant='secondary'
                className='h-9 w-9 rounded-full'
              >
                <ShoppingCart className='h-4 w-4' />
              </Button>
              <Button
                size='icon'
                variant='secondary'
                className='h-9 w-9 rounded-full'
              >
                <Heart className='h-4 w-4' />
              </Button>
              <Button
                size='icon'
                variant='secondary'
                className='h-9 w-9 rounded-full'
              >
                <Shuffle className='h-4 w-4' />
              </Button>
              <Button
                size='icon'
                variant='secondary'
                className='h-9 w-9 rounded-full'
              >
                <Eye className='h-4 w-4' />
              </Button>
            </div>
          </div>

          {/* Product Info */}
          <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
            <div className='mb-2 flex items-center gap-1'>
              {renderStars(product.rating)}
            </div>

            <p className='mb-1 text-xs text-muted-foreground'>
              {product.category}
            </p>
            <h3 className='mb-2 font-semibold text-foreground'>
              {product.name}
            </h3>
            <p className='text-lg font-bold text-primary'>
              £{product.price.toFixed(2)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
