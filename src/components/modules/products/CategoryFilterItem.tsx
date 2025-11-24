'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import useCategory from '@/hooks/useCategory';
import { Loader2 } from 'lucide-react';

type CategoryFilterItemProps = {
  category: {
    id: string;
    name: string;
  };
  selectedCategories: string[];
  toggleSelection: (
    value: string,
    selectedList: string[],
    setList: (list: string[]) => void
  ) => void;
  setSelectedCategories: (list: string[]) => void;
};

const CategoryFilterItem = ({
  category,
  selectedCategories,
  toggleSelection,
  setSelectedCategories,
}: CategoryFilterItemProps) => {
  const { subCategories, isSubCategoryLoading } = useCategory(
    category.id
  );

  return (
    <div className='space-y-2'>
      <div className='flex items-center space-x-2'>
        <Checkbox
          id={category.name}
          checked={selectedCategories.includes(category.name)}
          onCheckedChange={() =>
            toggleSelection(
              category.name,
              selectedCategories,
              setSelectedCategories
            )
          }
        />
        <Label htmlFor={category.name} className='cursor-pointer font-medium'>
          {category.name}
        </Label>
      </div>

      {isSubCategoryLoading ? (
        <div className='pl-6'>
          <Loader2 className='w-3 h-3 animate-spin text-gray-400' />
        </div>
      ) : (
        subCategories.length > 0 && (
          <div className='pl-6 space-y-2 border-l-2 border-gray-100 ml-2'>
            {subCategories.map((sub: any) => (
              <div key={sub.id} className='flex items-center space-x-2'>
                <Checkbox
                  id={sub.name}
                  checked={selectedCategories.includes(sub.name)}
                  onCheckedChange={() =>
                    toggleSelection(
                      sub.name,
                      selectedCategories,
                      setSelectedCategories
                    )
                  }
                  className='w-3 h-3'
                />
                <Label
                  htmlFor={sub.name}
                  className='cursor-pointer text-sm text-gray-600 hover:text-gray-900'
                >
                  {sub.name}
                </Label>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default CategoryFilterItem;
