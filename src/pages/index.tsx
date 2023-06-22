import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { GlobalContext } from "~/context/GlobalContextProvider";
import LandingTransitionContainer from "~/components/landing/LandingTransitionContainer";
import { motion } from "framer-motion";
import LandingSectionsLargeScreen from "~/components/landing/LandingSectionsLargeScreen";
import Footer from "~/components/layouts/Footer";
import LoadingSpinner from "~/components/ui/LoadingSpinner";

const Home: NextPage = () => {
  const router = useRouter();
  const { householdId, setHouseholdId, windowSize } = useContext(GlobalContext);
  const { data: sessionData, status } = useSession();
  const [domLoaded, setDomLoaded] = useState(false);
  const { token } = Array.isArray(router.query)
    ? { token: router.query[0] as string | undefined }
    : { token: router.query?.token as string | undefined };

  const verifyInvite = api.invite.verifyByLink.useMutation({
    retry: 3,
    onSuccess: async () => {
      await router.push("/");
      // await signIn();
    },
    onError: (error) => console.log(error),
  });

  // token && verifyInvite.mutate({ token });

  const getHouseholdId = api.household.getHouseholdId.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  useEffect(() => {
    setDomLoaded(true);
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
      void router.push("/firstLogin");
    }

    // if (status !== "loading" && sessionData == undefined) void router.push("/");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getHouseholdId.data, householdId, sessionData, status]);

  return (
    <>
      {domLoaded &&
        (sessionData && getHouseholdId.data ? (
          <div className="flex h-[calc(100vh-120px)] w-full flex-col items-center justify-center gap-4 rounded-b-xl bg-slate-400 lg:h-[calc(100vh-136px)]">
            <h1 className="font-semibold">Retrieving household info...</h1>
            <LoadingSpinner size={80} />
          </div>
        ) : (
          <main className="flex min-h-screen flex-col scroll-smooth rounded-b-xl bg-snow text-woodsmoke">
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className=""
              >
                <h1 className="mx-auto mb-8 mt-8 text-center text-5xl font-extrabold leading-none tracking-tight text-woodsmoke lg:w-2/3 lg:text-6xl 2xl:w-1/2 3xl:w-1/3">
                  Take control of your family&apos;s pantry with ease
                </h1>
              </motion.div>
              <p className="mx-auto w-4/5 px-4 text-xl text-schooner sm:w-3/4 lg:w-1/2 lg:text-2xl 2xl:w-1/3">
                Invite your whole family to effortlessly{" "}
                <span className="font-semibold text-mango">track</span>,{" "}
                <span className="font-semibold text-mango">organize</span>, and{" "}
                <span className="font-semibold text-mango">manage</span> all
                your pantry items, ensuring you never run out of essentials
                again.
              </p>
            </div>
            <div className="mx-auto flex  w-3/4 flex-col justify-center lg:w-1/2   ">
              <button
                onClick={() => void signIn()}
                className="mx-auto mt-8 flex w-3/5 items-center justify-center rounded-lg bg-blue-600 px-2  py-1 text-xl text-snow shadow shadow-black transition hover:bg-mango sm:w-1/2 2xl:text-2xl"
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
            {windowSize.innerWidth < 1280 ? (
              <>
                <div className="my-12">
                  <p className="px-8 text-center text-lg text-woodsmoke">
                    Or learn more by clicking on one of the buttons below!
                  </p>
                </div>

                <LandingTransitionContainer />
              </>
            ) : (
              <LandingSectionsLargeScreen />
            )}
          </main>
        ))}
      <Footer />
    </>
  );
};

export default Home;
