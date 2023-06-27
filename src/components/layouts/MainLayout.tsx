import { useContext, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import LogoutIcon from "@mui/icons-material/Logout";
import { GlobalContext } from "~/context/GlobalContextProvider";
import Searchbar from "../ui/Searchbar";
import { cn } from "~/utils/cn";

const MainLayout = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { householdName, setNavValue, windowSize } = useContext(GlobalContext);
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const signOutWithRedirect = () => {
    void signOut();
    void router.push("/");
  };

  return (
    <div className="flex flex-col bg-darkgray">
      <div className="flex h-full items-center justify-center bg-darkgray font-RubikMonoOne text-4xl text-woodsmoke underline lg:text-5xl  ">
        <h1 className=" text-slate-300 ">
          <span className="text-[42px] lg:text-6xl">Q</span>UARTERMASTER
        </h1>
      </div>
      <div className="flex h-14 items-center justify-between rounded-t-xl bg-mango px-2">
        <div className="flex items-center sm:w-1/2 md:w-2/5 lg:w-1/3 xl:w-1/4 2xl:w-1/5">
          {windowSize.innerWidth < 640 && domLoaded ? (
            <p
              className="w-full cursor-pointer p-1 text-sm text-snow "
              onClick={() => setNavValue(2)}
              role="dialog"
            >
              {householdName && `${householdName} Household`}
            </p>
          ) : (
            domLoaded && sessionData && <Searchbar />
          )}
        </div>

        <div className="">
          {sessionData ? (
            <div className="flex-end flex items-end">
              <div className="flex items-center gap-2 ">
                <Image
                  src={sessionData?.user?.image ?? ""}
                  width={windowSize.innerWidth > 639 ? 40 : 30}
                  height={windowSize.innerWidth > 639 ? 40 : 30}
                  className="rounded-full"
                  alt={sessionData?.user?.name ?? ""}
                />
                <LogoutIcon
                  className={cn(
                    "cursor-pointer text-snow hover:text-indigo-600",
                    { "text-4xl font-light": windowSize.innerWidth > 639 }
                  )}
                  onClick={() => void signOutWithRedirect()}
                />
              </div>
            </div>
          ) : (
            <div className="w-full">
              <span
                className="cursor-pointer text-snow hover:text-indigo-600 lg:text-lg"
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
  );
};

export default MainLayout;
