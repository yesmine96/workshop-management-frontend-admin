import { gql, MutationHookOptions, QueryHookOptions } from '@apollo/client';
import { useLocalLazyQuery, useLocalMutation, useLocalQuery } from 'hooks/apollo';
import { TRAINER_FRAGMENT } from './trainer.fragment';
import { TrainerData } from './trainer.types';

const GET_Trainer = gql`
  query trainer($id: ID!) {
    trainer(id: $id) {
      ...Trainer
    }
  }
  ${TRAINER_FRAGMENT}
`;
export const useGetTrainer = (options: QueryHookOptions<{ trainer: TrainerData; id: string }, {}> = {}) => {
  return useLocalLazyQuery(GET_Trainer, options);
};

const GET_Trainers = gql`
  query trainers($speciality: ID, $availablity: Boolean) {
    trainers(speciality: $speciality, availablity: $availablity) {
      data {
        ...Trainer
        speciality {
          name
        }
      }
    }
  }
  ${TRAINER_FRAGMENT}
`;
export const useGetTrainers = (options: QueryHookOptions<{ trainers: { data: TrainerData[] } }, {}> = {}) =>
  useLocalQuery(GET_Trainers, options);
const DELETE_Trainer = gql`
  mutation removeTrainer($ids: [ID]) {
    removeTrainer(ids: $ids)
  }
`;

export const UPDATE_TRAINER_MUTATION = gql`
  mutation updateTrainer($id: ID!, $fullName: String, $email: String, $telephone: String, $speciality: ID) {
    updateTrainer(id: $id, fullName: $fullName, email: $email, telephone: $telephone, speciality: $speciality) {
      id
    }
  }
`;
export const ADD_TRAINER_MUTATION = gql`
  mutation createTrainer($fullName: String, $email: String, $telephone: String, $speciality: ID) {
    createTrainer(fullName: $fullName, email: $email, telephone: $telephone, speciality: $speciality) {
      id
    }
  }
`;

export const useDeleteTrainer = (options?: MutationHookOptions<{}, {}>) => useLocalMutation(DELETE_Trainer, options);
export const useUpdateTrainer = (options: MutationHookOptions<any> = {}) =>
  useLocalMutation(UPDATE_TRAINER_MUTATION, options);
export const useAddTrainer = (options: MutationHookOptions<any> = {}) =>
  useLocalMutation(ADD_TRAINER_MUTATION, options);
