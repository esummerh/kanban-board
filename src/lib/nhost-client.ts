import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const nhostClient = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:1337/v1/graphql',
    }),
    cache: new InMemoryCache(),
})

export default nhostClient