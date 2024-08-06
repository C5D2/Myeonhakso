import { UserData } from '@/types/user';

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
  extra: any;
  seller: Iseller;
  replies: number;
  bookmarks: number;
  options: number;
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

export interface IlectureImage {
  path: string;
  name: string;
  originalname: string;
}

export interface ILectureRegister extends Ilecture {
  extra: {
    type?: string;
    level: string;
    schedule: string;
    preview: string;
    content: string;
    options: string;
    curriculum: string;
    address?: string;
    url?: string;
  };
}
