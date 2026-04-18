export interface ShoeColor {
  name: string;
  hex: string;
}

export type ColorFamily =
  | 'black'
  | 'white'
  | 'red'
  | 'blue'
  | 'brown'
  | 'green'
  | 'grey'
  | 'beige'
  | 'multi';

export type ShoeCategory = 'Formal' | 'Casual' | 'Sport' | 'Boots';

export interface Shoe {
  id: string;
  name: string;
  subtitle: string;
  category: ShoeCategory;
  description: string;
  longDescription: string;
  images: string[];
  colors: ShoeColor[];
  colorFamily: ColorFamily[];
  sizes: number[];
  features: string[];
  materials: string[];
  collection: string;
  isNew: boolean;
  isFeatured: boolean;
  createdAt: number;
}

export type ShoeContextType = {
  shoes: Shoe[];
  getShoe: (id: string) => Shoe | undefined;
  filterByColor: (color: ColorFamily | 'all') => Shoe[];
  filterByCategory: (category: ShoeCategory | 'all') => Shoe[];
  featuredShoes: Shoe[];
  newArrivals: Shoe[];
};
