import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      info {
        count
      }
      results {
        name
        id
        status
        species
        type
        gender
        created
        __typename
      }
    }
  }
`;

export const GET_CHARACTER_INFO = gql`
  query GetCharacterInfo($id: ID!) {
    character(id: $id) {
      id
      name
      status
      gender
    }
  }
`;
