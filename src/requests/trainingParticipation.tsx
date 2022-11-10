import { MutationHookOptions } from '@apollo/client';

import gql from "graphql-tag";
import { useLocalMutation } from "hooks/apollo";

export const addParticipation = gql`
mutation createTrainingParticipation($idTraining: ID! $clientInfo:clientInfo) {
  createTrainingParticipation(idTraining: $idTraining  clientInfo:$clientInfo) 
    
    {valid}
  
}
`;
export const useaddParticipation = (
    options: MutationHookOptions<{ createTrainingParticipation: any }> = {},
  ) => useLocalMutation(addParticipation, options);