'use server';

import config from '@/config';

const { baseUrl } = config();

// * Create An Order
export const createOrder = async (orderData: any) => {
  try {
    const res = await fetch(`${baseUrl}/orders/create`, {
      method: 'POST',
      next: { revalidate: 0 },
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) throw new Error('Failed To Create Order');

    return await res.json();
  } catch (error) {
    console.error('Error Creating Order:', error);
  }
};

// * Get Delivery Zones
export const getDeliveryZones = async () => {
  try {
    const res = await fetch(`${baseUrl}/delivery-zones`, {
      method: 'GET',
      next: { revalidate: 0 },
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) throw new Error('Failed To Fetch Delivery Zones');

    return await res.json();
  } catch (error) {
    console.error('Error Fetching Delivery Zones:', error);
  }
};