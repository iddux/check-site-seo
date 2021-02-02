export interface LoginRequest {
  accessToken: string;
  refreshToken: string;
  user: {
    _id: string,
    username: string,
    email: string,
  };
}
