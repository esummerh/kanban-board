// Import the type definition for the Codegen config object
import type { CodegenConfig } from '@graphql-codegen/cli';

// Define the Codegen configuration object
const config: CodegenConfig = {
    // Where and how to generate typescript types and hooks
    generates: {
        // Generates GraphQL types + hooks for the local Nhost/Hasura backend
        'src/graphql/generated-boards.ts': {
            // Schema URL for GraphQL backend
            schema: 'http://localhost:1337/v1/graphql',
            // File containing GraphQL operations
            documents: ['src/graphql/boards.graphql'],
            // Plugins used to generate:
            // - Typescript types for GraphQL types
            // - Typed hooks for React Apollo
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-apollo'
            ],
            // Configuration for generated code
            config: {
                // Custom scalar type mappings
                scalars: {
                    bigint: 'string',
                    bytea: 'string',
                    citext: 'string',
                    jsonb: 'Record<string, unknown>',
                    timestamptz: 'string',
                    uuid: 'string',
                },
                // Use 'import type' instead of regular 'import' for better safety
                useTypeImports: true,
                // Avoid generating input fields you don't explicitly define
                omitInputFieldsByDefault: true,
                // Ensures generated hooks import from '@apollo/client'
                apolloReactHooksImportFrom: '@apollo/client',
                apolloReactCommonImportFrom: '@apollo/client',
            },
        },
        // Generate GraphQL types + hooks for the public Countries API
        'src/graphql/generated-countries.ts': {
            // Schema URL for the Countries GraphQL API
            schema: 'https://countries.trevorblades.com/graphql',
            // Location of operations for that API
            documents: ['src/graphql/countries.graphql'],
            // Same plugin stack as above
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-apollo'
            ],
        },
    },
    // Run Prettier on the output files after codegen completes
    hooks: {
        afterAllFileWrite: ['prettier --write'],
    },
};
// Export the config object so it can be used by the 'graphql-codegen' CLI
export default config;