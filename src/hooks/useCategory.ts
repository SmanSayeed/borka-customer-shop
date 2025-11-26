'use client';

import { getSubCategoriesByParentId } from '@/actions/category';
import { useGlobalContext } from '@/context/GlobalContext';
import { useQuery } from '@tanstack/react-query';

const useCategory = (parentId?: number | string) => {
  const {
    categories,
    businessCategories,
    isCategoryLoading,
    isBusinessCategoryLoading,
  } = useGlobalContext();

  // * Get subcategories by parent id
  const { data: subCategoriesData, isLoading: isSubCategoryLoading } = useQuery(
    {
      queryKey: ['subCategories', parentId],
      queryFn: () => getSubCategoriesByParentId(parentId?.toString() || ''),
      enabled: !!parentId,
    }
  );

  const subCategories = subCategoriesData?.data || [];

  return {
    categories,
    businessCategories,
    subCategories,
    isCategoryLoading,
    isBusinessCategoryLoading,
    isSubCategoryLoading,
  };
};

export default useCategory;
