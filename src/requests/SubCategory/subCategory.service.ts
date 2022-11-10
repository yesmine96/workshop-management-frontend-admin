import { gql, QueryHookOptions } from '@apollo/client';
import { useLocalQuery } from 'hooks/apollo';
import { IsubCategory } from './subCategory.types';

const GET_SUBCATEGORY = gql`
  query subCategorys($idCategory: ID) {
    subCategorys(idCategory: $idCategory) {
      data {
        id
        name
        idCategory{
          id
        }
      }
    }
  }
`;
export const useSubCategory = (options: QueryHookOptions<{ subCategorys: { data: IsubCategory[] } }, {}> = {}) =>
  useLocalQuery(GET_SUBCATEGORY, options);
