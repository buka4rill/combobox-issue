import { Option, Text, Combobox } from '@coachhubio/nova';
// import { Combobox } from '@coachhubio/nova-combobox';

import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useQuery, useLazyQuery, useApolloClient } from '@apollo/client';
import { GET_CHARACTERS, GET_CHARACTER_INFO } from './graphql/queries/queries.graphql';
import { debounce } from 'lodash';
import {
  Character,
  Characters,
  GetCharacterInfoQuery,
  GetCharacterInfoQueryVariables,
  GetCharactersQuery,
  GetCharactersQueryVariables,
  QueryCharactersArgs,
} from './generated/gql/graphql';

type GetCharacterQueryResult = {
  __typename?: 'Character';
  name?: string | null;
  id?: string | null;
  // info?: { _typename: string; count: number };
} | null;

function App() {
  const apolloClient = useApolloClient();

  const [hasFetched, setFetched] = useState(false);
  const [currentComboboxValue, setCurrentComboboxValue] = useState('');
  const [characterNodes, setCharactersNode] = useState<GetCharacterQueryResult[]>([]);
  const [characterAccount, setCharacterAccount] = useState<GetCharacterInfoQuery>({});

  // Fetch characters
  const [fetchCharactersFromGetCharactersQuery, { data, error }] = useLazyQuery<
    GetCharactersQuery,
    GetCharactersQueryVariables
  >(GET_CHARACTERS, {
    variables: { page: 1, name: currentComboboxValue },
  });

  const debounceFetchMortyCharacters = useMemo(() => {
    return debounce((data: GetCharactersQueryVariables) => {
      setFetched(true);
      fetchCharactersFromGetCharactersQuery({ variables: { page: 1, name: data.name } });
    }, 500);
  }, [fetchCharactersFromGetCharactersQuery]);

  // On page load
  const onPageLoad = () => {
    const id = '14';

    // On page load, set the character info
    // this is to replicate setting setting account on CMP on page load
    apolloClient
      .query({
        query: GET_CHARACTER_INFO,
        variables: { id },
      })
      .then(({ data: dataFromCharacterInfo }) => {
        setCharacterAccount({ ...dataFromCharacterInfo });
      });
  };

  const onComboboxSelection = () => {
    setCurrentComboboxValue(characterAccount.character?.name || '');
  };

  // On page load
  useEffect(onPageLoad, []);

  // On combobox selection
  useEffect(onComboboxSelection, [characterAccount.character?.name]);

  // set charaters for combobox option list
  useEffect(() => {
    if (!data) return;

    setCharactersNode(data?.characters?.results || []);
  }, [data]);

  // replicating the CMP's fetch on input change here...
  useEffect(() => {
    if (!currentComboboxValue) return;

    debounceFetchMortyCharacters({ page: 1, name: currentComboboxValue });
  }, [currentComboboxValue]);

  const handleOnInputChange = async (value: string, event: ChangeEvent<HTMLInputElement>) => {
    if (event?.type === 'change' && event?.target.value.length >= 2) {
      // fetch list 500ms after the user finishes typing
      debounceFetchMortyCharacters({ name: event.target.value });
    }
  };

  const selectCharacter = async (id?: string | null, name?: string | null) => {
    setFetched && setFetched(true);
    if (!(id && name)) return;

    const { data: characterData } = await apolloClient.query({
      query: GET_CHARACTER_INFO,
      variables: { id },
    });

    if (!characterData?.character?.id) return;
    setCharacterAccount({ ...characterData, character: { ...characterData.character } });
  };

  const handleCharacterSelect = (value: string) => {
    if (!value) return;

    const characterNodeResults = characterNodes.find((result) => result!.name === value);

    if (characterNodeResults) selectCharacter(characterNodeResults?.id, characterNodeResults?.name);
  };

  const handleOnChange = (value: string) => {
    if (!value) return;
    handleCharacterSelect(value);
    setCurrentComboboxValue(value);
  };

  return (
    <>
      <Text>Character acc name: {currentComboboxValue}</Text>
      <Combobox
        placeholder="rick and morty"
        value={currentComboboxValue}
        onChange={handleOnChange}
        onInputChange={handleOnInputChange}
        loading={!hasFetched}
        onFocus={(e: any) => e.target.select()}
      >
        {characterNodes.map((result) => (
          <Option
            key={result?.id}
            title={`${result?.name}`}
            value={`${result?.name}`}
            selected={result?.name === currentComboboxValue}
          />
        ))}
      </Combobox>
    </>
  );
}

export default App;
