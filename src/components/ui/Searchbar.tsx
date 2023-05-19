import { TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import useDebounce from "~/hooks/useDebounce";

const Searchbar = () => {
  const { searchTerm, setSearchTerm } = useContext(GlobalContext);

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setSearchTerm((e.target as HTMLInputElement).value);
  };

  return (
    <form className="mt-2">
      <label
        htmlFor="default-search"
        className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Search
      </label>
      <div className="relative flex justify-center">
        <div className="pointer-events-none absolute inset-y-0 left-10 flex items-center pl-3">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          value={searchTerm}
          id="default-search"
          onInput={(e) => handleChange(e)}
          className="block w-4/5 rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Search for items..."
          required
        />
        {/* <button type="submit" className="text-white absolute right-12 bottom-2.5 bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
      </div>
    </form>
  );
};

export default Searchbar;
