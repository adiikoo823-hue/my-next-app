import { randomBytes } from "node:crypto";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const secret =
  process.env.NEXTAUTH_SECRET ??
  process.env.AUTH_SECRET ??
  (process.env.NODE_ENV === "development"
    ? randomBytes(32).toString("hex")
    : undefined);

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  secret,
});
