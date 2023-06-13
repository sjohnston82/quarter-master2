import React, { useContext, useEffect, useState } from "react";
import Button from "../ui/Button";
import { GlobalContext } from "~/context/GlobalContextProvider";
import KitchenIcon from "@mui/icons-material/Kitchen";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { cn } from "~/utils/cn";

const SideBarNavButtons = () => {
  const { navValue, setNavValue } = useContext(GlobalContext);
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return (
    
      <div className="flex flex-col gap-2 border-b-2 border-woodsmoke p-4">
        <button
          className={cn(
            "flex justify-center gap-2 rounded-lg border p-1 font-semibold shadow-lg",
            { "text-blue-600": navValue === 0 }
          )}
          onClick={() => setNavValue(0)}
        >
          <KitchenIcon />
          Items
        </button>
        <button
          className={cn(
            "flex justify-center gap-2 rounded-lg border p-1 font-semibold shadow-lg",
            { "text-blue-600": navValue === 1 }
          )}
          onClick={() => setNavValue(1)}
        >
          <ShoppingCartIcon />
          Shopping List
        </button>
      </div>
    
  );
};

export default SideBarNavButtons;
