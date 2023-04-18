import Image from "next/image";
import React from "react";
import { api } from "~/utils/api";

interface ShowUserProps {
  householdId: string;
}
const ShowUsers = ({ householdId }: ShowUserProps) => {
  const getHouseholdMembers = api.household.getHouseholdMembers.useQuery({
    householdId,
  });

  console.log(getHouseholdMembers.data);
  return (
    <div>
      {getHouseholdMembers.data &&
        getHouseholdMembers.data[0]?.members.map((member) => (
          <>
            <div key={member.id} className="flex items-center gap-3">
              <Image
                className="rounded-full"
                src={member.image ?? ""}
                width={40}
                height={40}
                alt={member.name ?? ""}
              />
              <h3 className="">{member.name}</h3>
            </div>
          </>
        ))}
    </div>
  );
};

export default ShowUsers;
