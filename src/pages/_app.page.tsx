import '@/lib/dayjs';

import { globalStyles } from '@/styles/global';
import type { AppProps } from 'next/app';

import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';

globalStyles();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <title>Ignite Call</title>
      </Head>

      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </QueryClientProvider>
    </>
  );
}
