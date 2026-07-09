import { buttonVariants, Chip, cn } from "@heroui/react";
import { Link } from "@tanstack/react-router";
import {
	ArrowRight,
	FolderKanban,
	GitBranch,
	type LucideIcon,
	Radar,
	Sparkles,
	Tag,
	Users,
	Workflow,
	Zap,
} from "lucide-react";

const features: { icon: LucideIcon; title: string; body: string }[] = [
	{
		icon: FolderKanban,
		title: "Projects that stay legible",
		body: "Group work into projects and organizations without the ceremony. Every task has a home.",
	},
	{
		icon: Tag,
		title: "Labels with meaning",
		body: "Slice work by team, priority, or status. Labels compose instead of multiplying.",
	},
	{
		icon: Radar,
		title: "Reports at a glance",
		body: "See velocity, load, and what's slipping — surfaced, not buried in a dashboard maze.",
	},
	{
		icon: Zap,
		title: "Built for speed",
		body: "Keyboard-first, instant navigation. The interface gets out of the way of the work.",
	},
	{
		icon: Users,
		title: "Made for teams",
		body: "Organizations, members, and shared context so everyone sees the same picture.",
	},
	{
		icon: GitBranch,
		title: "Structured by design",
		body: "A schema that mirrors how work actually branches — forged while learning SQL.",
	},
];

const steps = [
	{
		step: "01",
		title: "Create a project",
		body: "Spin up a project under your organization and invite the people who ship it.",
	},
	{
		step: "02",
		title: "Break it into tasks",
		body: "Add tasks, tag them with labels, and set what matters. Structure emerges as you go.",
	},
	{
		step: "03",
		title: "Track and report",
		body: "Watch progress in real time and pull reports when it's time to tell the story.",
	},
];

export function Landing() {
	return (
		<>
			<Hero />
			<Features />
			<HowItWorks />
			<CtaBand />
		</>
	);
}

function Hero() {
	return (
		<section className="relative overflow-hidden">
			<div aria-hidden="true" className="pointer-events-none absolute inset-0">
				<div className="absolute -top-24 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
				<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
			</div>

			<div className="mx-auto grid w-full max-w-6xl gap-14 px-6 pt-20 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-28">
				<div className="flex flex-col items-start">
					<Chip variant="secondary" className="gap-1.5 rounded-full">
						<Sparkles className="size-3.5 text-accent" />
						<span className="font-mono text-xs">Now in early access</span>
					</Chip>

					<h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight text-balance text-foreground sm:text-6xl lg:text-7xl">
						Track every thread of your work.
					</h1>

					<p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
						QueryForge is a fast, focused project tracker. Organize work into
						projects, tasks, and labels — and ship with clarity instead of
						chaos.
					</p>

					<div className="mt-9 flex flex-col gap-3 sm:flex-row">
						<Link
							to="/sign-up"
							className={cn(
								buttonVariants({ variant: "primary", size: "lg" }),
								"rounded-xl",
							)}
						>
							Get started free
							<ArrowRight className="size-4" />
						</Link>
						<Link
							to="/"
							hash="features"
							className={cn(
								buttonVariants({ variant: "outline", size: "lg" }),
								"rounded-xl",
							)}
						>
							Explore features
						</Link>
					</div>

					<p className="mt-6 font-mono text-xs text-muted">
						No credit card · Free while in early access
					</p>
				</div>

				<HeroPreview />
			</div>
		</section>
	);
}

