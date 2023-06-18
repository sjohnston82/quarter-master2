import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";
import MainLayout from "~/components/layouts/MainLayout";
import GlobalContextProvider, { GlobalContext } from "~/context/GlobalContextProvider";
import { useContext } from "react";
import Footer from "~/components/layouts/Footer";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Quartermaster</title>
        <meta
          name="description"
          content="Quartermaster pantry inventory manager"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position="top-center" />
      <GlobalContextProvider>
        <div className="h-[100vw-50px] w-[98%] bg-darkgray mx-auto">
        <MainLayout></MainLayout>
          <Component {...pageProps} />
          
        </div>
      </GlobalContextProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
