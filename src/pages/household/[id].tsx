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
import Footer from "~/components/layouts/Footer";
import { cn } from "~/utils/cn";

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
    <div className="flex flex-col">
      <div className="flex " id="main">
        <div className=" flex-1 bg-snow">
          {navValue === 0 && domLoaded && <FoodItemsPage />}
          {navValue === 1 && <ShoppingListPage />}
        </div>
        <div className="overflow-y-auto bg-darkgray">
          <MembersSideBar />
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  ) : (
    <div className=" w-full pb-[56px]">
      {navValue === 0 && <FoodItemsPage />}
      {navValue === 1 && <ShoppingListPage />}
      {navValue === 2 && <HouseholdMembersPage />}

      <BottomNavigation
        sx={{
          position: "fixed",
          bottom: 0,
          width: 0.98,
          backgroundColor: "black",
        }}
        showLabels
        value={navValue}
        onChange={(event, newValue: number) => {
          setNavValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Items"
          sx={{
            "& .Mui-selected": {
              color: "#fb8905",
            },
            color: "#cbd5e1",
          }}
          icon={
            <KitchenIcon
              className={cn({
                "text-slate-300": navValue !== 0,
                "text-mango": navValue === 0,
              })}
            />
          }
        />
        <BottomNavigationAction
          label="Shopping List"
          sx={{
            "& .Mui-selected": {
              color: "#fb8905",
            },
            color: "#cbd5e1",
          }}
          icon={
            <ShoppingCartIcon
              className={cn({
                "text-slate-300": navValue !== 1,
                "text-mango": navValue === 1,
              })}
            />
          }
        />
        <BottomNavigationAction
          sx={{
            "& .Mui-selected": {
              color: "#fb8905",
            },
            color: "#cbd5e1",
          }}
          label="Members"
          icon={
            <GroupIcon
              className={cn({
                "text-slate-300": navValue !== 2,
                "text-mango": navValue === 2,
              })}
            />
          }
        />
      </BottomNavigation>
    </div>
  );
};

export default HouseholdPage;
