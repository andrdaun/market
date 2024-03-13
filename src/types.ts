export type Products = {
  id: number;
  products: ProductType[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
};

export type ProductType = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
  thumbnail: string;
};

export type State = {
  data: ProductType[];
  isLoading: boolean;
  basket: number[];
};
