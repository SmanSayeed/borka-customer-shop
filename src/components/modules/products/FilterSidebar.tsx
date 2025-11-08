'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { FilterSidebarProps } from '@/types';

const FilterSidebar = ({ filters, onFiltersChange }: FilterSidebarProps) => {
  const [openSections, setOpenSections] = useState({
    availability: true,
    category: true,
    color: true,
    price: true,
  });

  // ✅ Handle Availability change
  const handleAvailabilityChange = (checked: boolean, status: string) => {
    const updatedAvailability = checked
      ? [...filters.availability, status]
      : filters.availability.filter((a) => a !== status);

    onFiltersChange({
      ...filters,
      availability: updatedAvailability,
      page: 1,
    });
  };

  // ✅ Handle Category change
  const handleCategoryChange = (checked: boolean, name: string) => {
    const updatedCategories = checked
      ? [...filters.category, name]
      : filters.category.filter((c) => c !== name);
    onFiltersChange({ ...filters, category: updatedCategories, page: 1 });
  };

  // ✅ Handle Color change
  const handleColorChange = (checked: boolean, color: string) => {
    const updatedColors = checked
      ? [...filters.color, color]
      : filters.color.filter((c) => c !== color);
    onFiltersChange({ ...filters, color: updatedColors, page: 1 });
  };

  // ✅ Handle Price change
  const handlePriceChange = (values: number[]) => {
    onFiltersChange({
      ...filters,
      min_price: values[0],
      max_price: values[1],
      page: 1,
    });
  };

  // Example category/color/availability data
  const categoryOptions = [
    'imarah-kurti-set',
    'cotton-top',
    'abaya',
    'tunic',
    'modest-wear',
  ];
  const colorOptions = [
    'Black',
    'White',
    'Blue',
    'Red',
    'Green',
    'Beige',
    'Grey',
  ];
  const availabilityOptions = ['In Stock', 'Out of Stock'];

  return (
    <section className='h-fit sticky top-6 bg-white/40 border border-primary/10 p-6 rounded-lg backdrop-blur-md shadow-sm'>
      <div className='pb-4'>
        <h4 className='text-lg font-bold text-gray-800'>Filter Products</h4>
      </div>

      <div className='space-y-6'>
        {/* ✅ Availability */}
        <Collapsible open={openSections.availability}>
          <CollapsibleTrigger
            className='flex items-center justify-between w-full p-0 hover:no-underline'
            onClick={() =>
              setOpenSections((prev) => ({
                ...prev,
                availability: !prev.availability,
              }))
            }
          >
            <Label className='text-sm font-medium cursor-pointer'>
              Availability
            </Label>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                openSections.availability ? 'rotate-180' : ''
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className='mt-3 space-y-2'>
            {availabilityOptions.map((status) => (
              <div key={status} className='flex items-center space-x-2'>
                <Checkbox
                  id={status}
                  checked={filters.availability.includes(status)}
                  onCheckedChange={(checked) =>
                    handleAvailabilityChange(!!checked, status)
                  }
                />
                <Label htmlFor={status} className='text-sm cursor-pointer'>
                  {status}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* ✅ Category */}
        <Collapsible open={openSections.category}>
          <CollapsibleTrigger
            className='flex items-center justify-between w-full p-0 hover:no-underline'
            onClick={() =>
              setOpenSections((prev) => ({
                ...prev,
                category: !prev.category,
              }))
            }
          >
            <Label className='text-sm font-medium cursor-pointer'>
              Category
            </Label>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                openSections.category ? 'rotate-180' : ''
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className='mt-3 space-y-2'>
            {categoryOptions.map((cat) => (
              <div key={cat} className='flex items-center space-x-2'>
                <Checkbox
                  id={cat}
                  checked={filters.category.includes(cat)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(!!checked, cat)
                  }
                />
                <Label htmlFor={cat} className='text-sm cursor-pointer'>
                  {cat}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* ✅ Color */}
        <Collapsible open={openSections.color}>
          <CollapsibleTrigger
            className='flex items-center justify-between w-full p-0 hover:no-underline'
            onClick={() =>
              setOpenSections((prev) => ({ ...prev, color: !prev.color }))
            }
          >
            <Label className='text-sm font-medium cursor-pointer'>Color</Label>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                openSections.color ? 'rotate-180' : ''
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className='mt-3 space-y-2'>
            {colorOptions.map((color) => (
              <div key={color} className='flex items-center space-x-2'>
                <Checkbox
                  id={`color-${color}`}
                  checked={filters.color.includes(color)}
                  onCheckedChange={(checked) =>
                    handleColorChange(!!checked, color)
                  }
                />
                <Label
                  htmlFor={`color-${color}`}
                  className='text-sm cursor-pointer'
                >
                  {color}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* ✅ Price Range */}
        <Collapsible open={openSections.price}>
          <CollapsibleTrigger
            className='flex items-center justify-between w-full p-0 hover:no-underline'
            onClick={() =>
              setOpenSections((prev) => ({ ...prev, price: !prev.price }))
            }
          >
            <Label className='text-sm font-medium cursor-pointer'>
              Price Range
            </Label>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                openSections.price ? 'rotate-180' : ''
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className='mt-4'>
            <div className='flex justify-between text-sm text-gray-500 mb-2'>
              <span>৳{filters.min_price || 0}</span>
              <span>৳{filters.max_price || 10000}</span>
            </div>
            <Slider
              min={0}
              max={10000}
              step={100}
              value={[filters.min_price || 0, filters.max_price || 10000]}
              onValueChange={handlePriceChange}
            />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>
  );
};

export default FilterSidebar;
