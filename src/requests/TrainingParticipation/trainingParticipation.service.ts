import { gql, QueryHookOptions } from '@apollo/client';
import { useLocalQuery } from 'hooks/apollo';
import { ItrainingParticipation } from './trainingParticipation.type';

export const GET_TRAINING_PARTCIPATION = gql`
  query getClientParticipated($idTraining: ID!) {
    getClientParticipated(idTraining: $idTraining) {
      data {
        idClient {
          id
          email
          fullName
          telephone
          totalAmountPaid
        }
        valid
      }
    }
  }
`;

export const useGetClientParticipated = (
  options: QueryHookOptions<{ getClientParticipated: { data: ItrainingParticipation[] } }, {}> = {},
) => useLocalQuery(GET_TRAINING_PARTCIPATION, options);
