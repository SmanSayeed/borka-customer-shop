export interface ICart {
  product_id: number;
  quantity: number;
  size_id: number | null;
  cart_expiry?: number;
}

export interface ICartPriceInfo {
  original_price: string;
  discount_type: 'fixed' | 'percentage' | null;
  discount_value: string | number;
  is_discount_active: boolean;
  discount_amount: string | number;
  discount_label: string;
  sale_price: number;
}

export interface ICartProduct {
  id: number;
  product_label: string;
  quantity: number;
  thumbnail_url: string;

  size_id: number;
  size_name: string;
  size_code: string;

  stock: number;

  price_info: ICartPriceInfo;
}

export interface ICartData {
  products: ICartProduct[];

  cart_total: number;
  discount_amount: number;
  payable_amount: number;

  delivery_charge: number | null;
  advance_payment: string | number;
}
