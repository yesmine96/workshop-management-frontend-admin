import gql from 'graphql-tag';

import { QueryHookOptions } from '@apollo/client';
import { useLocalQuery, useLocalLazyQuery } from 'hooks/apollo';

export const typesQuery = gql`
  query types($name: String) {
    types(name: $name) {
      count
      data {
        id
        name
      }
    }
  }
`;

export interface TypesData {
  count: number;
  page: number;
  data: {
    id: string;
    name: string;
  }[];
}

export const useTypes = (options: QueryHookOptions<{ types: TypesData }, {}> = {}) =>
  useLocalQuery(typesQuery, options);

export const typeQuery = gql`
  query Type($id: ID!) {
    type(id: $id) {
      id
      name
    }
  }
`;

export interface TypeData {
  id: string;
  name: string;
}

export const useType = (options: QueryHookOptions<{ type: TypeData }, {}> = {}) => useLocalQuery(typeQuery, options);
export const useLazyType = (options: QueryHookOptions<{ types: TypesData }, {}> = {}) =>
  useLocalLazyQuery(typesQuery, options);
