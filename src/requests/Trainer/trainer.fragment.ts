import gql from 'graphql-tag';

export const TRAINER_FRAGMENT = gql`
  fragment Trainer on Trainer {
    id
    fullName
    email
    telephone
    speciality {
      name
    }
  }
`;
