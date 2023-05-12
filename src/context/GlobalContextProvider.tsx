import React, {
  createContext,
  type SetStateAction,
  useState,
  useEffect,
} from "react";
import { RouterOutputs } from "~/utils/api";
import {type Result} from '@zxing/library'

type StorageArea = RouterOutputs["storageAreas"]["getStorageAreas"][0];

type GlobalContextType = {
  userRole: string;
  setUserRole: React.Dispatch<SetStateAction<string>>;
  householdId: string;
  setHouseholdId: React.Dispatch<SetStateAction<string>>;
  householdName: string;
  setHouseholdName: React.Dispatch<SetStateAction<string>>;
  bottomNavValue: number;
  setBottomNavValue: React.Dispatch<SetStateAction<number>>;
  storageAreas: StorageArea[];
  setStorageAreas: React.Dispatch<SetStateAction<StorageArea[]>>;
  showingBarcodeScanner: boolean;
  setShowingBarcodeScanner: React.Dispatch<SetStateAction<boolean>>;
  barcode: Result | null;
  setBarcode: React.Dispatch<SetStateAction<Result | null>>
};

export const GlobalContext = createContext<GlobalContextType>(
  null as unknown as GlobalContextType
);

const GlobalContextProvider = ({ children }: React.PropsWithChildren) => {
  const [userRole, setUserRole] = useState("");
  const [householdId, setHouseholdId] = useState<string>("");
  const [householdName, setHouseholdName] = useState<string>("");
  const [bottomNavValue, setBottomNavValue] = useState(0);
  const [storageAreas, setStorageAreas] = useState<StorageArea[]>([]);
   const [showingBarcodeScanner, setShowingBarcodeScanner] = useState(false);
   const [barcode, setBarcode] = useState<Result | null>(null);

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
        storageAreas,
        setStorageAreas,
        showingBarcodeScanner,
        setShowingBarcodeScanner,
        barcode,
        setBarcode
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
