'use server';

import config from '@/config';

const { baseUrl } = config();

// * Get All Products
export const getAllProducts = async (
  filters?: Record<string, string | number | string[]>
) => {
  try {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((val) => params.append(`${key}[]`, val.toString()));
        } else if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
    }

    const queryString = params.toString();
    const res = await fetch(`${baseUrl}/products?${queryString}`, {
      method: 'GET',
      next: { revalidate: 0 },
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed To Fetch Products');
    return await res.json();
  } catch (error) {
    console.error('Error Fetching Products:', error);
  }
};

// * Get All Product Colors
export const getProductColors = async () => {
  try {
    const res = await fetch(`${baseUrl}/product-colors`, {
      method: 'GET',
      next: { revalidate: 0 },
      headers: { 'Content-Type': 'application/json' },
    });
    return await res.json();
  } catch (error) {
    console.error('Error Fetching Product Colors:', error);
  }
};

// * Get All Product Sizes
export const getProductSizes = async () => {
  try {
    const res = await fetch(`${baseUrl}/get-all-sizes`, {
      method: 'GET',
      next: { revalidate: 0 },
      headers: { 'Content-Type': 'application/json' },
    });
    return await res.json();
  } catch (error) {
    console.error('Error Fetching Product Sizes:', error);
  }
};

// * Send Product Stock Payload (Post Method)
export const sendProductStock = async (payload: Record<string, any>) => {
  try {
    const res = await fetch(`${baseUrl}/products/get-stock`, {
      method: 'POST',
      next: { revalidate: 0 },
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed To Fetch Product Stock');
    return await res.json();
  } catch (error) {
    console.error('Error Fetching Product Stock:', error);
  }
};

// * Get Product Details By Id
export const getProductById = async (productId: string) => {
  try {
    const res = await fetch(`${baseUrl}/products/${productId}`, {
      method: 'GET',
      next: { revalidate: 0 },
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed To Fetch Product Details');
    return await res.json();
  } catch (error) {
    console.error('Error Fetching Product By Id:', error);
  }
};
