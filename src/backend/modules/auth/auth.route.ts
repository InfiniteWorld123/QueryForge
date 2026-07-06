import { Elysia } from "elysia";
import {
	forgotPassword,
	resetPassword,
	sendVerificationOtp,
	signIn,
	signOut,
	signUp,
	verifyEmail,
} from "./auth.controller";
import {
	ForgotPasswordSchema,
	ResetPasswordSchema,
	SendVerificationOtpSchema,
	SignInSchema,
	SignUpSchema,
	VerifyEmailSchema,
} from "./auth.validation";

export const authRoutes = new Elysia({ prefix: "/auth" });

authRoutes
	.post("/sign-up", signUp, { body: SignUpSchema })
	.post("/sign-in", signIn, { body: SignInSchema })
	.post("/sign-out", signOut)
	.post("/send-verification-otp", sendVerificationOtp, {
		body: SendVerificationOtpSchema,
	})
	.post("/verify-email", verifyEmail, { body: VerifyEmailSchema })
	.post("/forgot-password", forgotPassword, { body: ForgotPasswordSchema })
	.post("/reset-password", resetPassword, { body: ResetPasswordSchema });
