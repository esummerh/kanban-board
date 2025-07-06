import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    generates: {
        'src/graphql/generated-boards.ts': {
            schema: 'http://localhost:1337/v1/graphql',
            documents: ['src/graphql/boards.graphql'],
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-apollo'
            ],
            config: {
                scalars: {
                    bigint: 'string',
                    bytea: 'string',
                    citext: 'string',
                    jsonb: 'Record<string, unknown>',
                    timestamptz: 'string',
                    uuid: 'string',
                },
                apolloReactHooksImportFrom: '@apollo/client',
                apolloReactCommonImportFrom: '@apollo/client',
            },
        },
        'src/graphql/generated-countries.ts': {
            schema: 'https://countries.trevorblades.com/graphql',
            documents: ['src/graphql/countries.graphql'],
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-apollo'
            ],
        },
    },
    hooks: {
        afterAllFileWrite: ['prettier --write'],
    },
};

export default config;