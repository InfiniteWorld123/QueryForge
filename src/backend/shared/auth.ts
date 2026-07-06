import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP } from "better-auth/plugins";
import { db } from "../db";
import * as schema from "../db/schema";
import { sendAuthCode } from "./mailer";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
	},
	plugins: [
		emailOTP({
			otpLength: 6,
			expiresIn: 5 * 60,
			allowedAttempts: 3,
			sendVerificationOnSignUp: false,
			overrideDefaultEmailVerification: true,
			async sendVerificationOTP({ email, otp, type }) {
				await sendAuthCode({ email, otp, type });
			},
		}),
	],
});
