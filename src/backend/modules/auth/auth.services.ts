import { auth } from "#/backend/shared/auth";
import {
	sendResetPasswordSuccessEmail,
	sendWelcomeEmail,
} from "#/backend/shared/mailer";
import type {
	ForgotPasswordServiceType,
	ResetPasswordServiceType,
	SendVerificationOtpServiceType,
	SignInServiceType,
	SignUpServiceType,
	VerifyEmailServiceType,
} from "./auth.type";

export const signUpService = async ({ body }: { body: SignUpServiceType }) =>
	await auth.api.signUpEmail({ body });

export const signInService = async ({ body }: { body: SignInServiceType }) =>
	await auth.api.signInEmail({ body });

export const signOutService = async ({ headers }: { headers: Headers }) =>
	await auth.api.signOut({ headers });

export const sendVerificationOtpService = async ({
	body,
}: {
	body: SendVerificationOtpServiceType;
}) =>
	await auth.api.sendVerificationOTP({
		body: {
			email: body.email,
			type: body.type ?? "email-verification",
		},
	});

export const verifyEmailService = async ({
	body,
}: {
	body: VerifyEmailServiceType;
}) => {
	const result = await auth.api.verifyEmailOTP({ body });

	if (result.status) {
		await sendWelcomeEmail({
			email: result.user.email,
			name: result.user.name,
		});
	}

	return result;
};

export const forgotPasswordService = async ({
	body,
}: {
	body: ForgotPasswordServiceType;
}) => await auth.api.requestPasswordResetEmailOTP({ body });

export const resetPasswordService = async ({
	body,
}: {
	body: ResetPasswordServiceType;
}) => {
	const result = await auth.api.resetPasswordEmailOTP({
		body: {
			email: body.email,
			otp: body.otp,
			password: body.newPassword,
		},
	});

	if (result.success) {
		await sendResetPasswordSuccessEmail({ email: body.email });
	}

	return result;
};
