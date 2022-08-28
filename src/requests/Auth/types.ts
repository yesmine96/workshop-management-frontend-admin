export type Role = 'user' | 'admin';

export interface User {
  id: string;
  role: Role;
  user_name: string;
  username: string;
  station: string;
  client_id: string;
}

export interface Token {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}
