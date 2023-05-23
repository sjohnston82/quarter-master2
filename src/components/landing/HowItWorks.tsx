import React from "react";
import { signIn } from "next-auth/react";

const HowItWorks = () => {
  return (
    <div className="relative">
      <div className="mb-20 bg-snow text-woodsmoke" id="howitworks">
        <h2 className="mx-auto w-4/5 pt-16 text-center text-2xl text-woodsmoke">
          How does Quartermaster work?
        </h2>
        <div className="prose-lg mx-4 mt-12 space-y-2">
          <p className="">
            To get started, create a new account using your Gmail or Facebook
            account.
          </p>
          <p className="">
            Once you have an account you can make a household, a group where you
            can invite all of your family members so that you all can contribute
            and collaborate, ensuring you always have what you need.
          </p>
          <p className="">
            Plus, easily share shopping lists among family members to streamline
            your grocery trips.
          </p>
          <p className="">
            With Quartermaster, simplify your pantry management and strengthen
            family coordination.
          </p>
        </div>
        <button
          onClick={() => void signIn()}
          className="mx-auto mt-8 flex w-3/5 items-center justify-center rounded-lg bg-blue-600 px-2 py-1 text-xl text-snow transition hover:bg-mango"
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
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HowItWorks;
