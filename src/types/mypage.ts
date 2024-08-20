import { Ilecture, IlectureImage, Iseller } from './lecture';

export interface IOrderSaleList {
  _id: number;
  products: Ilecture[];
  address: Iaddress;
  state: string;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  cost: ICost;
  user?: Iseller;
}

export interface Iaddress {
  name: string;
  value: string;
}

export interface ICost {
  products: number;
  shippingFees: 0;
  discount: IDiscount;
  total: number;
}

export interface IDiscount {
  products: number;
  shippingFees: number;
}

export interface IReviewRegister {
  order_id: number;
  product_id: number;
  rating: number;
  content: string;
}

export interface IReview {
  order_id: number;
  product_id: number;
  rating: 3;
  content: string;
  user_id: number;
  user: Pick<Iseller, 'name' | '_id'>;
  _id: number;
  createdAt: string;
}
