'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { LayoutList, Grid2X2, Grid3X3 } from 'lucide-react';

interface ProductHeaderProps {
  totalProducts: number;
  sortBy?: string;
  onSortChange?: (sortBy: string) => void;
  search?: string;
  onSearchChange?: (value: string) => void;
  gridCols?: number;
  onGridChange?: (cols: number) => void;
}

const ProductHeader = ({
  totalProducts,
  sortBy,
  onSortChange,
  search,
  onSearchChange,
  gridCols,
  onGridChange,
}: ProductHeaderProps) => {
  
  return (
    <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-4 border-b gap-4'>
      <div className='flex items-center gap-3'>
        <button
          onClick={() => onGridChange(1)}
          className={`${
            gridCols === 1 ? 'text-primary' : 'text-gray-400'
          } hover:text-primary`}
        >
          <LayoutList size={18} />
        </button>
        <button
          onClick={() => onGridChange(2)}
          className={`${
            gridCols === 2 ? 'text-primary' : 'text-gray-400'
          } hover:text-primary`}
        >
          <Grid2X2 size={18} />
        </button>
        <button
          onClick={() => onGridChange(3)}
          className={`${
            gridCols === 3 ? 'text-primary' : 'text-gray-400'
          } hover:text-primary`}
        >
          <Grid3X3 size={18} />
        </button>
      </div>

      <div className='text-sm text-gray-600 whitespace-nowrap'>
        {totalProducts} products
      </div>

      {/* Search Input */}
      <Input
        type='text'
        placeholder='Search products...'
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className='w-full md:w-64'
      />

      {/* Sort Dropdown */}
      <div className='flex items-center space-x-2'>
        <span className='text-sm text-gray-600'>Sort by:</span>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className='w-40'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='best-selling'>Best selling</SelectItem>
            <SelectItem value='price-low'>Price: Low to High</SelectItem>
            <SelectItem value='price-high'>Price: High to Low</SelectItem>
            <SelectItem value='rating'>Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProductHeader;
