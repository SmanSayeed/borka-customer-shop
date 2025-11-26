export interface IHomeProduct {
  id: string | number;
  type: number;
  title: string;
  subtitle: string | null;
  position: number;
  content: IContent[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
  type_label: string;
  type_color: string;
}

export interface IContent {
    id: string;
    url?: string;
    path?: string;
    action_url?: string;
    product_label?: string;
    thumbnail_url?: string;
}

export interface IBannerSlide {
  id: number;
  type: number;
  title: string;
  subtitle: string | null;
  position: number;
  content: {
    url: string;
    path: string;
  };
  is_active: boolean;
  created_at: string;
  updated_at: string;
  type_label: string;
  type_color: string;
}
