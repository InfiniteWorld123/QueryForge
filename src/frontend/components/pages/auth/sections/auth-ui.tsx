import { Button, Description, Input, Label, TextField } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { type ReactNode, useState } from "react";

/** Card shell for auth screens — a restrained container, not HeroUI's rounded default. */
export function AuthCard({
	title,
	description,
	children,
	footer,
}: {
	title: string;
	description?: ReactNode;
	children: ReactNode;
	footer?: ReactNode;
}) {
	return (
		<div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-overlay">
			<div className="p-8 pb-0">
				<h1 className="font-serif text-3xl tracking-tight text-foreground">
					{title}
				</h1>
				{description && (
					<p className="mt-2 text-sm text-muted">{description}</p>
				)}
			</div>
			<div className="p-8 pt-6">{children}</div>
			{footer && (
				<div className="border-t border-border/70 bg-surface-secondary/40 px-8 py-5 text-center text-sm text-muted">
					{footer}
				</div>
			)}
		</div>
	);
}

interface FieldProps {
	label: string;
	type?: "text" | "email";
	placeholder?: string;
	autoComplete?: string;
	isRequired?: boolean;
	description?: string;
	defaultValue?: string;
	isReadOnly?: boolean;
}

export function Field({
	label,
	type = "text",
	placeholder,
	autoComplete,
	isRequired,
	description,
	defaultValue,
	isReadOnly,
}: FieldProps) {
	return (
		<TextField
			type={type}
			isRequired={isRequired}
			isReadOnly={isReadOnly}
			defaultValue={defaultValue}
			className="flex flex-col gap-1.5"
		>
			<Label>{label}</Label>
			<Input placeholder={placeholder} autoComplete={autoComplete} />
			{description && <Description>{description}</Description>}
		</TextField>
	);
}

export function PasswordField({
	label = "Password",
	placeholder = "••••••••",
	autoComplete = "current-password",
	description,
	action,
}: {
	label?: string;
	placeholder?: string;
	autoComplete?: string;
	description?: string;
	action?: ReactNode;
}) {
	const [visible, setVisible] = useState(false);

	return (
		<TextField
			type={visible ? "text" : "password"}
			isRequired
			className="flex flex-col gap-1.5"
		>
			<div className="flex items-center justify-between gap-2">
				<Label>{label}</Label>
				{action}
			</div>
			<div className="relative">
				<Input
					placeholder={placeholder}
					autoComplete={autoComplete}
					className="pr-11"
				/>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					isIconOnly
					aria-label={visible ? "Hide password" : "Show password"}
					onPress={() => setVisible((v) => !v)}
					className="absolute top-1/2 right-1 -translate-y-1/2 rounded-md text-muted"
				>
					{visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
				</Button>
			</div>
			{description && <Description>{description}</Description>}
		</TextField>
	);
}

export function OrDivider({ label = "or" }: { label?: string }) {
	return (
		<div className="flex items-center gap-3">
			<span className="h-px flex-1 bg-border" />
			<span className="font-mono text-xs text-muted">{label}</span>
			<span className="h-px flex-1 bg-border" />
		</div>
	);
}

export function SocialAuth({ verb = "Continue" }: { verb?: string }) {
	return (
		<div className="grid gap-3 sm:grid-cols-2">
			<Button variant="outline" size="md" className="rounded-lg" type="button">
				<GithubMark />
				{verb} with GitHub
			</Button>
			<Button variant="outline" size="md" className="rounded-lg" type="button">
				<GoogleMark />
				{verb} with Google
			</Button>
		</div>
	);
}

function GithubMark() {
	return (
		<svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
			<title>GitHub</title>
			<path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.13-.31-.54-1.53.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.18.77.84 1.23 1.92 1.23 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
		</svg>
	);
}

function GoogleMark() {
	return (
		<svg viewBox="0 0 24 24" className="size-4" aria-hidden>
			<title>Google</title>
			<path
				fill="#4285F4"
				d="M23.5 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.55-5.17 3.55-8.87Z"
			/>
			<path
				fill="#34A853"
				d="M12 24c3.24 0 5.95-1.08 7.95-2.91l-3.88-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A12 12 0 0 0 12 24Z"
			/>
			<path
				fill="#FBBC05"
				d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.09Z"
			/>
			<path
				fill="#EA4335"
				d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44A11.5 11.5 0 0 0 12 0 12 12 0 0 0 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
			/>
		</svg>
	);
}
