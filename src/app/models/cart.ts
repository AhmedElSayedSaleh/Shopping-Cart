export interface CartModel {
  id: number;
  userId: number;
  date: string;
  products: [{ productId: number; quantity: number }];
}
