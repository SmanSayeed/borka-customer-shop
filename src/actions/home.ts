'use server';

import config from '@/config';

const { baseUrl } = config();

// * Get All Home Page Sections
export const getAllHomeSections = async () => {
  try {
    const res = await fetch(`${baseUrl}/home-page-sections`, {
      method: 'GET',
      next: { revalidate: 0 },
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) throw new Error('Failed To Fetch Home Page Sections');

    return await res.json();
  } catch (error) {
    console.error('Error Fetching Home Page Sections:', error);
    return null;
  }
};

// * Get Products By Section ID
export const getProductsBySection = async (sectionId: string | number) => {
  try {
    const res = await fetch(`${baseUrl}/home-page-sections/get-products/${sectionId}`, {
      method: 'GET',
      next: { revalidate: 0 },
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) throw new Error(`Failed To Fetch Products For Section ${sectionId}`);

    return await res.json();
  } catch (error) {
    console.error(`Error Fetching Products By Section (${sectionId}):`, error);
    return null;
  }
};
