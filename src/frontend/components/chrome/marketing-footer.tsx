import { Link } from "@tanstack/react-router";

import { Logo } from "#/frontend/components/ui/logo";

const columns = [
	{
		heading: "Product",
		links: [
			{ label: "Features", to: "/", hash: "features" },
			{ label: "Sign in", to: "/sign-in" },
			{ label: "Get started", to: "/sign-up" },
		],
	},
	{
		heading: "Company",
		links: [
			{ label: "About", to: "/about" },
			{ label: "Contact", to: "/contact" },
		],
	},
] as const;

export function MarketingFooter() {
	return (
		<footer className="border-t border-border/70 bg-surface-secondary/40">
			<div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
				<div className="lg:col-span-2">
					<Logo />
					<p className="mt-4 max-w-xs text-sm text-muted">
						A fast, focused project tracker — forged for teams who'd rather ship
						than wrangle their tools.
					</p>
				</div>

				{columns.map((col) => (
					<div key={col.heading}>
						<h3 className="font-mono text-xs tracking-widest text-muted uppercase">
							{col.heading}
						</h3>
						<ul className="mt-4 space-y-3">
							{col.links.map((link) => (
								<li key={link.label}>
									<Link
										to={link.to}
										hash={"hash" in link ? link.hash : undefined}
										className="text-sm text-foreground/80 transition-colors hover:text-accent"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

			<div className="border-t border-border/70">
				<div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-muted sm:flex-row">
					<p>© {new Date().getFullYear()} QueryForge. All rights reserved.</p>
					<p className="font-mono">Built to learn SQL, the hard way.</p>
				</div>
			</div>
		</footer>
	);
}
