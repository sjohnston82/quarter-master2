
import React, { createContext, type SetStateAction, useState } from "react";

type GlobalContextType = {
  userRole: string;
  setUserRole: React.Dispatch<SetStateAction<string>>;
};

export const GlobalContext = createContext<GlobalContextType>(
  null as unknown as GlobalContextType
);

const GlobalContextProvider = ({ children }: React.PropsWithChildren) => {
  const [userRole, setUserRole] = useState("");

  return (
    <GlobalContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
