import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const MainLayout = () => {
  const { data: sessionData } = useSession();

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
            onClick={sessionData ? () => void signOut() : () => void signIn()}
          >
            {sessionData ? "Sign out" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
