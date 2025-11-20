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
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const availabilityOptions = ['In Stock', 'Out of Stock'];

const FilterSidebar = ({
  filters,
  onFiltersChange,
  categories,
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

  // ---------------------------------------
  // HANDLERS
  // ---------------------------------------

  const toggleValue = (list: string[], value: string, checked: boolean) => {
    return checked ? [...list, value] : list.filter((v) => v !== value);
  };

  const handleAvailabilityChange = (checked: boolean, value: string) => {
    onFiltersChange({
      ...filters,
      availability: toggleValue(filters.availability, value, checked),
      page: 1,
    });
  };

  const handleCategoryChange = (checked: boolean, value: string) => {
    onFiltersChange({
      ...filters,
      category: toggleValue(filters.category, value, checked),
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
    <section className='h-fit sticky top-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
      <h4 className='text-lg font-bold mb-4'>Filter Products</h4>

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
              <div key={status} className='flex items-center gap-2'>
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
        <Collapsible open={openSections.category}>
          <CollapsibleTrigger
            className='flex justify-between items-center'
            onClick={() =>
              setOpenSections({
                ...openSections,
                category: !openSections.category,
              })
            }
          >
            <Label className='text-sm font-semibold'>Category</Label>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                openSections.category ? 'rotate-180' : ''
              }`}
            />
          </CollapsibleTrigger>

          <CollapsibleContent className='mt-3 space-y-2'>
            {categories.map((cat: any) => (
              <div key={cat.name} className='flex items-center gap-2'>
                <Checkbox
                  checked={filters.category.includes(cat.name)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(!!checked, cat.name)
                  }
                />
                <Label>{cat.name}</Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

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
            {sizeOptions.map((s: any) => (
              <div key={s.label} className='flex items-center gap-2'>
                <Checkbox
                  checked={filters.size.includes(s.label)}
                  onCheckedChange={(checked) =>
                    handleSizeChange(!!checked, s.label)
                  }
                />
                <Label>{s.label}</Label>
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
            <div className='flex justify-between text-sm mb-2'>
              <span>৳{filters.min_price}</span>
              <span>৳{filters.max_price}</span>
            </div>

            <Slider
              min={0}
              max={10000}
              step={100}
              value={[filters.min_price, filters.max_price]}
              onValueChange={handlePriceRange}
            />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>
  );
};

export default FilterSidebar;
