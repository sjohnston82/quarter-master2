import { useEffect, useContext, useState } from "react";
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
import MembersSideBar from "~/components/layouts/MembersSideBar";

const HouseholdPage = () => {
  const router = useRouter();
  const {
    householdId,
    setHouseholdId,
    setHouseholdName,
    navValue,
    setNavValue,
    storageAreas,
    setStorageAreas,
    windowSize,
    showingSidebar,
  } = useContext(GlobalContext);
  const { data: sessionData, status } = useSession();
  const getHouseholdId = api.household.getHouseholdId.useQuery();
  const [domLoaded, setDomLoaded] = useState(false);
  const getHouseholdInfo = api.household.getHouseholdInfo.useQuery({
    householdId,
  });

  const getStorageAreas = api.storageAreas.getStorageAreas.useQuery(
    {
      householdId,
    },
    { enabled: sessionData !== undefined }
  );

  useEffect(() => {
    setDomLoaded(true);
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

    if (navValue === 2 && windowSize.innerWidth > 1023) {
      setNavValue(0);
    }
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
    navValue,
    windowSize.innerWidth,
    setNavValue,
  ]);

  return showingSidebar ? (
    <div className="flex " id="main">
      <div className=" flex-1 bg-snow">
        {navValue === 0 && domLoaded && <FoodItemsPage />}
        {navValue === 1 && <ShoppingListPage />}
      </div>
      <div className="overflow-y-auto">
        <MembersSideBar />
      </div>
    </div>
  ) : (
    <div className=" w-full ">
      {navValue === 0 && <FoodItemsPage />}
      {navValue === 1 && <ShoppingListPage />}
      {navValue === 2 && <HouseholdMembersPage />}

      <BottomNavigation
        sx={{ position: "fixed", bottom: 0, width: 1.0 }}
        showLabels
        value={navValue}
        onChange={(event, newValue: number) => {
          setNavValue(newValue);
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
