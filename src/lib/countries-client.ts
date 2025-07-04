import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const countriesClient = new ApolloClient({
    link: new HttpLink({
        uri: 'https://countries.trevorblades.com/',
    }),
    cache: new InMemoryCache(),
});

export default countriesClient;