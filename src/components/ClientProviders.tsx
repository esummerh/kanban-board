"use client";

// Imports for Nhost and Apollo
// Tools for auth/client context
import { NhostProvider, useAuthenticationStatus, useNhostClient } from "@nhost/nextjs";
// Enables Apollo GraphQL usage
import { ApolloProvider } from "@apollo/client";
// Preconfigured Nhost client
import { nhost } from "@/lib/nhost";
// Function to create an Apollo Client using Nhost auth
import { createApolloClient } from "@nhost/apollo";
// React utilities
import { ReactNode, useEffect, useState } from 'react'
// Type definitions
import type { NormalizedCacheObject, ApolloClient } from '@apollo/client'

// Wraps the app with both Nhost and Apollo
export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Provides the Nhost client context to all children
    <NhostProvider nhost={nhost}>
      <DelayedApolloProvider>{children}</DelayedApolloProvider>
    </NhostProvider>
  );
}

// Waits for auth state before creating Apollo client
function DelayedApolloProvider({ children }: { children: ReactNode }) {
  // Gets the current Nhost client from context
  const nhostClient = useNhostClient()
  // Checks if authentication status is still loading
  const { isLoading } = useAuthenticationStatus()
  // Apollo client state is initially null
  const [apolloClient, setApolloClient] = useState<ApolloClient<NormalizedCacheObject> | null>(null)

  // When loading finishes, create the Apollo client
  useEffect(() => {
    if (!isLoading) {
      const client = createApolloClient({ nhost: nhostClient })
      setApolloClient(client)
    }
  }, [isLoading, nhostClient])
  
  // Don't render anything until auth and Apollo client are ready
  if (isLoading || !apolloClient) return null

  // Provide the Apollo client to all children, meaning all React elements (components, routes, pages, etc.)
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}
