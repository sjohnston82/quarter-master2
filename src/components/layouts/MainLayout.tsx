import React, { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

const MainLayout = () => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (status !== "loading" && sessionData === null) {
  //     void router.push("/");
  //   }
  // }, [router, sessionData, status]);
  const signOutWithRedirect = () => {
    void signOut();
    void router.push("/");
  };

  return (
    <div className="flex h-20 items-center justify-between">
      <div className="">QM</div>
      <div className="">QuarterMaster</div>
      <div className="">
        <div className="flex  items-center justify-center gap-4">
          <p className="">
            {sessionData && <span>Hello, {sessionData.user?.name}</span>}
          </p>
          <button
            className=""
            onClick={
              sessionData
                ? () => void signOutWithRedirect()
                : () => void signIn()
            }
          >
            {sessionData ? "Sign out" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
