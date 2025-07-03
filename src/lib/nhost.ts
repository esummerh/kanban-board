import { NhostClient } from '@nhost/nextjs'

export const nhost = new NhostClient({
    subdomain: 'local',
    region: 'local',
    graphqlUrl: 'http://localhost:1337/v1/graphql',
    adminSecret: 'nhost-admin-secret'
})
