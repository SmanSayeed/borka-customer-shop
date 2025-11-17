'use client';

import { getAllProducts } from '@/actions/product';
import { IProduct } from '@/types';
import { useQuery } from '@tanstack/react-query';

interface Props {
  filters?: Record<string, string | number>;
}

export default function useProducts({ filters }: Props = {}) {
  // * Get all products using filters
  const { data, isLoading: isProductLoading } = useQuery<IProduct[], Error>({
    queryKey: ['products', filters || {}],
    queryFn: () => getAllProducts(filters),
    staleTime: 1000 * 60 * 2,
    onError: (err) => console.error('Error fetching products:', err),
  });

  const products = data?.data?.data || [];

  return { products, isProductLoading };
}
