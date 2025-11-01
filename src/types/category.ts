export interface ICategory {
  id: number;
  name: string;
  slug: string;
  business_category_id: number;
  parent_id: number | null;
}
