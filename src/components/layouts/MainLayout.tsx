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
    <div className="flex flex-col">
      <div className="flex h-16 items-center justify-center bg-snow font-ALoveofThunder text-4xl text-woodsmoke underline  ">
        <h1 className="">
          <span className="text-[42px]">Q</span>uartermaster
        </h1>
      </div>
      <div className="flex h-10 items-center justify-between bg-mango px-2">
        <div className="">
          <p
            className="w-full cursor-pointer p-1 text-sm text-snow "
            onClick={() => setBottomNavValue(2)}
          >
            {householdName && `${householdName} Household`}
          </p>
        </div>
        <div className="">
          {sessionData ? (
            <div className="flex-end flex items-end">
              <div className="flex items-center gap-2 ">
                <Image
                  src={sessionData?.user?.image ?? ""}
                  width={30}
                  height={30}
                  className="rounded-full"
                  alt={sessionData?.user?.name ?? ""}
                />
                <LogoutIcon
                  className="cursor-pointer text-snow hover:text-indigo-600"
                  onClick={() => void signOutWithRedirect()}
                />
              </div>
            </div>
          ) : (
            <div className="w-full">
              <span
                className="cursor-pointer text-snow hover:text-indigo-600"
                onClick={() => void signIn()}
                role="dialog"
              >
                Sign In
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
    // <div className="flex h-20 w-full items-center justify-between border-b border-slate-900 bg-copper-rust ">
    //   <div className="ml-4 w-full items-center justify-center text-frost text-bold text-3xl font-Evogria underline decoration-breaker-bay">
    //     <span className="text-calypso text-4xl">Q</span>uarter<span className="text-calypso text-4xl">M</span>
    //     aster
    //   </div>

    //   <div className=" relative mr-4 flex w-full justify-end text-right ">
    // {sessionData ? (
    //   <div className="flex flex-end items-end">
    //     <div className="flex items-center gap-2 ">
    //       <Image
    //         src={sessionData?.user?.image ?? ""}
    //         width={30}
    //         height={30}
    //         className="rounded-full"
    //         alt={sessionData?.user?.name ?? ""}
    //       />
    //       <LogoutIcon
    //         className="cursor-pointer hover:text-indigo-600 text-frost"
    //         onClick={() => void signOutWithRedirect()}
    //       />
    //     </div>
    //     <div className="absolute right-0 top-8 w-full">
    //       <p
    //         className="cursor-pointer text-xs w-full text-breaker-bay"
    //         onClick={() => setBottomNavValue(2)}
    //       >
    //         {householdName && `${householdName} Household`}
    //       </p>
    //     </div>
    //   </div>
    // ) : (
    //   <div className="w-full">
    //     <span
    //       className="cursor-pointer hover:text-indigo-600"
    //       onClick={() => void signIn()}
    //     >
    //       Sign In
    //     </span>
    //   </div>
    // )}
    //   </div>
    // </div>
  );
};

export default MainLayout;
