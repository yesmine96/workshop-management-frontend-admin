import { gql, MutationHookOptions } from '@apollo/client';
import { useLocalMutation } from 'hooks/apollo';

export const UPDATE_CLIENT = gql`
  mutation updateClient(
    $id: ID!
    $email: String
    $fullName: String
    $telephone: String
    $totalAmountPaid: String
    $idTraining: String
    $valid: Boolean
  ) {
    updateClient(
      id: $id
      email: $email
      fullName: $fullName
      telephone: $telephone
      totalAmountPaid: $totalAmountPaid
      idTraining: $idTraining
      valid: $valid
    ) {
      id
    }
  }
`;
export const useUpdateClient = (options?: MutationHookOptions<{ createTraining: any }, {}>) =>
  useLocalMutation(UPDATE_CLIENT, options);
