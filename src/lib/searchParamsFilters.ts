export const buildSearchParamsFromFilters = (filters: any) => {
  const params = new URLSearchParams();

  // Default values skip list
  const DEFAULTS = {
    min_price: 1,
    max_price: 100000,
    page: 1,
    grid: 3,
  };

  // Single-value filters
  if (filters.search) params.set('search', filters.search);
  if (filters.sort_by) params.set('sort_by', filters.sort_by);

  if (filters.min_price !== DEFAULTS.min_price)
    params.set('min_price', filters.min_price.toString());

  if (filters.max_price !== DEFAULTS.max_price)
    params.set('max_price', filters.max_price.toString());

  if (filters.page !== DEFAULTS.page)
    params.set('page', filters.page.toString());

  if (filters.grid !== DEFAULTS.grid)
    params.set('grid', filters.grid.toString());

  // Multi-value filters
  filters.availability?.forEach((v: string) =>
    params.append('availability', v)
  );
  filters.main_category?.forEach((v: string) =>
    params.append('main_category[]', v)
  );
  filters.category?.forEach((v: string) => params.append('category[]', v));
  filters.color?.forEach((v: string) => params.append('color[]', v));
  filters.size?.forEach((v: string) => params.append('size[]', v));

  return params;
};
