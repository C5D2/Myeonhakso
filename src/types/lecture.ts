import { UserData } from '@/types/user';
import { IReview } from './mypage';

export interface Ilecture {
  _id: number;
  seller_id: number;
  price: number;
  shippingFee: number;
  show: boolean;
  active: boolean;
  name: string;
  quantity: number;
  buyQuantity: number;
  mainImages: IlectureImage[];
  createdAt: string;
  updatedAt: string;
  seller: Iseller;
  extra: Iextra;
  replies: number;
  bookmarks: number;
  options: number;
  image?: IlectureImage;
}

export interface Iseller {
  _id: number;
  email: string;
  name: string;
  phone: string;
  address: string;
  image: string;
  extra: any;
}

export interface Iextra {
  type: string;
  level: string;
  schedule: (string | null)[];
  preview: string;
  options: {
    days: string[];
    startTime: string | null;
    endTime: string | null;
  }[];
  curriculum: { content: string }[];
  address?: string;
  url?: string;
}

export interface IlectureImage {
  path: string;
  name: string;
  originalname: string;
}

export interface ILectureRegister extends Omit<Ilecture, 'extra'> {
  content: string;
  extra: Iextra;
}

export interface ILectureDetail extends Omit<ILectureRegister, 'seller'> {
  seller: {
    _id: string;
    name: string;
    email: string;
    profileImage: string | null | undefined;
  };
}

export interface ILectureProducts {
  _id: number;
  quantity: number;
  seller_id: number;
  name: string;
  image: string;
  price: number;
  extra: Iextra;
}

export interface ILectureOrder {
  products: {
    _id: number;
    quantity: number;
  }[];
}

export interface ILectureOrderResponse extends ILectureOrder {
  state: string;
  user_id: number;
  _id: number;
  createdAt: string;
  updatedAt: string;
  cost: {
    products: number;
    shippingFees: number;
    discount: number;
    total: number;
  };
}

export interface ILectureOrderDetail
  extends Omit<ILectureOrderResponse, 'products'> {
  _id: number;
  products: ILectureProducts;
}

export interface ILectureBookmark {
  _id: number;
  user_id: number;
  createdAt: string;
  product: ILectureBookmarkProduct;
}

export interface ILectureBookmarkProduct {
  _id: number;
  name: string;
  price: string;
  quantity: string;
  buyQuantity: number;
  image: string;
  extra: Iextra;
}

export interface ILectureReview
  extends Omit<IReview, 'order_id' | 'product_id' | 'user_id'> {
  Product: {
    _id: number;
    image: string | null;
    name: string;
  };
}
