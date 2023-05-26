import React from "react";

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
  showingFeatures
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
    <div className="mx-2 flex justify-center gap-4">
      <button
        onClick={handleShowingHowItWorks}
        className={`mx-auto flex w-full items-center justify-center rounded-lg ${
          showingHowItWorks ? "bg-mango" : "bg-blue-600"
        } px-2 py-1 text-xl text-snow transition hover:bg-mango`}
      >
        How it Works
      </button>

      <button
        onClick={handleShowingFeatures}
        className={`mx-auto flex w-full items-center justify-center rounded-lg ${
          showingFeatures ? "bg-mango" : "bg-blue-600"
        } px-2 py-1 text-xl text-snow transition hover:bg-mango`}
      >
        Features
      </button>
    </div>
  );
};

export default LandingSectionSelectBar;
