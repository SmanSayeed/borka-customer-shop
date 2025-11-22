'use server';

import config from '@/config';

const { baseUrl } = config();

// * Sent User Cart Details
export const sentUserCartDetails = async (payload: Record<string, any>) => {
  try {

    console.log(payload, 'from acton')
    const res = await fetch(`${baseUrl}/cart/get-user-cart-details`, {
      method: 'POST',
      next: { revalidate: 0 },
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error('Failed To Fetch User Cart Details');

    return await res.json();
  } catch (error) {
    console.error('Error Fetching User Cart Details:', error);
}
};
