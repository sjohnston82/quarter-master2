import React from "react";
import { cn } from "~/utils/cn";

interface LandingSelectionSelectBarProps {
  setShowingHowItWorks: React.Dispatch<React.SetStateAction<boolean>>;
  setShowingFeatures: React.Dispatch<React.SetStateAction<boolean>>;
  showingHowItWorks: boolean;
  showingFeatures: boolean;
}

const LandingSectionSelectBar = ({
  setShowingHowItWorks,
  setShowingFeatures,
  showingHowItWorks,
  showingFeatures,
}: LandingSelectionSelectBarProps) => {
  const handleShowingHowItWorks = () => {
    setShowingFeatures(false);
    setShowingHowItWorks(true);
  };

  const handleShowingFeatures = () => {
    setShowingHowItWorks(false);
    setShowingFeatures(true);
  };

  return (
    <div className="mx-2 flex justify-center gap-4 pb-8 sm:mx-auto sm:w-2/3 lg:w-1/2">
      <button
        onClick={handleShowingHowItWorks}
        className={cn(
          "mx-auto flex w-full items-center justify-center rounded-lg bg-blue-600 px-2 py-1 text-xl text-snow shadow shadow-black transition hover:bg-mango sm:w-1/2",
          {
            "bg-mango": showingHowItWorks,
          }
        )}
      >
        How it Works
      </button>

      <button
        onClick={handleShowingFeatures}
        className={cn(
          "mx-auto flex w-full items-center justify-center rounded-lg bg-blue-600 px-2 py-1 text-xl text-snow shadow shadow-black transition hover:bg-mango sm:w-1/2",
          {
            "bg-mango": showingFeatures,
          }
        )}
      >
        Features
      </button>
    </div>
  );
};

export default LandingSectionSelectBar;
