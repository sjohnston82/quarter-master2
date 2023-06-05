import React, { type SetStateAction, useContext, useState } from "react";
import Modal from "../ui/Modal";
import { api } from "~/utils/api";
import { GlobalContext } from "~/context/GlobalContextProvider";
import Image from "next/image";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import RemoveMemberConfirmationModal from "./RemoveMemberConfirmationModal";

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
  const { data: sessionData } = useSession();
  const membersList = getMembersList.data && getMembersList.data[0]?.members;
  const currUser = membersList?.find(
    (member) => member.id === showingUserInfoModal
  );
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

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

            {sessionData?.user.role === "ADMIN" && (
              <div className="">
                <div className="mt-3 flex gap-4 justify-center">
                  <button
                    className="rounded-3xl px-2 py-1 border border-slate-800 text-sm font-semibold disabled:border-slate-300 disabled:text-slate-400"
                    disabled={
                      currUser?.role === "ADMIN" ||
                      currUser?.id === sessionData.user.id
                    }
                  >
                    Promote to Admin
                  </button>
                  <button
                    className="rounded-3xl px-2 border border-slate-800 text-sm font-semibold disabled:border-slate-300 disabled:text-slate-400"
                    onClick={() => setShowConfirmationModal(true)}
                    disabled={currUser?.role === "ADMIN"}
                  >
                    Remove from Household
                  </button>
                </div>
                {currUser && (
                  <RemoveMemberConfirmationModal
                    setShowingUserInfoModal={setShowingUserInfoModal}
                    showConfirmationModal={showConfirmationModal}
                    setShowConfirmationModal={setShowConfirmationModal}
                    id={currUser.id}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserInfoModal;
