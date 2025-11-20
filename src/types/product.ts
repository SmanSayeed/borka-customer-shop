export interface ISizeDetail {
  id: number;
  name: string;
  label: string;
  width: string;
  length: string;
  sleeve: string;
}

export interface IStockDetail {
  id: number;
  size: ISizeDetail;
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
