'use server';

import envConfig from '@/config/envConfig';
import { revalidatePath } from 'next/cache';
const { baseUrl } = envConfig();

export async function getAllProducts(
  filters?: Record<string, string | number>
) {
  try {
    const params = new URLSearchParams(filters as any).toString();

    const res = await fetch(`${baseUrl}/products?${params}`, {
      cache: 'no-store', 
    });

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    throw error;
  }
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

export async function getProductColors () {
  try {
    const res = await fetch(`${baseUrl}/product-colors`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const result = res.json();
    console.log(result)
    return result;
  } catch (error: any) {
    throw Error(error);
  }
}
