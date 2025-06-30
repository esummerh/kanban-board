import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'https://countries.trevorblades.com/',
    documents: ['src/graphql/**/*.graphql'],
    generates: {
        'src/graphql/generated.ts': {
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