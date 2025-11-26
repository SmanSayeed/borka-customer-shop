'use client';

import Container from '@/components/shared/Container';
import Loader from '@/components/shared/Loader';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import useProducts from '@/hooks/useProducts';
import { IProduct } from '@/types';
import ProductCard from '../ProductCard';
import CarouselIcon from '@/components/shared/CarouselIcon';

interface RelatedProductsProps {
  categoryId?: number;
}

export default function RelatedProducts({ categoryId }: RelatedProductsProps) {
  const { products, isProductLoading } = useProducts();

  const filteredProducts = categoryId
    ? products.filter((p: IProduct) => p.category_id === categoryId)
    : products;

  const displayProducts = Array.from(
    { length: 8 },
    (_, i) => filteredProducts[i % filteredProducts.length]
  );

  return (
    <Container className='my-12'>
      <div className='text-center mb-8'>
        <h2 className='text-3xl sm:text-4xl font-bold'>Related Products</h2>
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

          <CarouselIcon />
        </Carousel>
      )}
    </Container>
  );
}
