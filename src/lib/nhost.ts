// Import the NhostClient class from the Nhost Next.js SDK
// This provides access to authentication, GraphQL, storage, and serverless functions
import { NhostClient } from '@nhost/nextjs'

// Creates a new instance of NhostClient that connects your app to your local Nhost backend
// Will be used to access auth, GraphQL, etc (basically access the entirety of the backend)
export const nhost = new NhostClient({
  // Used for authentication services (email/password, sessions, etc.)
  //authUrl: 'http://localhost:4000/v1',
  // Used to access the GraphQL API to establish connection to Hasura
  //graphqlUrl: 'http://localhost:1337/v1/graphql',
  // Used for file storage (uploading and retrieving files)
  //storageUrl: 'http://localhost:9000/v1',
  // Used for calling serverless functions
  //functionsUrl: 'http://localhost:3000/v1',
    subdomain: "ftaldrncspwrjlbjqdjx",
    region: "us-east-1",
});
