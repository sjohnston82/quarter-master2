/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import FeatureListItem from "./FeatureListItem";
import { Divider } from "@mui/material";
import { GlobalContext } from "~/context/GlobalContextProvider";

const Features = () => {
  const { windowSize } = useContext(GlobalContext);
  const pageTransitionSideVariants = {
    enter: {
      x: -1000,
      opacity: 0,
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: {
      x: 1000,
      opacity: 0,
      scale: 0.01,
    },
  };
  return (
    <motion.div
      variants={pageTransitionSideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      }}
    >
      <div className="mb-20 bg-snow pt-10 " id="features">
        <h1 className="mb-12 text-center text-3xl font-semibold text-woodsmoke ">
          Features
        </h1>
        <ul className="prose-sm flex w-full flex-col items-start px-4 text-lg text-woodsmoke  xl:prose-lg xl:text-2xl">
          <FeatureListItem
            text="Keep informed"
            secondaryText=" - store all your family's food items in one convenient location"
          />

          <FeatureListItem
            text="Barcode scanning "
            secondaryText="- quickly add items to your household"
          />

          <FeatureListItem
            text="Track expiration dates "
            secondaryText="- so you always know when you need to use something or throw it out"
          />

          <FeatureListItem
            text="Shopping List"
            secondaryText=" - send items to a shopping list so your entire family knows
              what is needed when they go out"
          />
          <FeatureListItem
            text="Organize"
            secondaryText=" - easily sort through all your items based on where it's located, if it's about to expired, or by what type of food item it is"
          />
          <FeatureListItem
            text="Collaborate"
            secondaryText=" - work together as a family unit to cut costs and waste and raise family cohesion"
          />
        </ul>
        {windowSize.innerWidth < 1280 && (
          <button
            onClick={() => void signIn()}
            className="mx-auto mt-8 flex w-3/5 items-center justify-center rounded-lg bg-blue-600 px-2 py-1 text-xl text-snow shadow shadow-black transition hover:bg-mango lg:w-1/3"
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
        )}
      </div>
      
    </motion.div>
  );
};

export default Features;
