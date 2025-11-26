export interface ICategory {
  id: number;
  name: string;
<<<<<<< HEAD
  slug: string;
  business_category_id: number | null;
  parent_id: number | null;
}

export interface IProduct {
  id: number;
  slug: string;
  product_code: string;
  thumbnail_url: string;
  original_price: string | number;
  discount_type: string | null;
  discount_value: string | number | null;
  is_discount_active?: number | boolean;
  discount_start_date: string | Date | null;
  discount_end_date: string | Date | null;
  color_name: string | string[];
  color_id: number;
  main_category_id: number;
  category_id: number;
  product_label: string;
  product_category: string;
  sale_price: string | number | null;
  discount_label: string | null;
  name?: string;
  price?: number;
  discount?: number;
  status?: string;
  color?: string[] | string;
  size?: string[];
  quantity?: number;
  description?: string;
  specification?: string[];
  review?: string;
  image?: string[];
  category?: string;
  rating?: number;
  reviews?: number;
}

export interface ProductCardProps {
  product: IProduct;
  height?: string;
  viewMode?: string;
}

export interface IColor {
  id: number;
  color_name: string;
  hex_code: string;
}

export interface FilterState {
  availability: 'all' | 'inStock' | 'outOfStock';
  priceRange: [number, number];
  categories: string[];
  colors: string[];
  sortBy: 'best-selling' | 'price-low' | 'price-high' | 'rating';
}

export interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange?: (filters: FilterState) => void;
  products?: IProduct[];
  productLoading?: boolean;
  categories?: ICategory[];
  categoryLoading?: boolean;
}

export interface ISize {
  id: number;
  name: string;
  code: string;
  length: string;
  width: string;
  sleeve: string;
  unit_of_masurement: string;
  is_active: number;
  label: string;
=======
  price: number;
  discount: number;
  status: string;
  color: string[];
  size: string[];
  quantity: number;
  description: string;
  image: string[];
  category: string;
  rating?: number;
  reviews?: number;
>>>>>>> 811aa7daddb20053522508ce2af68cce8085fe2d
}
