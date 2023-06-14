import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import AddItemMenu from "../items/AddItemMenu";
import Searchbar from "./Searchbar";

const ActionBarSmall = () => {
  const { searchTerm, setSearchTerm } = useContext(GlobalContext);

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setSearchTerm((e.target as HTMLInputElement).value);
  };
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <div className="mx-auto flex w-4/5 justify-center gap-4 ">
      <Searchbar />
      <AddItemMenu />
    </div>
  );
};

export default ActionBarSmall;