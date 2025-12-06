'use client';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { ISize } from '@/types/product';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import CategoryFilter from './CategoryFilter';
import { Button } from '@/components/ui/button';

const availabilityOptions = ['all', 'in-stock', 'out-of-stock'];

const FilterSidebar = ({
  filters,
  onFiltersChange,
  categories,
  subCategories,
  colorOptions,
  sizeOptions,
}: any) => {
  const [openSections, setOpenSections] = useState({
    availability: true,
    category: true,
    color: true,
    size: true,
    price: true,
  });

  const toggleValue = (list: string[], value: string, checked: boolean) =>
    checked ? [...list, value] : list.filter((v) => v !== value);

  // CLEAR FILTERS HANDLER
  const handleClearFilters = () => {
    onFiltersChange({
      search: '',
      availability: [],
      main_category: [],
      category: [],
      color: [],
      size: [],
      min_price: 1,
      max_price: 100000,
      page: 1,
      sort_by: '',
      grid: filters.grid, // grid keep same
    });
  };

  const handleAvailabilityChange = (checked: boolean, value: string) => {
    onFiltersChange({
      ...filters,
      availability: toggleValue(filters.availability, value, checked),
      page: 1,
    });
  };

  const handleColorChange = (checked: boolean, value: string) => {
    onFiltersChange({
      ...filters,
      color: toggleValue(filters.color, value, checked),
      page: 1,
    });
  };

  const handleSizeChange = (checked: boolean, value: string) => {
    onFiltersChange({
      ...filters,
      size: toggleValue(filters.size, value, checked),
      page: 1,
    });
  };

  const handlePriceRange = (values: number[]) => {
    onFiltersChange({
      ...filters,
      min_price: values[0],
      max_price: values[1],
      page: 1,
    });
  };

  return (
    <section className='h-fit sticky top-6 bg-white p-6'>
      {/* Header with Clear Button */}
      <div className='flex items-center justify-between mb-4'>
        <h4 className='text-lg font-bold'>Filter Products</h4>

        <button
          onClick={handleClearFilters}
          className='text-sm border border-primary px-2 py-1 hover:bg-primary hover:text-white transition-colors duration-500 rounded-sm'
        >
          Clear Filter
        </button>
      </div>

      <div className='space-y-6'>
        {/* Availability */}
        <Collapsible open={openSections.availability}>
          <CollapsibleTrigger
            className='flex justify-between items-center'
            onClick={() =>
              setOpenSections({
                ...openSections,
                availability: !openSections.availability,
              })
            }
          >
            <Label className='text-sm font-semibold'>Availability</Label>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                openSections.availability ? 'rotate-180' : ''
              }`}
            />
          </CollapsibleTrigger>

          <CollapsibleContent className='mt-3 space-y-2'>
            {availabilityOptions.map((status) => (
              <div key={status} className='flex items-center gap-2 capitalize'>
                <Checkbox
                  checked={filters.availability.includes(status)}
                  onCheckedChange={(checked) =>
                    handleAvailabilityChange(!!checked, status)
                  }
                />
                <Label>{status}</Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Categories */}
        <CategoryFilter
          parents={categories}
          children={subCategories}
          filters={filters}
          onFiltersChange={onFiltersChange}
        />

        <Separator />

        {/* Colors */}
        <Collapsible open={openSections.color}>
          <CollapsibleTrigger
            className='flex justify-between items-center'
            onClick={() =>
              setOpenSections({ ...openSections, color: !openSections.color })
            }
          >
            <Label className='text-sm font-semibold'>Colors</Label>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                openSections.color ? 'rotate-180' : ''
              }`}
            />
          </CollapsibleTrigger>

          <CollapsibleContent className='mt-3 space-y-2'>
            {colorOptions.map((c: any) => (
              <div key={c.color_name} className='flex items-center gap-2'>
                <Checkbox
                  checked={filters.color.includes(c.color_name)}
                  onCheckedChange={(checked) =>
                    handleColorChange(!!checked, c.color_name)
                  }
                />
                <Label>{c.color_name}</Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Sizes */}
        <Collapsible open={openSections.size}>
          <CollapsibleTrigger
            className='flex justify-between items-center'
            onClick={() =>
              setOpenSections({ ...openSections, size: !openSections.size })
            }
          >
            <Label className='text-sm font-semibold'>Sizes</Label>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                openSections.size ? 'rotate-180' : ''
              }`}
            />
          </CollapsibleTrigger>

          <CollapsibleContent className='mt-3 space-y-2'>
            {sizeOptions.map((s: ISize) => (
              <div key={s.id} className='flex items-center gap-2'>
                <Checkbox
                  checked={filters.size.includes(s.code)}
                  onCheckedChange={(checked) =>
                    handleSizeChange(!!checked, s.code)
                  }
                />
                <Label>{s.code} {' '} {s.length}</Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Price Range */}
        <Collapsible open={openSections.price}>
          <CollapsibleTrigger
            className='flex justify-between items-center'
            onClick={() =>
              setOpenSections({ ...openSections, price: !openSections.price })
            }
          >
            <Label className='text-sm font-semibold'>Price Range</Label>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                openSections.price ? 'rotate-180' : ''
              }`}
            />
          </CollapsibleTrigger>

          <CollapsibleContent className='mt-3'>
            <div className='flex justify-between text-sm mb-3'>
              <span>৳ {filters.min_price}</span>
              <span>৳ {filters.max_price}</span>
            </div>

            <Slider
              min={0}
              max={10000}
              step={50}
              value={[filters.min_price, filters.max_price]}
              onValueChange={handlePriceRange}
              className='pt-2'
            />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>
  );
};

export default FilterSidebar;
