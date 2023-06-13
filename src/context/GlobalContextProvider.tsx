import React, {
  createContext,
  type SetStateAction,
  useState,
  useEffect,
} from "react";
import { type RouterOutputs } from "~/utils/api";
import { type Result } from "@zxing/library";
import useDebounce from "~/hooks/useDebounce";
import getWindowSize from "~/utils/getWindowSize";

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
  navValue: number;
  setNavValue: React.Dispatch<SetStateAction<number>>;
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
  showingCreateStorageAreaModal: boolean;
  setShowingCreateStorageAreaModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  debouncedValue: string;
  searchingForProduct: boolean;
  setSearchingForProduct: React.Dispatch<React.SetStateAction<boolean>>;
  windowSize: { innerWidth: number; innerHeight: number };
  setWindowSize: React.Dispatch<
    React.SetStateAction<{ innerWidth: number; innerHeight: number }>
  >;
  showingSideNav: boolean;
  setShowingSideNav: React.Dispatch<React.SetStateAction<boolean>>;
  selectedStorageArea: string | null;
  setSelectedStorageArea: React.Dispatch<React.SetStateAction<string | null>>;
  showingItemCards: boolean;
  setShowingItemCards: React.Dispatch<React.SetStateAction<boolean>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  showingSidebar: boolean;
  setShowingSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GlobalContext = createContext<GlobalContextType>(
  null as unknown as GlobalContextType
);

const GlobalContextProvider = ({ children }: React.PropsWithChildren) => {
  const [userRole, setUserRole] = useState("");
  const [householdId, setHouseholdId] = useState<string>("");
  const [householdName, setHouseholdName] = useState<string>("");
  const [navValue, setNavValue] = useState(0);
  const [storageAreas, setStorageAreas] = useState<StorageArea[]>([]);
  const [showingBarcodeScanner, setShowingBarcodeScanner] = useState(false);
  const [barcode, setBarcode] = useState<Result | null>(null);
  const [showingAddItemModal, setShowingAddItemModal] = useState(false);
  const [currentItemByUPC, setCurrentItemByUPC] = useState<UPCInfo | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showingCreateStorageAreaModal, setShowingCreateStorageAreaModal] =
    useState(false);
  const [searchingForProduct, setSearchingForProduct] = useState(false);
  const debouncedValue = useDebounce(searchTerm, 750);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [showingSideNav, setShowingSideNav] = useState(false);
  const [selectedStorageArea, setSelectedStorageArea] = useState<string | null>(
    null
  );
  const [showingItemCards, setShowingItemCards] = useState(false);
  const [limit, setLimit] = useState(10);
  const [showingSidebar, setShowingSidebar] = useState(false);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (windowSize.innerWidth > 1023) {
      setShowingSidebar(true);
    } else {
      setShowingSidebar(false);
    }
  }, [windowSize.innerWidth]);

  return (
    <GlobalContext.Provider
      value={{
        userRole,
        setUserRole,
        householdId,
        setHouseholdId,
        householdName,
        setHouseholdName,
        navValue,
        setNavValue,
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
        debouncedValue,
        showingCreateStorageAreaModal,
        setShowingCreateStorageAreaModal,
        searchingForProduct,
        setSearchingForProduct,
        windowSize,
        setWindowSize,
        showingSideNav,
        setShowingSideNav,
        selectedStorageArea,
        setSelectedStorageArea,
        showingItemCards,
        setShowingItemCards,
        limit,
        setLimit,
        showingSidebar,
        setShowingSidebar,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
