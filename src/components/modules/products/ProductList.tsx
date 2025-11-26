'use client';

import Loader from '@/components/shared/Loader';
import useCategory from '@/hooks/useCategory';
import useProducts from '@/hooks/useProducts';
import { IProduct } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import FilterSidebar from './FilterSidebar';
import ProductCard from './ProductCard';

export default function ProductList() {
  const [selectedParentId, setSelectedParentId] = useState<
    number | string | undefined
  >(undefined);
  const { categories, subCategories } = useCategory(selectedParentId);

  const searchParams = useSearchParams();
  const router = useRouter();

  const filtersFromUrl = Object.fromEntries(searchParams.entries());

  const [filters, setFilters] = useState({
    search: filtersFromUrl.search || '',
    availability: searchParams.getAll('availability') || [],
    category: searchParams.getAll('category') || [],
    color: searchParams.getAll('color') || [],
    size: searchParams.getAll('size') || [],
    min_price: Number(filtersFromUrl.min_price) || 0,
    max_price: Number(filtersFromUrl.max_price) || 10000,
    page: Number(filtersFromUrl.page) || 1,
  });

  const { products, colors, sizes, isProductLoading } = useProducts({
    filters,
  });

  const updateQueryParams = (key: string, value: any) => {
    const params = new URLSearchParams(searchParams.toString());

    if (Array.isArray(value)) {
      params.delete(key);
      value.forEach((val) => params.append(key, val));
    } else if (value !== undefined && value !== null && value !== '') {
      params.set(key, value.toString());
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    Object.keys(filters).forEach((key) => {
      updateQueryParams(key, (filters as any)[key]);
    });
  }, [filters]);

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className='grid grid-cols-12 gap-6'>
      <div className='col-span-12 md:col-span-3 px-4 md:px-0'>
        <FilterSidebar
          filters={filters}
          onFiltersChange={handleFiltersChange}
          categories={categories || []}
          subCategories={subCategories || []}
          selectedParentId={selectedParentId}
          setSelectedParentId={setSelectedParentId}
          colorOptions={colors || []}
          sizeOptions={sizes || []}
        />
      </div>

      <div className='col-span-12 md:col-span-9 px-4 md:px-0'>
        {isProductLoading ? (
          <Loader skeleton skeletonCount={6} />
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {products?.length ? (
              products.map((product: IProduct) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className='text-center col-span-full text-gray-500'>
                No products found
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
