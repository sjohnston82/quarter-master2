import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { householdRouter } from "./routers/household";
import { inviteRouter } from "./routers/invite";
import { storageAreasRouter } from "./routers/storageAreas";
import { itemsRouter } from "./routers/items";
import { shoppingListRouter } from "./routers/shoppingList";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  household: householdRouter,
  invite: inviteRouter,
  storageAreas: storageAreasRouter,
  items: itemsRouter,
  shoppingList: shoppingListRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
