import React, { type SetStateAction, useContext, useState } from "react";

import Modal from "../ui/Modal";
import { api, type RouterOutputs } from "~/utils/api";
import { type User } from "@prisma/client";
import { GlobalContext } from "~/context/GlobalContextProvider";
import Image from "next/image";
import dayjs from "dayjs";

type UserInfoModalProps = {
  showingUserInfoModal: string;
  setShowingUserInfoModal: React.Dispatch<SetStateAction<string>>;
};

const UserInfoModal = ({
  showingUserInfoModal,
  setShowingUserInfoModal,
}: UserInfoModalProps) => {
  const { householdId } = useContext(GlobalContext);

  const getMembersList = api.household.getHouseholdMembers.useQuery({
    householdId,
  });
  const membersList = getMembersList.data && getMembersList.data[0]?.members;
  const currUser = membersList?.find(
    (member) => member.id === showingUserInfoModal
  );

  return (
    <div>
      <Modal
        isOpen={showingUserInfoModal !== ""}
        onClose={() => setShowingUserInfoModal("")}
      >
        <div className="">
          <div className="relative h-12 rounded-t-3xl bg-slate-500">
            <Image
              src={currUser?.image ?? ""}
              width={80}
              height={80}
              alt={currUser?.name ?? ""}
              className="absolute left-3 top-2 z-10 rounded-full"
            />
          </div>
          <div className=" relative h-12 rounded-b-3xl bg-slate-200">
            <div className="absolute right-4 top-2">
              <h1 className="text-xl">{currUser?.name}</h1>
            </div>
          </div>
          <div className="mt-5">
            <div className="mx-auto flex w-2/3 justify-between ">
              <p className=" font-semibold">Role:</p>
              <p className="">
                {" "}
                {currUser?.role === "USER" ? "Member" : "Admin"}
              </p>
            </div>
            <div className="mx-auto flex w-2/3 justify-between ">
              <p className=" font-semibold">Joined:</p>
              <p className="">
                {dayjs(currUser?.joinedAt).format("MMMM D, YYYY")}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserInfoModal;
