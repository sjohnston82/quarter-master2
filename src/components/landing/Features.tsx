import React from "react";
import { motion } from "framer-motion";

const Features = () => {
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
      <div className="pt-44 h-screen bg-mango" >
        <h1 className="text-3xl text-woodsmoke">Features</h1>
      </div>
    </motion.div>
  );
};

export default Features;
