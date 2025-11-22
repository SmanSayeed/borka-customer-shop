export interface ISize {
  id: number;
  name: string;
  code: string;
  label: string;
  width: string;
  length: string;
  sleeve: string;
  unit_of_masurement: string;
}

export interface IStockDetail {
  id: number;
  size: ISize;
  stock: number;
}

export interface IPriceInfo {
  original_price: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: string;
  is_discount_active: boolean;
  discount_amount: number;
  discount_label: string;
  sale_price: number;
}

export interface ICategory {
  id: number;
  name: string;
  slug: string;
}

export interface IColor {
  id: number;
  color_name: string;
  hex_code: string;
}

export interface IGalleryImage {
  url: string;
}

export interface IProduct {
  id: number;
  slug: string;
  product_code: string;
  thumbnail_url: string;
  original_price: string; 
  discount_type: string;
  discount_value: string;
  is_discount_active: number; 
  color_name: string;
  color_id: number;
  main_category_id: number;
  category_id: number;
  product_label: string;
  product_category: string;
  sale_price: string;
  discount_amount: string;
  discount_label: string;
}


export interface IProductDetails {
  id: number;
  product_name: string;
  product_label: string;
  product_code: string;
  slug: string;
  short_description: string;
  long_description: string;
  specification: string;
  view_count: number;
  thumbnail_url: string;
  gallery_images: IGalleryImage[];
  price_info: IPriceInfo;
  main_category: ICategory;
  category: ICategory;
  color: IColor;
  total_stock: number;
  stock_details: IStockDetail[];
}
