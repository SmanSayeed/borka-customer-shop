'use server';

import config from '@/config';
const { baseUrl } = config();

// * Fetch all business categories
export const getBusinessCategories = async () => {
  try {
    const res = await fetch(`${baseUrl}/get-all-business-categories`, {
      method: 'GET',
      next: { revalidate: 0 },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  } catch (error: any) {
    console.error('Error fetching business categories:', error.message);
    return null;
  }
};

// * Fetch all parent categories
export const getParentCategories = async () => {
  try {
    const res = await fetch(`${baseUrl}/categories`, {
      method: 'GET',
      next: { revalidate: 0 },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  } catch (error: any) {
    console.error('Error fetching parent categories:', error.message);
    return null;
  }
};

// * Fetch parent categories by business category ID
export const getParentByBusinessCategoryId = async (
  businessCategoryId: string
) => {
  try {
    const res = await fetch(
      `${baseUrl}/categories?business_category_id=${businessCategoryId}`,
      {
        method: 'GET',
        next: { revalidate: 0 },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return await res.json();
  } catch (error: any) {
    console.error(
      'Error fetching parent categories by business category ID:',
      error.message
    );
    return null;
  }
};

// * Fetch subcategories based on parent category ID
export const getSubCategoriesByParentId = async (parentId: string) => {
  try {
    const res = await fetch(`${baseUrl}/categories?parent_id=${parentId}`, {
      method: 'GET',
      next: { revalidate: 0 },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  } catch (error: any) {
    console.error('Error fetching subcategories:', error.message);
    return null;
  }
};
