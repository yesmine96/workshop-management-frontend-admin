import { gql, MutationHookOptions, QueryHookOptions } from '@apollo/client';
import { useLocalMutation, useLocalQuery } from 'hooks/apollo';
import { TRAINING_FRAGMENT } from './training.fragment';
import { ITraining } from './training.types';
export const GET_TRAININGS = gql`
  query trainings {
    trainings {
      data {
        ...Training
        idCategory {
          name
        }
        idSubCategories {
          name
        }
        idTrainer {
          id
          fullName
        }
      }
    }
  }
  ${TRAINING_FRAGMENT}
`;
export const GET_TRAINING = gql`
  query training($id: ID!) {
    training(id: $id) {
      ...Training
      idCategory {
        ic
        name
      }
      idSubCategories {
        id
        name
      }
      idTrainer {
        id
        fullName
      }
    }
  }
  ${TRAINING_FRAGMENT}
`;
export const useGetTrainings = (options: QueryHookOptions<{ trainings: { data: ITraining[] } }, {}> = {}) =>
  useLocalQuery(GET_TRAININGS, options);
export const useGetTraining = (options: QueryHookOptions<{ training: ITraining }, {}> = {}) =>
  useLocalQuery(GET_TRAINING, options);
export const CREATE_TRAINING = gql`
  mutation createTraining(
    $name: String
    $price: String!
    $idCategory: ID
    $idSubCategories: ID
    $membersNumber: Int!
    $image: [Upload]
    $description: String
    $idTrainer: ID
    $dateStart: String!
    $dateEnd: String!
  ) {
    createTraining(
      name: $name
      price: $price
      idCategory: $idCategory
      idSubCategories: $idSubCategories
      membersNumber: $membersNumber
      image: $image
      description: $description
      idTrainer: $idTrainer
      dateStart: $dateStart
      dateEnd: $dateEnd
    ) {
      id
      name
    }
  }
`;
export const useCreateTraining = (options?: MutationHookOptions<{ createTraining: ITraining }, {}>) =>
  useLocalMutation(CREATE_TRAINING, options);
