import { useEffect, useState, useContext } from "react";
import { api } from "~/utils/api";
import Modal from "~/components/ui/Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ShowUsers from "~/components/householdMembers/ShowUsers";
import StorageAreas from "~/components/storage-areas/StorageAreas";
import { GlobalContext } from "~/context/GlobalContextProvider";
import InviteMembers from "~/components/householdMembers/InviteMembers";
import FoodItems from "~/components/items/FoodItems";

import KitchenIcon from "@mui/icons-material/Kitchen";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupIcon from "@mui/icons-material/Group";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HouseholdMembersPage from "~/components/bottomNavScreens/HouseholdMembersPage";
import FoodItemsPage from "~/components/bottomNavScreens/FoodItemsPage";
import ShoppingListPage from "~/components/bottomNavScreens/ShoppingListPage";

// enum BottomNavActions {
//   "kitchen",
//   "members",
//   "shopping-list"
// }

const HouseholdPage = () => {
  const router = useRouter();
  const {
    householdId,
    setHouseholdId,
    householdName,
    setHouseholdName,
    bottomNavValue,
    setBottomNavValue,
  } = useContext(GlobalContext);
  const { data: sessionData, status } = useSession();
  const getHouseholdId = api.household.getHouseholdId.useQuery();

  const getHouseholdInfo = api.household.getHouseholdInfo.useQuery({
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
  ]);

  // useEffect(() => {
  //   setBottomNavValue(
  //     JSON.parse(+window.localStorage.getItem("bottomNavValue"))
  //   );
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem("bottomNavValue", String(bottomNavValue));
  // }, [bottomNavValue]);

  return (
    <div className="h-full w-full pb-16 ">
      {/* <h1 className="mt-2 text-center text-xl">
        {householdName} Household
      </h1> */}
      {bottomNavValue === 0 && <FoodItemsPage />}
      {bottomNavValue === 1 && <ShoppingListPage />}
      {bottomNavValue === 2 && <HouseholdMembersPage />}
      {/* <div className="grid min-h-screen grid-cols-12 gap-4">
        <div className="col-span-2">
          <StorageAreas />
        </div>

        <div className="col-span-8 bg-blue-200">
          <FoodItems />
        </div>

        <div className="col-span-2 grid ">
          <InviteMembers household={getHouseholdInfo.data?.name} />
          <ShowUsers householdId={householdId} />
        </div> */}
      {/* </div> */}
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
