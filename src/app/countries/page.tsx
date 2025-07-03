'use client'

import { useGetCountriesQuery } from '@/graphql/generated-countries';
import { ApolloProvider } from '@apollo/client'
import countriesClient from '@/lib/countries-client'

function CountriesContent() {
    const { data, loading, error } = useGetCountriesQuery()

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <ul className="space-y-2">
            {data?.countries.map((country) => (
                <li key={country.code} className="border p-2 rounded">
                    {country.name} ({country.code})
                </li>
            ))}
        </ul>
    )
}

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