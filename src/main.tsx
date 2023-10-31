import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      alert(`Graphql error ${message}`);
    });
  }
  if (networkError) {
    console.log(networkError);
  }
});
const link = from([errorLink, new HttpLink({ uri: 'https://rickandmortyapi.com/graphql' })]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  // uri: 'https://rickandmortyapi.com/graphql',
  link,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);
