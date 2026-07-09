import { buttonVariants, cn } from "@heroui/react";
import { Link } from "@tanstack/react-router";
import {
	ArrowRight,
	Compass,
	Database,
	Gauge,
	Heart,
	type LucideIcon,
} from "lucide-react";

const values: { icon: LucideIcon; title: string; body: string }[] = [
	{
		icon: Gauge,
		title: "Speed is a feature",
		body: "Every interaction should feel instant. Latency is the enemy of momentum.",
	},
	{
		icon: Compass,
		title: "Clarity over clutter",
		body: "We add features reluctantly and remove them eagerly. Focus is the product.",
	},
	{
		icon: Database,
		title: "Structure you can trust",
		body: "A data model that mirrors reality — because good software starts with a good schema.",
	},
	{
		icon: Heart,
		title: "Built with care",
		body: "Details matter. The small stuff is the whole stuff when you use a tool every day.",
	},
];

const stats = [
	{ label: "Founded", value: "2026" },
	{ label: "Built with", value: "SQL" },
	{ label: "Focus", value: "Teams" },
];

export function About() {
	return (
		<>
			<section className="relative overflow-hidden border-b border-border/70">
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0"
				>
					<div className="absolute -top-24 left-1/2 h-96 w-[50rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
				</div>
				<div className="relative mx-auto w-full max-w-4xl px-6 py-20 text-center lg:py-28">
					<p className="font-mono text-xs tracking-widest text-accent uppercase">
						Our story
					</p>
					<h1 className="mx-auto mt-4 max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight text-balance text-foreground sm:text-6xl">
						We're building the project tracker we wanted to use.
					</h1>
					<p className="mx-auto mt-6 max-w-xl text-lg text-muted">
						QueryForge started as a way to learn how real software is built —
						from the database up — and turned into a genuinely fast way to track
						work.
					</p>
				</div>
			</section>

			<section className="border-b border-border/70">
				<div className="mx-auto grid w-full max-w-5xl gap-12 px-6 py-16 lg:grid-cols-[1fr_0.8fr] lg:py-24">
					<div className="space-y-5 text-base leading-relaxed text-muted">
						<h2 className="font-serif text-3xl tracking-tight text-foreground">
							The name is a giveaway
						</h2>
						<p>
							QueryForge began with a simple goal: learn SQL properly by
							building something real with it. Not a to-do toy — a proper
							tracker, with organizations, projects, tasks, labels, and reports,
							backed by a schema that had to actually hold up.
						</p>
						<p>
							Along the way it became clear that most project tools are heavy in
							all the wrong places. So we kept ours lean: fast to navigate,
							honest about structure, and quiet enough to disappear behind the
							work.
						</p>
						<p>
							Every table, relation, and query in QueryForge was forged by hand
							— hence the name. It's a product, and it's also a lesson that kept
							growing.
						</p>
					</div>

					<div className="flex flex-col gap-4">
						{stats.map((s) => (
							<div
								key={s.label}
								className="flex items-center justify-between rounded-xl border border-border bg-surface px-5 py-4"
							>
								<span className="font-mono text-xs tracking-widest text-muted uppercase">
									{s.label}
								</span>
								<span className="font-serif text-2xl text-foreground">
									{s.value}
								</span>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="border-b border-border/70 bg-surface-secondary/30">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-24">
					<h2 className="font-serif text-4xl tracking-tight text-foreground">
						What we value
					</h2>
					<div className="mt-12 grid gap-8 sm:grid-cols-2">
						{values.map(({ icon: Icon, title, body }) => (
							<div key={title} className="flex gap-4">
								<span className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent-soft-foreground">
									<Icon className="size-5" />
								</span>
								<div>
									<h3 className="text-base font-semibold text-foreground">
										{title}
									</h3>
									<p className="mt-1.5 text-sm leading-relaxed text-muted">
										{body}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section>
				<div className="mx-auto w-full max-w-4xl px-6 py-20 text-center">
					<h2 className="font-serif text-4xl tracking-tight text-foreground">
						Come build with us.
					</h2>
					<p className="mx-auto mt-4 max-w-md text-muted">
						QueryForge is just getting started. Jump in while it's in early
						access.
					</p>
					<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
						<Link
							to="/sign-up"
							className={cn(
								buttonVariants({ variant: "primary", size: "lg" }),
								"rounded-xl",
							)}
						>
							Get started
							<ArrowRight className="size-4" />
						</Link>
						<Link
							to="/contact"
							className={cn(
								buttonVariants({ variant: "outline", size: "lg" }),
								"rounded-xl",
							)}
						>
							Talk to us
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}
