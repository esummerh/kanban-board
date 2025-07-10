'use client'

// Hook to obtain the countries
import { useGetCountriesQuery } from '@/graphql/generated-countries';
// Provides GraphQL context to the React component tree
import { ApolloProvider } from '@apollo/client'
// Custom ApolloClient instance configured for the countries API
import countriesClient from '@/lib/countries-client'

// Fetches and renders the list of countries
function CountriesContent() {
    // Use the GraphQL hook to obtain the countries
    const { data, loading, error } = useGetCountriesQuery()

    // Show loading state while the request is in progress
    if (loading) return <p>Loading...</p>
    // Show the error message if the query fails
    if (error) return <p>Error: {error.message}</p>

    // Render the list of countries
    return (
        <ul className="space-y-2">
            {data?.countries.map((country) => (
                <li key={country.code} className="border p-2 rounded">
                    {/* Display country name and corresponding code */}
                    {country.name} ({country.code})
                </li>
            ))}
        </ul>
    )
}

// Wraps CountriesContent in ApolloProvider
export default function CountriesPage() {
    return (
        <ApolloProvider client={countriesClient}>
            <div className="p-6">
                <h1 className="text-dxl font-bold mb-4">Countries</h1>
                <CountriesContent />
            </div>
        </ApolloProvider>
    )
}