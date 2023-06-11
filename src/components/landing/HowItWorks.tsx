import React from "react";
import { signIn } from "next-auth/react";

const HowItWorks = () => {
  return (
    <div className="relative ">
      <div className=" text-snow sm:w-3/4 mx-auto pb-12" id="howitworks">
        <h2 className="mx-auto w-4/5 pt-16 text-center text-2xl mb-6 text-woodsmoke">
          How does Quartermaster work?
        </h2>
        {/* <div className="prose-lg mx-4 mt-12 space-y-2">
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
        </div> */}
        <div className="flex flex-col gap-4 ">
          <div className="ml-4 flex w-4/5 items-center gap-2 rounded-lg bg-mango p-2 shadow shadow-black">
            <span className="p-2 text-6xl text-snow">1</span>
            <p className="">
              To get started, create a new account using your Gmail or Facebook
              account.
            </p>
          </div>
          <div className="ml-auto mr-4 flex w-4/5 items-center justify-end gap-2 rounded-lg bg-blue-600 p-2 shadow shadow-black">
            <p className="">
              Invite all your family members so you can all keep track of what is
              in your pantry together!
            </p>
            <span className="p-2 text-6xl text-snow">2</span>
          </div>
          <div className="ml-4 flex w-4/5 items-center gap-2 rounded-lg bg-mango p-2 shadow shadow-black">
            <span className="p-2 text-6xl text-snow">3</span>
            <p className="">
              Create storage areas for all the places you store food items in
              your house, (fridge, upstairs pantry, etc.), and use your
              phone&apos;s camera to quickly add food items by scanning their
              bar codes.
            </p>
          </div>
          <div className="ml-auto mr-4 flex w-4/5 items-center justify-end gap-2 rounded-lg bg-blue-600 p-2 shadow shadow-black">
            <p className="">
              Add expiration dates to keep track of when things go bad so you
              can avoid food wastage.
            </p>
            <span className="p-2 text-6xl text-snow">4</span>
          </div>
          <div className="ml-4 flex w-4/5 items-center gap-2 rounded-lg bg-mango p-2 shadow shadow-black">
            <span className="p-2 text-6xl text-snow">5</span>
            <p className="">
              Add items to a shopping list so all your family members can stay
              up-to-date on what is needed while they&apos;re out.
            </p>
          </div>
        </div>
        <button
          onClick={() => void signIn()}
          className="mx-auto  mt-8 flex w-3/5 shadow items-center justify-center rounded-lg bg-blue-600 px-2 py-1 text-xl text-snow transition hover:bg-mango"
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
    </div>
  );
};

export default HowItWorks;
