import React, { useState } from "react";
import LandingSectionSelectBar from "./LandingSectionSelectBar";
import { AnimatePresence, motion } from "framer-motion";
import HowItWorks from "./HowItWorks";
import Features from "./Features";

const LandingTransitionContainer = () => {
  const [showingHowItWorks, setShowingHowItWorks] = useState(false);
  const [showingFeatures, setShowingFeatures] = useState(false);

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
    <div>
      <LandingSectionSelectBar
        setShowingHowItWorks={setShowingHowItWorks}
        setShowingFeatures={setShowingFeatures}
        showingHowItWorks={showingHowItWorks}
        showingFeatures={showingFeatures}
      />
      <AnimatePresence mode="wait">
        {showingHowItWorks && (
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
            <HowItWorks />
          </motion.div>
        )}
        {showingFeatures && (
          
            <Features />
        
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingTransitionContainer;
