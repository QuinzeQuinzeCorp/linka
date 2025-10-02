import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import { env } from "./env";

export const auth = betterAuth({
  database: new Database("database.sqlite"),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // TODO: Ajouter la verif de mail (nodemailer ?)
  },
  // NTM Discord, tu fais tout bug
  // socialProviders: {
  //   discord: {
  //     clientId: env.DISCORD_CLIENT_ID || "",
  //     clientSecret: env.DISCORD_CLIENT_SECRET || "",
  //   },
  // },
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  trustedOrigins: [env.BETTER_AUTH_URL],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
