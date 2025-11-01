

export interface IProduct {
  id: number;
  slug: string;
  product_code: string;
  thumbnail_url: string;
  original_price: string | number;
  discount_type: string | null;
  discount_value: string | number | null;
  discount_start_date: string | Date | null;
  discount_end_date: string | Date | null;
  color_name: string;
  color_id: number;
  main_category_id: number;
  category_id: number;
  product_label: string;
  product_category: string;
  sale_price: string | number | null;
  discount_label: string | null;
}

export interface ProductCardProps {
  product: IProduct;
  height?: string;
  viewMode?: string;
}