'use client';

import Container from '@/components/shared/Container';
import Loader from '@/components/shared/loader';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import useProducts from '@/hooks/useProducts';
import ProductCard from '../ProductCard';
import { IProduct } from '@/types/product';

interface RelatedProductsProps {
  categoryId?: number;
}

export default function RelatedProducts({ categoryId }: RelatedProductsProps) {
  const { products, isProductLoading } = useProducts();

  const filteredProducts = categoryId
    ? products.filter((p: IProduct) => p.category_id === categoryId)
    : products;

  // --- ALWAYS SHOW 8 ITEMS ---
  const displayProducts = Array.from(
    { length: 8 },
    (_, i) => filteredProducts[i % filteredProducts.length]
  );

  return (
    <Container className='my-12'>
      <div className='text-center mb-8'>
        <h2 className='text-3xl sm:text-4xl font-bold'>Related Products</h2>
        <p className='text-foreground/70 mt-2'>
          You may also like these similar items.
        </p>
      </div>

      {isProductLoading ? (
        <Loader skeleton skeletonCount={8} />
      ) : (
        <Carousel className='w-full mx-auto'>
          <CarouselContent>
            {displayProducts.map((product: IProduct, index: number) => (
              <CarouselItem
                key={index}
                className='basis-1/2 sm:basis-1/2 lg:basis-1/5 p-2'
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </Container>
  );
}
