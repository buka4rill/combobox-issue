import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://rickandmortyapi.com/graphql',
  documents: ['src/graphql/**/*.graphql'],
  generates: {
    'src/generated/gql/': {
      preset: 'client',
      config: {
        documentMode: 'string',
      },
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
