import gql from 'graphql-tag';

import { MutationHookOptions, QueryHookOptions } from '@apollo/client';
import { useLocalMutation, useLocalQuery } from 'hooks/apollo';

import { User, Token } from './types';

export const loginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
        role
        firstName
        lastName
      }
      token {
        tokenType
        accessToken
        refreshToken
        expiresIn
      }
    }
  }
`;

export const usersQuery = gql`
  query ($perPage: Int, $page: Int) {
    users(perPage: $perPage, page: $page, sort: "_id", order: -1, role: "user") {
      count
      data {
        id
        role
        email
        firstName
        lastName
        is_active
        last_login
        createdAt
      }
    }
  }
`;

export const registerMutation = gql`
  mutation Register($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    register(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      user {
        id
        email
        role
        firstName
        lastName
      }
      token {
        tokenType
        accessToken
        refreshToken
        expiresIn
      }
    }
  }
`;

export interface RegisterArguments {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const deleteUserMutation = gql`
  mutation RemoveUser($id: ID!) {
    removeUser(id: $id)
  }
`;
export interface UsersData {
  data: User[];
  page: number;
  totalPages: number;
  count: number;
}

export const updateStatusMutation = gql`
  mutation UpdateUser($id: ID!, $is_active: String!) {
    updateUserStaus(id: $id, is_active: $is_active)
  }
`;

export const useRegister = (options: MutationHookOptions<{ register: LoginData }, RegisterArguments> = {}) =>
  useLocalMutation(registerMutation, options);

export const useUsers = (options: QueryHookOptions<{ users: UsersData }, {}> = {}) =>
  useLocalQuery(usersQuery, options);

export const useStatusUser = (
  options: MutationHookOptions<{ updateUserStaus: boolean }, { id: string; is_active: string }> = {},
) => useLocalMutation(updateStatusMutation, options);

export const useDeleteUser = (options: MutationHookOptions<{ removeUser: string }, { id: string }> = {}) =>
  useLocalMutation(deleteUserMutation, options);

export interface LoginArguments {
  email: string;
  password: string;
}
export interface LoginData {
  user: User;
  token: Token;
}

export const useLogin = (options: MutationHookOptions<{ login: LoginData }, LoginArguments> = {}) =>
  useLocalMutation(loginMutation, options);

export const refreshMutation = gql`
  mutation Refresh($refreshToken: String!) {
    refresh(refreshToken: $refreshToken) {
      user {
        id
        email
        role
        firstName
        lastName
      }
      token {
        tokenType
        accessToken
        refreshToken
        expiresIn
      }
    }
  }
`;

export interface RefreshArguments {
  refreshToken: string;
}

export const useRefresh = (options: MutationHookOptions<LoginData, RefreshArguments> = {}) =>
  useLocalMutation<LoginData, RefreshArguments>(refreshMutation, options);

export const resetMutation = gql`
  mutation Reset($password: String!, $token: String!) {
    reset(password: $password, token: $token) {
      user {
        id
        email
        role
        firstName
        lastName
      }
      token {
        tokenType
        accessToken
        refreshToken
        expiresIn
      }
    }
  }
`;

export interface ResetArguments {
  password: string;
  token: string;
}
export interface ResetData {
  user: User;
  token: Token;
}

export const useReset = (options: MutationHookOptions<{ reset: ResetData }, ResetArguments> = {}) =>
  useLocalMutation(resetMutation, options);
export const logoutMutation = gql`
  mutation logout {
    logout
  }
`;
export interface LogoutData {
  logout: string;
}
export interface UpdateArguments {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const useLogout = (options: MutationHookOptions<{ logout: LogoutData }, ResetArguments> = {}) =>
  useLocalMutation(logoutMutation, options);

export const updateUserMutation = gql`
  mutation updateUserData($id: String!, $email: String!, $password: String, $firstName: String!, $lastName: String!) {
    updateUserData(id: $id, email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      id
      email
      role
      firstName
      lastName
    }
  }
`;

export const useUpdateUser = (options: MutationHookOptions<{ updateUserData: User }, UpdateArguments> = {}) =>
  useLocalMutation(updateUserMutation, options);
