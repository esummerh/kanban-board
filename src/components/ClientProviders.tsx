"use client";

import { NhostProvider } from "@nhost/nextjs";
import { ApolloProvider } from "@apollo/client";
import { nhost } from "@/lib/nhost";
import { createApolloClient } from "@nhost/apollo";

const apolloClient = createApolloClient({ nhost });

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NhostProvider nhost={nhost}>
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </NhostProvider>
  );
}
