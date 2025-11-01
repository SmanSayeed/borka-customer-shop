'use client';

import { getParentCategories } from '@/services/category';
import { useQuery } from '@tanstack/react-query';

const useCategory = () => {
  //* Fetch all parent categories
  const { data: categoriesData, isLoading: categoryFetchLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getParentCategories,
  });

  const categories = categoriesData?.data;

  return {
    // Queries
    categories,
    categoryFetchLoading,

    // Mutations
  };
};

export default useCategory;
