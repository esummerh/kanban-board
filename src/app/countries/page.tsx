'use client'

import { useGetCountriesQuery } from '@/graphql/generated';

export default function CountriesPage() {
    const { data, loading, error } = useGetCountriesQuery();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="p-6">
            <h1 className="text-dxl font-bold mb-4">Countries</h1>
            <ul className="space-y-2">
                {data?.countries.map((country) => (
                    <li key={country.code} className="border p-2 rounded">
                        {country.name} ({country.code})
                    </li>
                ))}
            </ul>
        </div>
    );
}