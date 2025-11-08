'use server';

import envConfig from '@/config/envConfig';

const { baseUrl } = envConfig();

export interface ProductFilters {
  category?: string[];
  color?: string[];
  min_price?: number;
  max_price?: number;
  search?: string;
}

// export const FetchAllProduct = async (
//   page = 1,
//   perPage = 12,
//   filters: ProductFilters = {}
// ) => {
//   try {
//     const params = new URLSearchParams();

//     // Category
//     if (filters.category?.length) {
//       filters.category.forEach((cat) => params.append('category[]', cat));
//     }

//     // Color
//     if (filters.color?.length) {
//       filters.color.forEach((clr) => params.append('color[]', clr));
//     }

//     // Search
//     if (filters.search) params.append('search', filters.search);

//     // Price range
//     if (filters.min_price !== undefined)
//       params.append('min_price', filters.min_price.toString());
//     if (filters.max_price !== undefined)
//       params.append('max_price', filters.max_price.toString());

//     // Pagination
//     params.append('page', page.toString());
//     params.append('per_page', perPage.toString());

//     const apiUrl = `${baseUrl}/products?${params.toString()}`;

//     const res = await fetch(apiUrl, {
//       method: 'GET',
//       cache: 'no-store',
//       next: { tags: ['products'] },
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (!res.ok) {
//       throw new Error(`Failed to fetch products: ${res.statusText}`);
//     }

//     return await res.json();
//   } catch (error: any) {
//     console.error('Error fetching products:', error);
//     throw new Error(error.message || 'Something went wrong');
//   }
// };

export const getAllProducts = async (
  page: number = 1,
  perPage: number = 12,
  query?: { [key: string]: string | string[] | undefined }
) => {
  try {
    const params = new URLSearchParams();

    // 🔹 Category
    if (query.category?.length) {
      query.category.forEach((cat) => params.append('category[]', cat));
    }

    // 🔹 Color
    if (query.color?.length) {
      query.color.forEach((clr) => params.append('color[]', clr));
    }

    // 🔹 Search
    if (query.search) params.append('search', query.search);

    // 🔹 Price range
    if (query.min_price !== undefined)
      params.append('min_price', query.min_price.toString());
    if (query.max_price !== undefined)
      params.append('max_price', query.max_price.toString());

    // 🔹 Pagination
    params.append('page', page.toString());
    params.append('per_page', perPage.toString());

    // ✅ Final API URL
    const apiUrl = `${baseUrl}/products?${params.toString()}`;
    console.log('🔗 Final Product API:', apiUrl);

    const res = await fetch(apiUrl, {
      method: 'GET',
      cache: 'no-store', // important for fresh data
      next: { tags: ['PRODUCT'] },
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error('❌ Error fetching products:', error);
    throw new Error(
      error.message || 'Something went wrong while fetching products'
    );
  }
};