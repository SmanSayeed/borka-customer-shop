'use client';

import { getBusinessCategories, getParentCategories } from '@/actions/category';
import { useQuery } from '@tanstack/react-query';

const useCategory = (parentId?: string) => {
  // * Get all business categories
  const { data: businessCategoriesData, isLoading: isBusinessCategoryLoading } =
    useQuery({
      queryKey: ['businessCategories'],
      queryFn: getBusinessCategories,
    });

  // * Get all parent categories
  const { data: categoriesData, isLoading: isCategoryLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getParentCategories,
  });

  // * Get subcategories by parent id
  const { data: subCategoriesData, isLoading: isSubCategoryLoading } = useQuery(
    {
      queryKey: ['subCategories', parentId],
      queryFn: () => getSubCategoriesByParentId(parentId),
      enabled: !!parentId,
    }
  );

  const categories = categoriesData?.data || [];
  const subCategories = subCategoriesData || [];

  return {
    categories,
    subCategories,
    isCategoryLoading,
    isSubCategoryLoading,
  };
};

export default useCategory;
