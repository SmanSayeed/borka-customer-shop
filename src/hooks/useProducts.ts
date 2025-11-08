'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FilterAllProducts } from '@/services/product';

export interface FilterParams {
  category?: string[];
  color?: string[];
  min_price?: number;
  max_price?: number;
  search?: string;
  sort?: string;
}

const useProducts = () => {
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [filters, setFilters] = useState<FilterParams>({});

  const queryKey = useMemo(() => ['products', page, filters], [page, filters]);

  const { data: productsData, isLoading: isProductLoading } = useQuery({
    queryKey,
    queryFn: () => FilterAllProducts(page, perPage, filters),
    keepPreviousData: true,
  });

  const responseData = productsData?.data;
  const products = responseData?.data || [];
  const pagination = responseData || {};
  const total = pagination?.total ?? 0;
  const lastPage = pagination?.last_page ?? Math.ceil(total / perPage);
  const currentPage = pagination?.current_page ?? page;

  return {
    products,
    isProductLoading,
    pagination,
    total,
    lastPage,
    currentPage,
    page,
    setPage,
    filters,
    setFilters,
  };
};

export default useProducts;
