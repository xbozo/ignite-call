import { globalStyles } from "@/styles/global";
import type { AppProps } from "next/app";
import Head from "next/head";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Ignite Call</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
