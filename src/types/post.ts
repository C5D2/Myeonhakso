import { UserData } from './user';

export interface IPostComment {
  _id: number;
  user_id: number;
  user: UserData;
  content: string;
  like: number;
  createdAt: string;
  updatedAt: string;
}

export interface IPost {
  _id: number;
  type?: string;
  title: string;
  content: string;
  user: Pick<UserData, '_id' | 'name' | 'image'>;
  views: number;
  repliesCount: number;
  replies?: IPostComment[];
  createdAt: string;
  updatedAt: string;
}
