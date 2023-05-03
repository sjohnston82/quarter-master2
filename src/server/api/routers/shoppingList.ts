import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const shoppingListRouter = createTRPCRouter({
  addToShoppingList: protectedProcedure.input(z.object({ householdId: z.string(), name: z.string(), location: z.string()})).mutation(async ({ ctx, input}) => {
    
  })
});
