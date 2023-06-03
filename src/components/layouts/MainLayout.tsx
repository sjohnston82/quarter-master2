import { useContext } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import LogoutIcon from "@mui/icons-material/Logout";
import { GlobalContext } from "~/context/GlobalContextProvider";

const MainLayout = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { householdName, setBottomNavValue } = useContext(GlobalContext);

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
    
  );
};

export default MainLayout;