/** A static, stylized snapshot of the product — sets the tone without a screenshot. */
function HeroPreview() {
	const columns = [
		{
			name: "Backlog",
			tone: "text-muted",
			cards: [
				{ title: "Design query schema", tag: "backend", tone: "accent" },
				{ title: "Auth flow polish", tag: "design", tone: "warning" },
			],
		},
		{
			name: "In progress",
			tone: "text-accent",
			cards: [
				{ title: "Reports dashboard", tag: "frontend", tone: "accent" },
				{ title: "Label filters", tag: "core", tone: "success" },
			],
		},
	] as const;

	const toneClass: Record<string, string> = {
		accent: "bg-accent-soft text-accent-soft-foreground",
		warning: "bg-warning-soft text-warning-soft-foreground",
		success: "bg-success-soft text-success-soft-foreground",
	};

	return (
		<div className="relative">
			<div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-accent/10 to-transparent blur-2xl" />
			<div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-overlay">
				<div className="flex items-center gap-2 border-b border-border/70 px-4 py-3">
					<span className="size-2.5 rounded-full bg-danger/70" />
					<span className="size-2.5 rounded-full bg-warning/70" />
					<span className="size-2.5 rounded-full bg-success/70" />
					<span className="ml-3 font-mono text-xs text-muted">
						queryforge / mobile-app
					</span>
				</div>
				<div className="grid grid-cols-2 gap-3 p-4">
					{columns.map((col) => (
						<div key={col.name} className="flex flex-col gap-3">
							<div className="flex items-center justify-between">
								<span className={cn("text-xs font-semibold", col.tone)}>
									{col.name}
								</span>
								<span className="font-mono text-[0.65rem] text-muted">
									{col.cards.length}
								</span>
							</div>
							{col.cards.map((card) => (
								<div
									key={card.title}
									className="rounded-lg border border-border bg-surface-secondary/50 p-3"
								>
									<p className="text-sm font-medium text-foreground">
										{card.title}
									</p>
									<span
										className={cn(
											"mt-2 inline-flex rounded-md px-1.5 py-0.5 font-mono text-[0.65rem]",
											toneClass[card.tone],
										)}
									>
										{card.tag}
									</span>
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

function Features() {
	return (
		<section
			id="features"
			className="scroll-mt-20 border-t border-border/70 bg-surface-secondary/30"
		>
			<div className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
				<div className="max-w-2xl">
					<p className="font-mono text-xs tracking-widest text-accent uppercase">
						Features
					</p>
					<h2 className="mt-3 font-serif text-4xl tracking-tight text-foreground sm:text-5xl">
						Everything you need. Nothing you don't.
					</h2>
					<p className="mt-4 text-lg text-muted">
						The essentials of project tracking, sharpened to a point.
					</p>
				</div>

				<div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
					{features.map(({ icon: Icon, title, body }) => (
						<div
							key={title}
							className="group flex flex-col gap-4 bg-surface p-7 transition-colors hover:bg-surface-hover"
						>
							<span className="grid size-10 place-items-center rounded-lg bg-accent-soft text-accent-soft-foreground">
								<Icon className="size-5" />
							</span>
							<h3 className="text-base font-semibold text-foreground">
								{title}
							</h3>
							<p className="text-sm leading-relaxed text-muted">{body}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

function HowItWorks() {
	return (
		<section className="border-t border-border/70">
			<div className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
				<div className="flex items-center gap-3">
					<Workflow className="size-5 text-accent" />
					<p className="font-mono text-xs tracking-widest text-accent uppercase">
						How it works
					</p>
				</div>
				<h2 className="mt-3 max-w-2xl font-serif text-4xl tracking-tight text-foreground sm:text-5xl">
					From empty project to shipped, in three steps.
				</h2>

				<div className="mt-14 grid gap-8 md:grid-cols-3">
					{steps.map(({ step, title, body }) => (
						<div key={step} className="relative">
							<span className="font-serif text-5xl text-accent/30">{step}</span>
							<h3 className="mt-4 text-lg font-semibold text-foreground">
								{title}
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

function CtaBand() {
	return (
		<section className="border-t border-border/70">
			<div className="mx-auto w-full max-w-6xl px-6 py-20">
				<div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-8 py-16 text-center sm:px-16">
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0"
					>
						<div className="absolute top-1/2 left-1/2 h-80 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
					</div>
					<div className="relative">
						<h2 className="mx-auto max-w-2xl font-serif text-4xl tracking-tight text-balance text-foreground sm:text-5xl">
							Ready to forge your workflow?
						</h2>
						<p className="mx-auto mt-4 max-w-lg text-lg text-muted">
							Start tracking work the way it actually flows. Free while in early
							access.
						</p>
						<div className="mt-8 flex justify-center">
							<Link
								to="/sign-up"
								className={cn(
									buttonVariants({ variant: "primary", size: "lg" }),
									"rounded-xl",
								)}
							>
								Get started free
								<ArrowRight className="size-4" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
