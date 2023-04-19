import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";
import MainLayout from "~/components/layouts/MainLayout";
import GlobalContextProvider from "~/context/GlobalContextProvider";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>QuarterMaster</title>
        <meta
          name="description"
          content="QuarterMaster pantry inventory manager"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position="top-center" />
      <GlobalContextProvider>
        <MainLayout></MainLayout>
        <Component {...pageProps} />
      </GlobalContextProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
