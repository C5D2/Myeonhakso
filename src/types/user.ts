export type UserRole = 'user' | 'seller' | 'admin';

export interface UserData {
  _id: number,
  email: string,
  name: string,
  phone?: string,
  address?: string,
  type: UserRole,
  loginType?: 'email' | 'kakao',
  image?: string | null,
  profile?: string,
  token?: {
    accessToken: string,
    refreshToken: string,
  },
  createdAt: string,
  updatedAt: string,
}

export type UserInToken = Required<Pick<UserData, '_id' | 'name'>> & Pick<UserData, 'profile'> & {
  accessToken: string,
  refreshToken: string,
};

export type UserForm = {
  type: UserRole,
  name: string,
  email: string,
  password: string,
  attach?: string | string[],
  image?: string | null,
  address?: string
};

export type UserLoginForm = Pick<UserForm, 'email' | 'password' >