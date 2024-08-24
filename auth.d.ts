export declare module '@auth/core/types' {
  
	interface User {
		type: string;
		address?: string;
		accessToken: string;
		refreshToken: string;
		accessTokenExpires?: number;
	}

  interface Session {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires?: number;
  }
}

export declare module '@auth/core/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires?: number;
  }
}
