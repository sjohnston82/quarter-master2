import React from "react";

interface LandingSelectionSelectBarProps {
  setShowingHowItWorks: React.Dispatch<React.SetStateAction<boolean>>;
  setShowingFeatures: React.Dispatch<React.SetStateAction<boolean>>;
}

const LandingSectionSelectBar = ({
  setShowingHowItWorks,
  setShowingFeatures,
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
    <div className="flex justify-center gap-4">
      <a href="#howitworks" className="">
        <button
          onClick={handleShowingHowItWorks}
          className="mx-auto flex w-full items-center justify-center rounded-lg bg-blue-600 px-2 py-1 text-xl text-snow transition hover:bg-mango"
        >
          How it Works
        </button>
      </a>
      <a href="#features" className="">
        <button
          onClick={handleShowingFeatures}
          className="mx-auto flex w-full items-center justify-center rounded-lg bg-blue-600 px-2 py-1 text-xl text-snow transition hover:bg-mango"
        >
          Features
        </button>
      </a>
    </div>
  );
};

export default LandingSectionSelectBar;
