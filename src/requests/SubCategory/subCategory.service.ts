import { gql, QueryHookOptions } from '@apollo/client';
import { useLocalQuery } from 'hooks/apollo';
import { IsubCategory } from './subCategory.types';

const GET_SubCategory = gql`
  query subCategorys($idCategory: ID) {
    subCategorys(idCategory: $idCategory) {
      data {
        id
        name
      }
    }
  }
`;
export const useSubCategory = (options: QueryHookOptions<{ subCategorys: { data: IsubCategory[] } }, {}> = {}) =>
  useLocalQuery(GET_SubCategory, options);
