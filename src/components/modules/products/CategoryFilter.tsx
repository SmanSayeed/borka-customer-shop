'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function CategoryFilter({
  parents = [],
  children = [],
  filters,
  onFiltersChange,
}: any) {
  const [openParent, setOpenParent] = useState<number | null>(null);

  // Handle Parent Category Selection
  const handleParentCheck = (checked: boolean, cat: any) => {
    let updatedParents = [];
    let updatedChildren = [...filters.category];

    if (checked) {
      // Add parent category
      updatedParents = [...filters.main_category, cat.slug];
      setOpenParent(cat.id);
    } else {
      // Remove parent category
      updatedParents = filters.main_category.filter(
        (x: string) => x !== cat.slug
      );

      // Remove all its child categories
      const childSlugs = children
        .filter((c: any) => c.parent_id === cat.id)
        .map((c: any) => c.slug);

      updatedChildren = updatedChildren.filter(
        (slug) => !childSlugs.includes(slug)
      );

      setOpenParent(null);
    }

    onFiltersChange({
      main_category: updatedParents,
      category: updatedChildren,
      page: 1,
    });
  };

  // Handle Sub Category Selection
  const handleSubCheck = (checked: boolean, sub: any) => {
    const updated = checked
      ? [...filters.category, sub.slug]
      : filters.category.filter((x: string) => x !== sub.slug);

    onFiltersChange({
      category: updated,
      page: 1,
    });
  };

  // Group children by parent
  const childrenByParent = parents.reduce((acc: any, parent: any) => {
    acc[parent.id] = children.filter((c: any) => c.parent_id === parent.id);
    return acc;
  }, {});

  return (
    <div className='space-y-4'>
      {parents.map((p: any) => (
        <div key={p.id} className='flex flex-col'>
          {/* Parent */}
          <div
            className='flex items-center gap-2 cursor-pointer'
            onClick={() => setOpenParent(openParent === p.id ? null : p.id)}
          >
            <Checkbox
              checked={filters.main_category.includes(p.slug)}
              onCheckedChange={(checked) => handleParentCheck(!!checked, p)}
            />
            <Label className='cursor-pointer'>{p.name}</Label>
          </div>

          {/* Children */}
          {openParent === p.id &&
            childrenByParent[p.id] &&
            childrenByParent[p.id].length > 0 && (
              <div className='ml-6 mt-2 space-y-2 border-l pl-3'>
                {childrenByParent[p.id].map((sub: any) => (
                  <div key={sub.id} className='flex items-center gap-2'>
                    <Checkbox
                      checked={filters.category.includes(sub.slug)}
                      onCheckedChange={(checked) =>
                        handleSubCheck(!!checked, sub)
                      }
                    />
                    <Label className='text-sm text-gray-600 cursor-pointer'>
                      {sub.name}
                    </Label>
                  </div>
                ))}
              </div>
            )}
        </div>
      ))}
    </div>
  );
}
