import * as v from "valibot";
import { HttpStatusCode } from "#/backend/shared/http";
import { responseOk } from "#/backend/shared/response";
import {
	forgotPasswordService,
	resetPasswordService,
	sendVerificationOtpService,
	signInService,
	signOutService,
	signUpService,
	verifyEmailService,
} from "./auth.services";
import type {
	ForgotPasswordBodyType,
	ResetPasswordBodyType,
	SendVerificationOtpBodyType,
	SignInBodyType,
	SignUpBodyType,
	VerifyEmailBodyType,
} from "./auth.type";
import {
	ForgotPasswordSchema,
	ResetPasswordSchema,
	SendVerificationOtpSchema,
	SignInSchema,
	SignUpSchema,
	VerifyEmailSchema,
} from "./auth.validation";

export const signUp = async ({ body }: { body: SignUpBodyType }) => {
	const parsedBody = v.parse(SignUpSchema, body);
	const result = await signUpService({
		body: {
			name: parsedBody.name,
			email: parsedBody.email,
			password: parsedBody.password,
			image: parsedBody.image,
			callbackURL: parsedBody.callbackURL,
		},
	});

	return responseOk({
		status: HttpStatusCode.CREATED,
		data: result,
		message: "sign up success. verification code sent",
	});
};

export const signIn = async ({ body }: { body: SignInBodyType }) => {
	const parsedBody = v.parse(SignInSchema, body);
	const result = await signInService({ body: parsedBody });

	return responseOk({
		status: HttpStatusCode.OK,
		data: result,
		message: "sign in success",
	});
};

export const signOut = async ({ request }: { request: Request }) => {
	const result = await signOutService({ headers: request.headers });

	return responseOk({
		status: HttpStatusCode.OK,
		data: result,
		message: "sign out success",
	});
};

export const sendVerificationOtp = async ({
	body,
}: {
	body: SendVerificationOtpBodyType;
}) => {
	const parsedBody = v.parse(SendVerificationOtpSchema, body);
	const result = await sendVerificationOtpService({ body: parsedBody });

	return responseOk({
		status: HttpStatusCode.OK,
		data: result,
		message: "verification code sent",
	});
};

export const verifyEmail = async ({ body }: { body: VerifyEmailBodyType }) => {
	const parsedBody = v.parse(VerifyEmailSchema, body);
	const result = await verifyEmailService({ body: parsedBody });

	return responseOk({
		status: HttpStatusCode.OK,
		data: result,
		message: "email verified",
	});
};

export const forgotPassword = async ({
	body,
}: {
	body: ForgotPasswordBodyType;
}) => {
	const parsedBody = v.parse(ForgotPasswordSchema, body);
	const result = await forgotPasswordService({ body: parsedBody });

	return responseOk({
		status: HttpStatusCode.OK,
		data: result,
		message: "password reset code sent",
	});
};

export const resetPassword = async ({
	body,
}: {
	body: ResetPasswordBodyType;
}) => {
	const parsedBody = v.parse(ResetPasswordSchema, body);
	const result = await resetPasswordService({
		body: {
			email: parsedBody.email,
			otp: parsedBody.otp,
			newPassword: parsedBody.newPassword,
		},
	});

	return responseOk({
		status: HttpStatusCode.OK,
		data: result,
		message: "password reset success",
	});
};
