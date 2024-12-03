import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { database } from "@/db/database";
import {
  accounts,
  authenticators,
  sessions,
  users,
  verificationTokens,
} from "./db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  adapter: DrizzleAdapter(database, {
    accountsTable: accounts,
    usersTable: users,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
    authenticatorsTable: authenticators,
  }),
});
