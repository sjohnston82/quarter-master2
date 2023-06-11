import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { GlobalContext } from "~/context/GlobalContextProvider";
import LandingTransitionContainer from "~/components/landing/LandingTransitionContainer";
import { motion } from "framer-motion";

const Home: NextPage = () => {
  const router = useRouter();
  const { householdId, setHouseholdId } = useContext(GlobalContext);
  const { data: sessionData, status } = useSession();

  const getHouseholdId = api.household.getHouseholdId.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  useEffect(() => {
    getHouseholdId.data &&
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setHouseholdId(getHouseholdId.data.householdId!);
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

  return (
    <>
      <main className="flex min-h-screen flex-col scroll-smooth bg-snow text-woodsmoke">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className=""
          >
            <h1 className="mb-8 mt-8 text-center text-5xl font-extrabold leading-none tracking-tight text-woodsmoke">
              Take control of your family&apos;s pantry with ease
            </h1>
          </motion.div>
          <p className="mx-auto px-4 text-xl text-schooner w-4/5 sm:w-3/4">
            Invite your whole family to effortlessly{" "}
            <span className="font-semibold text-mango">track</span>,{" "}
            <span className="font-semibold text-mango">organize</span>, and{" "}
            <span className="font-semibold text-mango">manage</span> all your
            pantry items, ensuring you never run out of essentials again.
          </p>
        </div>
        <div className="flex flex-col  justify-center  ">
          <button
            onClick={() => void signIn()}
            className="mx-auto mt-8 flex w-3/5 items-center justify-center  rounded-lg bg-blue-600 px-2 py-1 text-xl text-snow transition hover:bg-mango sm:w-1/2"
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
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="my-12">
          <p className="px-8 text-center text-lg text-woodsmoke">
            Or learn more by clicking on of the buttons below!
          </p>
        </div>

        <LandingTransitionContainer />
      </main>
    </>
  );
};

export default Home;
