import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import { GlobalContext } from "~/context/GlobalContextProvider";
import Button from "~/components/ui/Button";
import Features from "~/components/landing/Features";
import HowItWorks from "~/components/landing/HowItWorks";
import LandingTransitionContainer from "~/components/landing/LandingTransitionContainer";
import { Divider } from "@mui/material";

const Home: NextPage = () => {
  const router = useRouter();
  const { householdId, setHouseholdId } = useContext(GlobalContext);
  const { data: sessionData, status } = useSession();
  // const [householdId, setHouseholdId] = useState<string | null>(null);
  const getHouseholdId = api.household.getHouseholdId.useQuery();

  useEffect(() => {
    getHouseholdId.data &&
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setHouseholdId(getHouseholdId.data.householdId!);
    // if (!sessionData) return redirect("/");
    if (status !== "loading" && sessionData !== undefined && householdId) {
      void router.push(`/household/${householdId}`);
    }

    if (
      status !== "loading" &&
      sessionData !== undefined &&
      householdId === null
    ) {
      void router.push("/first-login");
    }

    if (status !== "loading" && sessionData == undefined) void router.push("/");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getHouseholdId.data, householdId, sessionData, status]);

  // const redirectToHousehold = async () => {
  //   householdId && sessionData && (await router.push(`/household/${householdId}`));
  // };

  return (
    <>
      <main className="flex min-h-screen flex-col scroll-smooth bg-snow ">
        <div className="w-full">
          <h1 className="mb-8 mt-8 text-center text-5xl font-extrabold leading-none tracking-tight text-woodsmoke">
            Take control of your family&apos;s pantry with ease
          </h1>
          <p className="px-4 text-lg text-schooner">
            Invite your whole family to effortlessly track, organize, and manage
            all your pantry items, ensuring you never run out of essentials
            again.
          </p>
        </div>
        <div className="flex flex-col justify-center gap-4  ">
          <button
            onClick={() => void signIn()}
            className="mx-auto mt-8 flex w-3/5 items-center justify-center rounded-lg bg-buttonblue px-2 py-1 text-xl text-snow transition hover:bg-mango"
          >
            Get Started{" "}
            <svg
              aria-hidden="true"
              className="-mr-1 ml-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          {/* <a href="#learnmore" className="">
            <button className="mx-auto flex w-3/5 items-center justify-center rounded-lg bg-buttonblue px-2 py-1 text-xl text-snow transition hover:bg-mango">
              Learn More
            </button>
          </a> */}
        </div>
        <div className="my-8">
          <p className="text-woodsmoke text-center text-lg px-8">
            Or learn more by clicking on of the buttons below!
          </p>
        </div>
        
        <LandingTransitionContainer />
        {/* <HowItWorks />
        <Features /> */}
      </main>
    </>
  );
};

export default Home;
