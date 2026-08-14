import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe Auth.js config used by proxy.ts.
 * No Mongoose / bcrypt here — those are Node-only and would break the Edge runtime.
 * The Credentials authorize() lives in lib/auth.ts.
 */
const authConfig = {
  providers: [],
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export default authConfig;
