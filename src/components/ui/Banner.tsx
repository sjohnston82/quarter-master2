import React, { useContext } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { cn } from "~/utils/cn";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ReorderIcon from "@mui/icons-material/Reorder";

interface BannerProps {
  children: React.ReactNode;
  fontSize: string;
}
const Banner = ({ children, fontSize }: BannerProps) => {
  const { navValue, windowSize, setShowingItemCards, showingItemCards } =
    useContext(GlobalContext);
  return (
    <div className="relative flex h-12 items-center justify-center bg-woodsmoke">
      <h1 className={`${fontSize} w-full text-center text-slate-200`}>
        {children}
      </h1>

      {windowSize.innerWidth > 639 && navValue === 0 && (
        <div className="absolute right-2 flex gap-2">
          <button
            onClick={() => setShowingItemCards(false)}
            className="rounded-lg bg-slate-700 p-1"
          >
            <ReorderIcon
              className={cn("text-snow", {
                "text-mango": !showingItemCards,
              })}
            />
          </button>
          <button
            onClick={() => setShowingItemCards(true)}
            className="rounded-lg bg-slate-700 p-1"
          >
            <ViewModuleIcon
              className={cn("text-snow", {
                "text-mango": showingItemCards,
              })}
            />
          </button>
        </div>
      )}
    </div>
  );
};

Banner.defaultProps = {
  fontSize: "text-xl",
};

export default Banner;
