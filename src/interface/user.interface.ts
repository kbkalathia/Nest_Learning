export interface UserDetails {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  refreshToken: string;
  createdAt?: string;
  updatedAt?: string;
}
