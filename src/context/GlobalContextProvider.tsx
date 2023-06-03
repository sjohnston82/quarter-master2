import React, {
  createContext,
  type SetStateAction,
  useState
} from "react";
import { type RouterOutputs } from "~/utils/api";
import { type Result } from "@zxing/library";
import useDebounce from "~/hooks/useDebounce";

type StorageArea = RouterOutputs["storageAreas"]["getStorageAreas"][0];
export type UPCInfo = {
  brand_name: string;
  gtin14: string;
  name: string;
  size: string;
};

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
  setBarcode: React.Dispatch<SetStateAction<Result | null>>;
  showingAddItemModal: boolean;
  setShowingAddItemModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentItemByUPC: UPCInfo | null;
  setCurrentItemByUPC: React.Dispatch<React.SetStateAction<UPCInfo | null>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  fetchingProductInfo: boolean;
  setFetchingProductInfo: React.Dispatch<React.SetStateAction<boolean>>;
  showingCreateStorageAreaModal: boolean;
  setShowingCreateStorageAreaModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  debouncedValue: string;
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
  const [showingAddItemModal, setShowingAddItemModal] = useState(false);
  const [currentItemByUPC, setCurrentItemByUPC] = useState<UPCInfo | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [fetchingProductInfo, setFetchingProductInfo] = useState(false);
  const [showingCreateStorageAreaModal, setShowingCreateStorageAreaModal] =
    useState(false);

  const debouncedValue = useDebounce(searchTerm, 1000);

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
        setBarcode,
        showingAddItemModal,
        setShowingAddItemModal,
        currentItemByUPC,
        setCurrentItemByUPC,
        searchTerm,
        setSearchTerm,
        fetchingProductInfo,
        setFetchingProductInfo,
        debouncedValue,
        showingCreateStorageAreaModal,
        setShowingCreateStorageAreaModal
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
