import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { nhost } from './nhost'

const httpLink = new HttpLink({
    uri: 'http://localhost:1337/v1/graphql',
})

const authLink = setContext(async (_, { headers }) => {
    const accessToken = await nhost.auth.getAccessToken()

    const authorizationHeader = accessToken ? { Authorization: `Bearer ${accessToken}` } : {}

    return {
        headers: {
            ...headers,
            ...authorizationHeader,
        },
    }
})

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})