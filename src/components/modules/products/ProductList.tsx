'use client';

import { SkeletonCard } from '@/components/shared/SkeletonCard';
import useCategory from '@/hooks/useCategory';
import useProducts from '@/hooks/useProducts';
import { buildSearchParamsFromFilters } from '@/lib/searchParamsFilters';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import FilterSidebar from './FilterSidebar';
import ProductCard from './ProductCard';
import ProductPagination from './ProductPagination';
import ProductBreadcrumb from './ProductBreadcrumb';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Columns2, Columns3, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ProductList() {
  const [selectedParentId, setSelectedParentId] = useState<
    number | string | undefined
  >(undefined);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const parseFiltersFromSearch = useCallback(() => {
    const params = Object.fromEntries(searchParams.entries());

    return {
      search: params.search,
      availability: searchParams.getAll('availability'),
      main_category: searchParams.getAll('main_category[]'),
      category: searchParams.getAll('category[]'),
      color: searchParams.getAll('color[]'),
      size: searchParams.getAll('size[]'),
      min_price: Number(params.min_price) || 1,
      max_price: Number(params.max_price) || 100000,
      page: Number(params.page) || 1,
      sort_by: params.sort_by,
      grid: Number(params.grid) || 3,
    };
  }, [searchParams]);

  const [filters, setFilters] = useState(parseFiltersFromSearch);
  const { categories, subCategories } = useCategory(selectedParentId);

  useEffect(() => {
    if (
      filters.main_category.length > 0 &&
      categories.length > 0 &&
      !selectedParentId
    ) {
      const parentSlug = filters.main_category[0];
      const parent = categories.find((c: any) => c.slug === parentSlug);
      if (parent) {
        setSelectedParentId(parent.id);
      }
    }
  }, [categories, filters.main_category, selectedParentId]);

  const { products, meta, filterResponse, colors, sizes, isProductLoading } =
    useProducts({
      filters,
    });

  const syncFiltersToUrl = useCallback(
    (f: any) => {
      const params = buildSearchParamsFromFilters(f);
      const qs = params.toString();
      const current = searchParams.toString();

      if (qs !== current) {
        router.push(`${pathname}?${qs}`);
      }
    },
    [pathname, router, searchParams]
  );

  useEffect(() => {
    const parsed = parseFiltersFromSearch();
    setFilters(parsed);
  }, [searchParams.toString()]);

  useEffect(() => {
    syncFiltersToUrl(filters);
  }, [filters, syncFiltersToUrl]);

  const handleFiltersChange = (newFilters: any) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Debounce search
  let searchTimeout: any;
  const debounceSearch = (value: string) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      handleFiltersChange({ search: value, page: 1 });
    }, 500);
  };

  return (
    <div>
      <ProductBreadcrumb filterResponse={filterResponse} />
      <div className='grid grid-cols-12 gap-6'>
        {/* SIDEBAR — DESKTOP ONLY */}
        <div className='hidden md:block md:col-span-3'>
          <FilterSidebar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            categories={categories || []}
            subCategories={subCategories || []}
            selectedParentId={selectedParentId}
            setSelectedParentId={setSelectedParentId}
            colorOptions={colors}
            sizeOptions={sizes}
          />
        </div>

        {/* PRODUCTS SECTION */}
        <div className='col-span-12 md:col-span-9'>
          {/* TOP BAR */}
          <div className='col-span-12 grid grid-cols-12 items-center gap-4 mb-6'>
            {/* GRID ICONS — DESKTOP ONLY */}
            <div className='hidden lg:flex col-span-3 gap-3'>
              <button
                onClick={() => handleFiltersChange({ grid: 2 })}
                className={`p-2 border rounded ${
                  filters.grid === 2 ? 'bg-primary/20 text-primary' : ''
                }`}
              >
                <Columns2 size={16} />
              </button>

              <button
                onClick={() => handleFiltersChange({ grid: 3 })}
                className={`p-2 border rounded ${
                  filters.grid === 3 ? 'bg-primary/20 text-primary' : ''
                }`}
              >
                <Columns3 size={16} />
              </button>
            </div>

            {/* FILTER BUTTON — MOBILE ONLY */}
            <div className='col-span-5 md:hidden flex justify-start'>
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <button className='flex items-center gap-2 px-4 py-2 rounded-md text-sm'>
                    <Filter size={18} /> Filter
                  </button>
                </SheetTrigger>

                <SheetContent
                  side='left'
                  className='w-[85%] p-4 overflow-y-auto'
                >
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>

                  <FilterSidebar
                    filters={filters}
                    onFiltersChange={(f: any) => {
                      handleFiltersChange(f);
                      setIsFilterOpen(false);
                    }}
                    categories={categories || []}
                    subCategories={subCategories || []}
                    selectedParentId={selectedParentId}
                    setSelectedParentId={setSelectedParentId}
                    colorOptions={colors}
                    sizeOptions={sizes}
                  />
                </SheetContent>
              </Sheet>
            </div>

            {/* SEARCH + COUNT — DESKTOP ONLY */}
            <div className='hidden md:flex col-span-6 items-center gap-4'>
              <Input
                defaultValue={filters.search}
                onChange={(e) => debounceSearch(e.target.value)}
                placeholder='Search product...'
                className='w-[70%]'
              />

              <p className='whitespace-nowrap'>
                {meta?.products?.total}{' '}
                {meta?.products?.total === 1 ? 'Product' : 'Products'}
              </p>
            </div>

            {/* SORTING — ALWAYS VISIBLE */}
            <div className='col-span-7 md:col-span-3'>
              <Select
                value={filters.sort_by}
                onValueChange={(value) =>
                  handleFiltersChange({ sort_by: value, page: 1 })
                }
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Sort by' />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value='newest'>Latest Products</SelectItem>
                  <SelectItem value='oldest'>Oldest Products</SelectItem>
                  <SelectItem value='lowest'>Lowest Price</SelectItem>
                  <SelectItem value='highest'>Highest Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* PRODUCTS LIST */}
          {isProductLoading ? (
            <SkeletonCard />
          ) : (
            <>
              <div
                className={`grid gap-6 ${
                  filters.grid === 2
                    ? 'grid-cols-2'
                    : 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {products?.length ? (
                  products.map((p: any) => (
                    <ProductCard key={p.id} product={p} />
                  ))
                ) : (
                  <p className='text-center col-span-full'>No products found</p>
                )}
              </div>

              {/* PAGINATION */}
              {meta && meta.total > meta.limit && (
                <ProductPagination
                  currentPage={meta.page}
                  totalPages={Math.ceil(meta.total / meta.limit)}
                  onPageChange={(page) => handleFiltersChange({ page })}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
