'use client';

import {
  getProductColors
} from '@/actions/product';
import Loader from '@/components/shared/Loader';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import useCategory from '@/hooks/useCategory';
import useProducts from '@/hooks/useProducts';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

export default function ProductList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {products} = useProducts();

  // ✅ Convert URL query → object
  const filters = Object.fromEntries(searchParams.entries());

  // ✅ Local states
  const [search, setSearch] = useState(filters.search || '');
  const [availability, setAvailability] = useState<string[]>(
    searchParams.getAll('availability') || []
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.getAll('category') || []
  );
  const [selectedColors, setSelectedColors] = useState<string[]>(
    searchParams.getAll('color') || []
  );
  const [priceRange, setPriceRange] = useState([
    Number(filters.min_price) || 0,
    Number(filters.max_price) || 1000,
  ]);

  // ✅ URL update helper
  const updateQueryParams = (
    key: string,
    value: string | string[] | number[]
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (Array.isArray(value)) {
      params.delete(key);
      value.forEach((v) => params.append(key, v));
    } else if (value) {
      params.set(key, value.toString());
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`);
  };

  // ✅ Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      updateQueryParams('search', search);
    }, 500);
    return () => clearTimeout(timeout);
  }, [search]);

  // ✅ Availability
  useEffect(() => {
    updateQueryParams('availability', availability);
  }, [availability]);

  // ✅ Category
  useEffect(() => {
    updateQueryParams('category', selectedCategories);
  }, [selectedCategories]);

  // ✅ Colors
  useEffect(() => {
    updateQueryParams('color', selectedColors);
  }, [selectedColors]);

  // ✅ Price
  const handleSliderChange = (value: number[]) => setPriceRange(value);
  const handleSliderCommit = (value: number[]) =>
    updateQueryParams('min_price', value);

  // ✅ Toggle Checkbox Selectors
  const toggleSelection = (
    value: string,
    selectedList: string[],
    setList: (list: string[]) => void
  ) => {
    const updated = selectedList.includes(value)
      ? selectedList.filter((v) => v !== value)
      : [...selectedList, value];
    setList(updated);
  };

  // ✅ Fetch Data
  // const { data: productsData, isLoading: isProductLoading } = useQuery({
  //   queryKey: ['products', filters],
  //   queryFn: async () => await getAllProducts(filters),
  // });

  const { data: colorsData } = useQuery({
    queryKey: ['colors'],
    queryFn: async () => await getProductColors(),
    staleTime: 1000*60
  });

const {categories, isCategoryLoading} = useCategory();

  // const products = productsData?.data?.data || [];
  const colors = colorsData?.data || [];

  console.log(products)

  return (
    <div className='grid grid-cols-12 gap-6'>
      {/* 🧭 Filter Sidebar */}
      <div className='col-span-12 md:col-span-3 space-y-6 rounded-xl p-5 bg-white'>
        {/* 🔍 Search */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className='flex justify-between items-center w-full py-2 font-medium'>
            Search Product <ChevronDown className='w-4 h-4' />
          </CollapsibleTrigger>
          <CollapsibleContent className='mt-2'>
            <Input
              placeholder='Search by name...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </CollapsibleContent>
        </Collapsible>

        {/* ✅ Availability */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className='flex justify-between items-center w-full py-2 font-medium'>
            Availability <ChevronDown className='w-4 h-4' />
          </CollapsibleTrigger>
          <CollapsibleContent className='mt-3 space-y-2'>
            {['In Stock', 'Out of Stock'].map((item) => (
              <div key={item} className='flex items-center space-x-2'>
                <Checkbox
                  id={item}
                  checked={availability.includes(item)}
                  onCheckedChange={() =>
                    toggleSelection(item, availability, setAvailability)
                  }
                />
                <Label htmlFor={item} className='cursor-pointer'>
                  {item}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* 💲 Price */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className='flex justify-between items-center w-full py-2 font-medium'>
            Price Range (${priceRange[0]} - ${priceRange[1]})
            <ChevronDown className='w-4 h-4' />
          </CollapsibleTrigger>
          <CollapsibleContent className='mt-3'>
            <Slider
              min={0}
              max={1000}
              step={10}
              value={priceRange}
              onValueChange={handleSliderChange}
              onValueCommit={handleSliderCommit}
            />
          </CollapsibleContent>
        </Collapsible>

        {/* 🏷️ Category */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className='flex justify-between items-center w-full py-2 font-medium'>
            Category <ChevronDown className='w-4 h-4' />
          </CollapsibleTrigger>
          <CollapsibleContent className='mt-3 space-y-2'>
            {isCategoryLoading ? (
              <Loader />
            ) : (
              categories.map((cat: any) => (
                <div key={cat.name} className='flex items-center space-x-2'>
                  <Checkbox
                    id={cat.name}
                    checked={selectedCategories.includes(cat.name)}
                    onCheckedChange={() =>
                      toggleSelection(
                        cat.name,
                        selectedCategories,
                        setSelectedCategories
                      )
                    }
                  />
                  <Label htmlFor={cat.name} className='cursor-pointer'>
                    {cat.name}
                  </Label>
                </div>
              ))
            )}
          </CollapsibleContent>
        </Collapsible>

        {/* 🎨 Color */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className='flex justify-between items-center w-full py-2 font-medium'>
            Colors <ChevronDown className='w-4 h-4' />
          </CollapsibleTrigger>
          <CollapsibleContent className='mt-3 flex flex-wrap gap-3'>
            {colors.map((color: any) => (
              <div
                key={color._id}
                onClick={() =>
                  toggleSelection(
                    color.color_name,
                    selectedColors,
                    setSelectedColors
                  )
                }
                className={clsx(
                  'w-12 h-12 rounded-md cursor-pointer border-2 transition-all duration-200',
                  selectedColors.includes(color.color_name)
                    ? 'ring-4 ring-offset-2 ring-blue-500 scale-105'
                    : 'hover:scale-105 hover:shadow-md'
                )}
                style={{ backgroundColor: color.hex_code }}
                title={color.color_name}
              ></div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* 🛍️ Product Grid */}
      <div className='col-span-12 md:col-span-9'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {products?.length ? (
            products.map((item: any) => (
              <ProductCard key={item._id} product={item} />
            ))
          ) : (
            <p className='text-center col-span-full text-gray-500'>
              No products found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
