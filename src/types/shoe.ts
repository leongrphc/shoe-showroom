export interface ShoeColor {
  name: string;
  hex: string;
}

export interface Shoe {
  id: string;
  name: string;
  category: string;
  price: number; // Display purposes only
  description: string;
  longDescription: string;
  images: string[]; // Array of URLs, first is main
  colors: ShoeColor[];
  sizes: number[];
  features: string[]; // e.g., "Italian Leather", "Hand-stitched"
  createdAt: number;
}

export type ShoeContextType = {
  shoes: Shoe[];
  getShoe: (id: string) => Shoe | undefined;
  addShoe: (shoe: Omit<Shoe, 'id' | 'createdAt'>) => void;
  deleteShoe: (id: string) => void;
};
