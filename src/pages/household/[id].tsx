import { useEffect, useContext } from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GlobalContext } from "~/context/GlobalContextProvider";

import KitchenIcon from "@mui/icons-material/Kitchen";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupIcon from "@mui/icons-material/Group";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HouseholdMembersPage from "~/components/bottomNavScreens/HouseholdMembersPage";
import FoodItemsPage from "~/components/bottomNavScreens/FoodItemsPage";
import ShoppingListPage from "~/components/bottomNavScreens/ShoppingListPage";

const HouseholdPage = () => {
  const router = useRouter();
  const {
    householdId,
    setHouseholdId,
    setHouseholdName,
    bottomNavValue,
    setBottomNavValue,
    storageAreas,
    setStorageAreas,
  } = useContext(GlobalContext);
  const { data: sessionData, status } = useSession();
  const getHouseholdId = api.household.getHouseholdId.useQuery();

  const getHouseholdInfo = api.household.getHouseholdInfo.useQuery({
    householdId,
  });

  const getStorageAreas = api.storageAreas.getStorageAreas.useQuery({
    householdId,
  });

  

  useEffect(() => {
    if (status === "unauthenticated" && sessionData == undefined)
      void router.push("/");

    if (householdId === "") {
      getHouseholdId.data &&
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        setHouseholdId(getHouseholdId.data.householdId!);
    }

    // adds to storageAreas state only if item is not already in it
    if (getStorageAreas.data) {
      getStorageAreas.data?.forEach((storageArea) => {
        if (
          !(
            storageAreas.filter((area) => area.id === storageArea.id).length > 0
          )
        ) {
          setStorageAreas((prev) => [...prev, storageArea]);
        }
      });
    }

    getHouseholdInfo.data &&
      getHouseholdInfo.data !== null &&
      setHouseholdName(getHouseholdInfo.data.name);
  }, [
    sessionData,
    status,
    router,
    setHouseholdId,
    getHouseholdInfo.data,
    setHouseholdName,
    householdId,
    getHouseholdId.data,
    getStorageAreas.data,
    setStorageAreas,
    storageAreas,
  ]);


  return (
    <div className="h-full w-full pb-16 ">
      {bottomNavValue === 0 && <FoodItemsPage />}
      {bottomNavValue === 1 && <ShoppingListPage />}
      {bottomNavValue === 2 && <HouseholdMembersPage />}

      <BottomNavigation
        sx={{ position: "fixed", bottom: 0, width: 1.0 }}
        // className="fixed bottom-0 w-full"
        showLabels
        value={bottomNavValue}
        onChange={(event, newValue: number) => {
          setBottomNavValue(newValue);
        }}
      >
        <BottomNavigationAction label="Items" icon={<KitchenIcon />} />
        <BottomNavigationAction
          label="ShoppingList"
          icon={<ShoppingCartIcon />}
        />
        <BottomNavigationAction label="Members" icon={<GroupIcon />} />
      </BottomNavigation>
    </div>
  );
};

export default HouseholdPage;
