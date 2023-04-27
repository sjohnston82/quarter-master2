import React, { createContext, type SetStateAction, useState } from "react";

type GlobalContextType = {
  userRole: string;
  setUserRole: React.Dispatch<SetStateAction<string>>;
  householdId: string | null;
  setHouseholdId: React.Dispatch<SetStateAction<string | null>>;
  householdName: string;
  setHouseholdName: React.Dispatch<SetStateAction<string>>;
  bottomNavValue: number;
  setBottomNavValue: React.Dispatch<SetStateAction<number>>;
};

export const GlobalContext = createContext<GlobalContextType>(
  null as unknown as GlobalContextType
);

const GlobalContextProvider = ({ children }: React.PropsWithChildren) => {
  const [userRole, setUserRole] = useState("");
  const [householdId, setHouseholdId] = useState<string | null>("");
  const [householdName, setHouseholdName] = useState<string>("");
  const [bottomNavValue, setBottomNavValue] = useState(0);

  return (
    <GlobalContext.Provider
      value={{
        userRole,
        setUserRole,
        householdId,
        setHouseholdId,
        householdName,
        setHouseholdName,
        bottomNavValue,
        setBottomNavValue,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
