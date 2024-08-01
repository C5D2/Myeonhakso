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
}

export interface IlectureImage {
  path: string;
  name: string;
  originalname: string;
}
