"use client";

import { NhostProvider, useAuthenticationStatus, useNhostClient } from "@nhost/nextjs";
import { ApolloProvider } from "@apollo/client";
import { nhost } from "@/lib/nhost";
import { createApolloClient } from "@nhost/apollo";
import { ReactNode, useEffect, useState } from 'react'
import type { NormalizedCacheObject, ApolloClient } from '@apollo/client'

//const apolloClient = createApolloClient({ nhost });


export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NhostProvider nhost={nhost}>
      <DelayedApolloProvider>{children}</DelayedApolloProvider>
    </NhostProvider>
  );
}

function DelayedApolloProvider({ children }: { children: ReactNode }) {
  const nhostClient = useNhostClient()
  const { isLoading } = useAuthenticationStatus()
  const [apolloClient, setApolloClient] = useState<ApolloClient<NormalizedCacheObject> | null>(null)

  useEffect(() => {
    if (!isLoading) {
      const client = createApolloClient({ nhost: nhostClient })
      setApolloClient(client)
    }
  }, [isLoading, nhostClient])
  
  if (isLoading || !apolloClient) return null

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}
