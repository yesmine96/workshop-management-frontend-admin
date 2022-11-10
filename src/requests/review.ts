import { MutationHookOptions, QueryHookOptions } from '@apollo/client';

import gql from "graphql-tag";
import { useLocalMutation, useLocalQuery } from "hooks/apollo";

export const addReview = gql`
mutation   createReview($idTraining: ID $email:String $text:String) {
    createReview(idTraining: $idTraining  email:$email text:$text) 
    
    {id}
  
}
`;

export const GET_REVIES = gql`
  query searchReview($idTraining: ID, $idCategory: ID, $idSubCategory: ID, $idTrainer: ID) {
    searchReview(idTraining: $idTraining
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
export const useaddReview = (
    options: MutationHookOptions<{   createReview:any }> = {},
  ) => useLocalMutation(addReview, options);
  export const useGetSearch = (options: QueryHookOptions<{ searchReview: { data: any } }, {}> = {}) =>
  useLocalQuery(GET_REVIES, options);