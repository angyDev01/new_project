
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  longDescription: string;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
}

export interface CartItem extends Product {
  quantity: number;
}
