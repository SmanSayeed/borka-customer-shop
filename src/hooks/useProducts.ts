'use client';

import {
  getAllProducts,
  getProductColors,
  getProductSizes,
} from '@/actions/product';
import { IColor, IProduct, ISize } from '@/types';
import { useQuery } from '@tanstack/react-query';

interface Props {
  filters?: Record<string, string | number>;
}

export default function useProducts({ filters }: Props = {}) {
  // * Get all products using filters
  const { data: productsData, isLoading: isProductLoading } = useQuery<
    IProduct[],
    Error
  >({
    queryKey: ['products', filters || {}],
    queryFn: () => getAllProducts(filters),
    staleTime: 1000 * 60 * 2,
    onError: (err) => console.error('Error fetching products:', err),
  });

  // * Get all product colors
  const { data: colorsData, isLoading: isColorLoading } = useQuery<
    IColor[],
    Error
  >({
    queryKey: ['colors'],
    queryFn: () => getProductColors(),
    staleTime: 1000 * 60 * 2,
    onError: (err) => console.error('Error fetching colors:', err),
  });

  // * Get all product sizes
  const { data: sizesData, isLoading: isSizeLoading } = useQuery<
    ISize[],
    Error
  >({
    queryKey: ['sizes'],
    queryFn: () => getProductSizes(),
    staleTime: 1000 * 60 * 2,
    onError: (err) => console.error('Error fetching sizes:', err),
  });

  const products = productsData?.data?.data || [];
  const colors = colorsData?.data || [];
  const sizes = sizesData?.data || [];

  return {
    products,
    colors,
    sizes,
    isProductLoading,
    isColorLoading,
    isSizeLoading,
  };
}
