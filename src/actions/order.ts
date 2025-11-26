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

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error Fetching Delivery Zones:', error);
  }
};

// * Get Order Summary
export const getOrderSummary = async (payload: {
  order_number: string;
  phone_number: string;
}) => {
  try {
    const res = await fetch(`${baseUrl}/orders/summary`, {
      method: 'POST',
      next: { revalidate: 0 },
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error('Failed To Fetch Order Summary');

    return await res.json();
  } catch (error) {
    console.error('Error Fetching Order Summary:', error);
  }
};

// * Get Invoice PDF
export const getInvoicePDF = async (payload: {
  order_number: string;
  phone_number: string;
}) => {
  try {
    const res = await fetch(`${baseUrl}/orders/invoice`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error('Failed To Fetch Invoice PDF');

    return await res.blob();
  } catch (error) {
    console.error('Error Fetching Invoice PDF:', error);
    return null;
  }
};


// * Download Invoice
export const downloadInvoice = async (payload: {
  order_number: string;
  phone_number: string;
}) => {
  try {
    const res = await fetch(`${baseUrl}/orders/downloadInvoice`, {
      method: 'POST',
      next: { revalidate: 0 },
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error('Failed To Download Invoice');
    
    return await res.blob();
  } catch (error) {
    console.error('Error Downloading Invoice:', error);
  }
};

