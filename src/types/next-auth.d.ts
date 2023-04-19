import type { UserRole } from "@prisma/client";
import type { DefaultUser } from "next-auth";
declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
      role: UserRole;
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    };
  }

  interface User extends DefaultUser {
    id: string;
    role: UserRole;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  }
}
