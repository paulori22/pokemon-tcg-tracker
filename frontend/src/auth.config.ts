import type { NextAuthConfig } from "next-auth";
import Keycloak from "next-auth/providers/keycloak";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [Keycloak],
} satisfies NextAuthConfig;
