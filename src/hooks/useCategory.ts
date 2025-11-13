'use client';

import { getParentCategories } from '@/actions/category';
import { useQuery } from '@tanstack/react-query';

const useCategory = () => {
  const { data: categoriesData, isLoading: isCategoryLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getParentCategories,
  });

  const categories = categoriesData?.data || [];

  return {
    categories,
    isCategoryLoading,
  };
};

export default useCategory;
