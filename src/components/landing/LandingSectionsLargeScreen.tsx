import React from "react";
import HowItWorks from "./HowItWorks";
import Features from "./Features";
import { signIn } from "next-auth/react";

const LandingSectionsLargeScreen = () => {
  return (
    <div className="mt-20 flex flex-col">
      <div className="flex">
        <div className="xl:flex-1 ">
          <HowItWorks />
        </div>
        <div className="h-full border-r border-black"></div>
        <div className="xl:flex-1 ">
          <Features />
        </div>
      </div>
      <div className="mx-auto mb-16 xl:w-1/3">
        <button
          onClick={() => void signIn()}
          className="mx-auto mt-24 flex w-3/5 items-center justify-center rounded-lg bg-blue-600 px-2 py-1 text-xl text-snow shadow shadow-black transition hover:bg-mango lg:w-1/2 lg:w-1/3 xl:w-full 2xl:text-2xl"
        >
          Create Account{" "}
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
      <p className="text-center text-sm">© Stephen Johnston, 2023</p>
    </div>
  );
};

export default LandingSectionsLargeScreen;
