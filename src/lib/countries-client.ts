// Import components to create a GraphQL client
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Creates a new apollo client instance for querying countries GraphQL API
const countriesClient = new ApolloClient({
    // Link that apollo will use to send GraphQL operations
    link: new HttpLink({
        uri: 'https://countries.trevorblades.com/',
    }),
    // Optimizes data fetching and reduces network requests
    cache: new InMemoryCache(),
});

// It can now be used in components or hooks
export default countriesClient;