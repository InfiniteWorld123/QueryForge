import {
	Button,
	Description,
	Input,
	Label,
	TextArea,
	TextField,
} from "@heroui/react";
import { Mail, MessageSquare, Send } from "lucide-react";

const details = [
	{
		icon: Mail,
		label: "Email",
		value: "hello@queryforge.dev",
		hint: "We reply within a day or two.",
	},
	{
		icon: MessageSquare,
		label: "Support",
		value: "support@queryforge.dev",
		hint: "Questions about your workspace.",
	},
];

const faqs = [
	{
		q: "Is QueryForge free?",
		a: "Yes — it's free while in early access. We'll share pricing well before that changes.",
	},
	{
		q: "Can I import existing projects?",
		a: "Import tooling is on the roadmap. Reach out and tell us what you're moving from.",
	},
];

export function Contact() {
	return (
		<section className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-24">
			<div className="max-w-2xl">
				<p className="font-mono text-xs tracking-widest text-accent uppercase">
					Contact
				</p>
				<h1 className="mt-3 font-serif text-5xl tracking-tight text-foreground sm:text-6xl">
					Let's talk.
				</h1>
				<p className="mt-4 text-lg text-muted">
					Questions, feedback, or just curious? Send a note and we'll get back
					to you.
				</p>
			</div>

			<div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
				{/* Form (UI only) */}
				<div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
					<form
						className="flex flex-col gap-5"
						onSubmit={(e) => e.preventDefault()}
					>
						<div className="grid gap-5 sm:grid-cols-2">
							<TextField isRequired className="flex flex-col gap-1.5">
								<Label>Name</Label>
								<Input placeholder="Ada Lovelace" />
							</TextField>
							<TextField
								isRequired
								type="email"
								className="flex flex-col gap-1.5"
							>
								<Label>Email</Label>
								<Input placeholder="you@company.com" />
							</TextField>
						</div>

						<TextField className="flex flex-col gap-1.5">
							<Label>Subject</Label>
							<Input placeholder="What's this about?" />
						</TextField>

						<TextField isRequired className="flex flex-col gap-1.5">
							<Label>Message</Label>
							<TextArea
								rows={5}
								placeholder="Tell us what's on your mind…"
								className="resize-y"
							/>
							<Description>We read every message.</Description>
						</TextField>

						<Button
							type="submit"
							variant="primary"
							size="lg"
							className="mt-1 rounded-xl sm:self-start"
						>
							<Send className="size-4" />
							Send message
						</Button>
					</form>
				</div>

				{/* Details + FAQ */}
				<div className="flex flex-col gap-8">
					<div className="flex flex-col gap-4">
						{details.map(({ icon: Icon, label, value, hint }) => (
							<div
								key={label}
								className="flex items-start gap-4 rounded-xl border border-border bg-surface px-5 py-4"
							>
								<span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent-soft-foreground">
									<Icon className="size-5" />
								</span>
								<div>
									<p className="font-mono text-xs tracking-widest text-muted uppercase">
										{label}
									</p>
									<p className="mt-1 text-sm font-medium text-foreground">
										{value}
									</p>
									<p className="mt-0.5 text-xs text-muted">{hint}</p>
								</div>
							</div>
						))}
					</div>

					<div>
						<h2 className="font-mono text-xs tracking-widest text-muted uppercase">
							Common questions
						</h2>
						<dl className="mt-4 space-y-5">
							{faqs.map((item) => (
								<div key={item.q}>
									<dt className="text-sm font-semibold text-foreground">
										{item.q}
									</dt>
									<dd className="mt-1.5 text-sm leading-relaxed text-muted">
										{item.a}
									</dd>
								</div>
							))}
						</dl>
					</div>
				</div>
			</div>
		</section>
	);
}
