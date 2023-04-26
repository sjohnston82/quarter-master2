import Image from "next/image";
import React, { useState, useContext } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { api } from "~/utils/api";
import UserInfoModal from "./UserInfoModal";

const ShowUsers = () => {
  const { householdId } = useContext(GlobalContext);
  const getHouseholdMembers = api.household.getHouseholdMembers.useQuery({
    householdId,
  });
  const [showingUserInfoModal, setShowingUserInfoModal] = useState("");

  const handleShowModal = (id: string) => {
    setShowingUserInfoModal(id);
  };

  return (
    <div className="flex flex-col justify-center">
      {getHouseholdMembers.data &&
        getHouseholdMembers.data[0]?.members.map((member) => (
          <div key={member.id} className="my-2 flex items-center gap-3">
            <Image
              className="rounded-full"
              src={member.image ?? ""}
              width={40}
              height={40}
              alt={member.name ?? ""}
            />
            <div className="flex flex-col">
              <h3
                className="text-lg"
                onClick={() => setShowingUserInfoModal(member.id)}
              >
                {member.name}
              </h3>
              <p className="italic">
                {member.role === "USER" ? "Member" : "Founder"}
              </p>
            </div>
          </div>
        ))}
      {getHouseholdMembers.data && (
        <UserInfoModal
          showingUserInfoModal={showingUserInfoModal}
          setShowingUserInfoModal={setShowingUserInfoModal}
        />
      )}
    </div>
  );
};

export default ShowUsers;
