'use client';

import { getAllProducts } from '@/actions/product';
import { useGlobalContext } from '@/context/GlobalContext';
import { IProduct } from '@/types';
import { useQuery } from '@tanstack/react-query';

interface Props {
  filters?: Record<string, string | number>;
}

export default function useProducts({ filters }: Props = {}) {
  const { colors, sizes, isColorLoading, isSizeLoading } = useGlobalContext();

  // * Get all products using filters
  const { data: productsData, isLoading: isProductLoading } = useQuery<
    any,
    Error
  >({
    queryKey: ['products', filters || {}],
    queryFn: () => getAllProducts(filters),
    staleTime: 1000 * 60 * 20,
  });

  const products: IProduct[] = productsData?.data?.data || [];

  return {
    products,
    colors,
    sizes,
    isProductLoading,
    isColorLoading,
    isSizeLoading,
  };
}
