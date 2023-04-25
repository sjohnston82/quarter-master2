import React, { useEffect, useContext } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import Image from "next/image";
import LogoutIcon from "@mui/icons-material/Logout";
import { GlobalContext } from "~/context/GlobalContextProvider";

const MainLayout = () => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();
  const { householdName, setBottomNavValue } = useContext(GlobalContext);

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
    <div className="flex h-20 w-full items-center justify-between border-b border-slate-900 ">
      <div className="ml-4 w-full items-center justify-center  text-2xl italic">
        QuarterMaster
      </div>

      <div className=" relative mr-4 flex w-full justify-end text-right ">
        {sessionData ? (
          <div className="">
            <div className="flex items-center gap-2 ">
              <Image
                src={sessionData?.user?.image ?? ""}
                width={30}
                height={30}
                className="rounded-full"
                alt={sessionData?.user?.name ?? ""}
              />
              <LogoutIcon
                className="cursor-pointer hover:text-indigo-600"
                onClick={() => void signOutWithRedirect()}
              />
            </div>
            <div className="absolute right-0 top-8 ">
              <p className="text-xs cursor-pointer" onClick={() => setBottomNavValue(2)}>
                {householdName} Household
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <span
              className="cursor-pointer hover:text-indigo-600"
              onClick={() => void signIn()}
            >
              Sign In
            </span>
          </div>
        )}

        {/* <button
          className=""
          onClick={
            sessionData ? () => void signOutWithRedirect() : () => void signIn()
          }
        >
          {sessionData ? (
            <LogoutIcon />
          ) : (
            <span className="w-1/3">Sign in</span>
          )}
        </button> */}
      </div>
    </div>
  );
};

export default MainLayout;
