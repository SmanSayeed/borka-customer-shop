'use client';

import Loader from '@/components/shared/Loader';
import useCategory from '@/hooks/useCategory';
import useProducts from '@/hooks/useProducts';
import { IProduct } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSidebar';

export default function ProductList() {
  const { products, colors, sizes, isProductLoading } = useProducts();
  const { categories } = useCategory();

  const searchParams = useSearchParams();
  const router = useRouter();

  // Convert URL params to usable object
  const filtersFromUrl = Object.fromEntries(searchParams.entries());

  // -------------------------------
  // LOCAL STATE FOR ALL FILTERS
  // -------------------------------
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

  // -------------------------------
  // URL UPDATE HELPER
  // -------------------------------
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

  // -------------------------------
  // UPDATE URL WHEN FILTERS CHANGE
  // -------------------------------
  useEffect(() => {
    Object.keys(filters).forEach((key) => {
      updateQueryParams(key, (filters as any)[key]);
    });
  }, [filters]);

  // -------------------------------
  // HANDLE FILTER CHANGE
  // -------------------------------
  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className='grid grid-cols-12 gap-6'>
      {/* FILTER SIDEBAR */}
      <div className='col-span-12 md:col-span-3'>
        <FilterSidebar
          filters={filters}
          onFiltersChange={handleFiltersChange}
          categories={categories || []}
          colorOptions={colors || []}
          sizeOptions={sizes || []}
        />
      </div>

      {/* PRODUCT GRID */}
      <div className='col-span-12 md:col-span-9'>
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
