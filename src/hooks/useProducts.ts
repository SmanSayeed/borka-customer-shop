'use client';

import { getAllProducts } from '@/actions/product';
import { useQuery } from '@tanstack/react-query';

const useProducts = () => {
  
  const { data: productsData, isLoading: isProductLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => getAllProducts(),
  });

  const products = productsData?.data?.data || [];

  return {
    products,
    isProductLoading,
  };
};

export default useProducts;
