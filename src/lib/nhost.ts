import { NhostClient } from '@nhost/nextjs'

export const nhost = new NhostClient({
    //subdomain: 'local',
    //region: 'local',
    authUrl: 'http://localhost:4000/v1',
    graphqlUrl: 'http://localhost:1337/v1/graphql',
    storageUrl: 'http://localhost:9000/v1',
    functionsUrl: 'http://localhost:3000/v1',
})
