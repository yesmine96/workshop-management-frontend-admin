export type Role = 'user' | 'admin';

export interface User {
  id: string;
  role: Role;
  email: string;
  firstName: string;
  lastName: string;
  is_active: string;
  last_login: string;
  createdAt: string;
  password?: string;
}

export interface Token {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface Note {
  id: string;
  training: {
    id: string;
    name: string;
  };
  title: string;
  content: string;
}
