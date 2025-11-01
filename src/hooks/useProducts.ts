'use client';

import { getAllProducts } from '@/services/product';
import { useQuery } from '@tanstack/react-query';


const useProducts = () => {

  //* Fetch all products
  const { data: productsData, isLoading: productFetchLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  const products = productsData?.data?.data;
  
  return {
    // Queries
    products,
    productFetchLoading,

    // Mutations
  };
}

export default useProducts;
