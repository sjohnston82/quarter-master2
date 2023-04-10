import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const HouseholdPage = () => {
  const router = useRouter();
   const getHouseholdId = api.household.getHouseholdId.useQuery();
   const [householdId, setHouseholdId] = useState<string>("");
  useEffect(() => {
    getHouseholdId.data &&
      getHouseholdId.data !== null &&
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setHouseholdId(getHouseholdId.data.householdId!);
  }, [getHouseholdId.data]);

  const getHouseholdInfo = api.household.getHouseholdInfo.useQuery({
    householdId
  });
  return <div>{getHouseholdInfo.data && getHouseholdInfo.data?.name}</div>;
};

// interface IParams extends ParsedUrlQuery {
//   householdId: string;
// }

// import { generateSSGHelper } from "~/server/helpers/ssgHelper";
// import type { NextPage, GetStaticProps } from "next";
// import { ParsedUrlQuery } from "querystring";

// export const getStaticProps: GetStaticProps = async (context) => {
//   const ssg = generateSSGHelper();

//   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//   const householdId = context.params!;
//   console.log("help!", householdId);

//   if (typeof householdId !== "string") throw new Error("No householdId.");

//   await ssg.household.getHouseholdInfo.prefetch({ householdId });

//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       householdId: householdId,
//     },
//   };
// };

// export const getStaticPaths = () => {
//   return { paths: [], fallback: "blocking" };
// };

export default HouseholdPage;
