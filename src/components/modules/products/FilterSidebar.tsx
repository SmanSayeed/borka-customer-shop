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
    availability: false,
    category: true,
    color: true,
    price: true,
  });

  const handleCategoryChange = (checked: boolean, name: string) => {
    const updatedCategories = checked
      ? [...filters.category, name]
      : filters.category.filter((c) => c !== name);
    onFiltersChange({ ...filters, category: updatedCategories, page: 1 });
  };

  const handleColorChange = (checked: boolean, color: string) => {
    const updatedColors = checked
      ? [...filters.color, color]
      : filters.color.filter((c) => c !== color);
    onFiltersChange({ ...filters, color: updatedColors, page: 1 });
  };

  const handlePriceChange = (values: number[]) => {
    onFiltersChange({
      ...filters,
      min_price: values[0],
      max_price: values[1],
      page: 1,
    });
  };

  return (
    <section className='h-fit sticky top-6 bg-white/40 border border-primary/10 p-6 rounded-lg'>
      <div className='pb-4'>
        <h4 className='text-lg font-bold'>Filter Products</h4>
      </div>

      <div className='space-y-6'>
        {/* ✅ Category */}
        <Collapsible open={openSections.category}>
          <CollapsibleTrigger
            className='flex items-center justify-between w-full p-0 hover:no-underline'
            onClick={() =>
              setOpenSections((prev) => ({ ...prev, category: !prev.category }))
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
            {['imarah-kurti-set', 'cotton-top', 'abaya', 'tunic'].map((cat) => (
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
            {['Black', 'White', 'Blue', 'Red', 'Green'].map((color) => (
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
