import { gql, QueryHookOptions } from '@apollo/client';
import { useLocalQuery } from 'hooks/apollo';

export const GET_REVIES = gql`
  query searchReview($idTraining: ID, $idCategory: ID, $idSubCategory: ID, $idTrainer: ID) {
    searchReview(
      idTraining: $idTraining
      idCategory: $idCategory
      idSubCategory: $idSubCategory
      idTrainer: $idTrainer
    ) {
      data {
        id
        text
        idTraining {
          id
          name
          idCategory {
            name
          }
          idSubCategories {
            name
          }
          idTrainer {
            fullName
          }
        }
      }
    }
  }
`;
export const useGetSearch = (options: QueryHookOptions<{ searchReview: { data: any } }, {}> = {}) =>
  useLocalQuery(GET_REVIES, options);
