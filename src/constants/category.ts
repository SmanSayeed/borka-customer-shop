export const categoryLinks = [
  { name: 'Abaya', path: '/category/abaya' },
  { name: 'Kimono', path: '/category/kimono' },
  { name: 'Salah Khimar', path: '/category/salah-khimar' },
  { name: 'Hijab', path: '/category/hijab' },
  { name: 'Skirt Set', path: '/category/skirt-set' },
  { name: 'Gown', path: '/category/gown' },
  { name: 'Kurti', path: '/category/kurti' },
  { name: 'Kaftan', path: '/category/kaftan' },
];

export type IProduct = {
  name: string;
  price: number ;
  color: string[];
  size: string[];
  quantity: number;
  description: string;
  specification: string[];
  review: string;
}