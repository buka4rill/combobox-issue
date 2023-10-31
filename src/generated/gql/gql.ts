/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query GetCharacterInfo($id: ID!) {\n  character(id: $id) {\n    id\n    name\n    status\n    gender\n  }\n}": types.GetCharacterInfoDocument,
    "query GetCharacters($page: Int, $name: String) {\n  characters(page: $page, filter: {name: $name}) {\n    info {\n      count\n    }\n    results {\n      name\n    }\n  }\n}": types.GetCharactersDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCharacterInfo($id: ID!) {\n  character(id: $id) {\n    id\n    name\n    status\n    gender\n  }\n}"): typeof import('./graphql').GetCharacterInfoDocument;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCharacters($page: Int, $name: String) {\n  characters(page: $page, filter: {name: $name}) {\n    info {\n      count\n    }\n    results {\n      name\n    }\n  }\n}"): typeof import('./graphql').GetCharactersDocument;


export function gql(source: string) {
  return (documents as any)[source] ?? {};
}
