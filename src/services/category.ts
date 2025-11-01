'use server';

import envConfig from '@/config/envConfig';

const { baseUrl } = envConfig();

//* Get all categories
export const getParentCategories = async () => {
  try {
    const res = await fetch(`${baseUrl}/categories`, {
      method: 'GET',
      next: { revalidate: 0 },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result =  await res.json();
    return result;
  } catch (error: any) {
    throw Error(error);
  }
}
