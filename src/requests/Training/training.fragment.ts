import gql from 'graphql-tag';

export const TRAINING_FRAGMENT = gql`
  fragment Training on Training {
    id
    name
    price
    membersNumber

    dateStart
    dateEnd
    image
  }
`;
