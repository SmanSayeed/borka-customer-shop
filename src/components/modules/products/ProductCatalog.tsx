'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '@/services/product';
import ProductHeader from './ProductHeader';
import FilterSidebar from './FilterSidebar';
import ProductGrid from './ProductGrid';
import { useDebounce } from '@/hooks/useDebounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { IProduct } from '@/types';


const ProductCatalog = ({products}: {products: IProduct[]}) => {
    // const router = useRouter();
    // const searchParams = useSearchParams();

    // // 🔹 Filters state
    // const [filters, setFilters] = useState({
    //   search: searchParams.get('search') || '',
    //   category: searchParams.getAll('category[]') || [],
    //   color: searchParams.getAll('color[]') || [],
    //   min_price: Number(searchParams.get('min_price')) || undefined,
    //   max_price: Number(searchParams.get('max_price')) || undefined,
    // });

    // // 🔹 Debounced search
    // const [searchTerm, setSearchTerm] = useState(filters.search);
    // const debouncedSearch = useDebounce(searchTerm, 500);

    // useEffect(() => {
    //   setFilters((prev) => ({
    //     ...prev,
    //     search: debouncedSearch.trim(),
    //   }));
    // }, [debouncedSearch]);

    // useEffect(() => {
    //   const params = new URLSearchParams();

    //   if (filters.search) params.set('search', filters.search);
    //   filters.category.forEach((cat) => params.append('category[]', cat));
    //   filters.color.forEach((clr) => params.append('color[]', clr));
    //   if (filters.min_price) params.set('min_price', String(filters.min_price));
    //   if (filters.max_price) params.set('max_price', String(filters.max_price));
    //   if (filters.page) params.set('page', String(filters.page));
    //   if (filters.per_page) params.set('per_page', String(filters.per_page));

    //   // ✅ URL push without reload
    //   router.replace(`?${params.toString()}`);
    // }, [filters, router]);

    // 🔹 Fetch products with filters
    // const { data, isLoading } = useQuery({
    //   queryKey: ['products', filters],
    //   queryFn: () => getAllProducts(filters),
    // });

    const total = products?.total || 0;

  return (
    <div className='container mx-auto py-6 flex gap-8'>
      {/* ✅ Sidebar */}
      <div className='w-80 flex-shrink-0'>
        <FilterSidebar filters={filters} onFiltersChange={setFilters} />
      </div>

      {/* ✅ Main Section */}
      <div className='flex-1'>
        <ProductHeader
          totalProducts={total}
          search={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {isLoading ? (
          <div className='text-center py-10 text-muted-foreground'>
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className='text-center py-10 text-muted-foreground'>
            No products found with current filters.
          </div>
        ) : (
          <ProductGrid
            products={products}
            currentPage={filters.page}
            totalPages={data?.data?.last_page || 1}
            onPageChange={
              (page) => setFilters((prev) => ({ ...prev, page })) // ✅ Immutable update
            }
          />
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;
