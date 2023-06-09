import React, { useContext } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";

const Searchbar = () => {
  const { searchTerm, setSearchTerm } = useContext(GlobalContext);

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setSearchTerm((e.target as HTMLInputElement).value);
  };

  return (
    <form
      className="mx-auto mt-2 w-full sm:mt-0  "
      
    >
      <label
        htmlFor="default-search"
        className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Search
      </label>
      <div className="relative flex justify-center">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          value={searchTerm}
          id="default-search"
          onInput={(e) => handleChange(e)}
          className=" flex w-full rounded-lg border sm:ml-2 border-gray-300 bg-slate-50 p-4 pl-10 text-sm text-woodsmoke shadow focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:h-2"
          placeholder="Search for items..."
          required
        />
      </div>
    </form>
  );
};

export default Searchbar;
