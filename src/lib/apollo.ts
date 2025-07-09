// Import apollo client components needed to create the actual client
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
// Import the utility to set custom headers for each GraphQL request (for auth)
import { setContext } from '@apollo/client/link/context'
// Import the configured nhost client from local setup
import { nhost } from './nhost'

// Creates HTTP link pointing to local Hasura GraphQL endpoint
// Where all queries will be sent
const httpLink = new HttpLink({
    uri: 'http://localhost:1337/v1/graphql',
})

// Creates an auth link that attaches the access token to each request
const authLink = setContext(async (_, { headers }) => {
    // Retrieve the current user's access token from nhost
    const accessToken = await nhost.auth.getAccessToken()

    // If token exists, include it in authorization header
    const authorizationHeader = accessToken ? { Authorization: `Bearer ${accessToken}` } : {}

    // Merge existing headers with authorization header
    return {
        headers: {
            ...headers,
            ...authorizationHeader,
        },
    }
})

// Create and export an apollo client instance to use in the app
export const apolloClient = new ApolloClient({
    // Combine the auth link and http link so each request contains the auth token
    link: authLink.concat(httpLink),
    // Use in memory cache for client-side caching of GraphQL data
    cache: new InMemoryCache(),
})