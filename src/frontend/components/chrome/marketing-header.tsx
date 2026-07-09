import { Button, buttonVariants, cn } from "@heroui/react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Logo } from "#/frontend/components/ui/logo";
import { ThemeToggle } from "#/frontend/components/ui/theme-toggle";

const navLinks = [
	{ label: "Features", to: "/", hash: "features" },
	{ label: "About", to: "/about" },
	{ label: "Contact", to: "/contact" },
] as const;

export function MarketingHeader() {
	const [open, setOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
			<div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6">
				<Link to="/" aria-label="QueryForge home">
					<Logo />
				</Link>

				<nav className="hidden items-center gap-1 md:flex">
					{navLinks.map((item) => (
						<Link
							key={item.label}
							to={item.to}
							hash={"hash" in item ? item.hash : undefined}
							className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
						>
							{item.label}
						</Link>
					))}
				</nav>

				<div className="hidden items-center gap-2 md:flex">
					<ThemeToggle />
					<Link
						to="/sign-in"
						className={cn(
							buttonVariants({ variant: "ghost", size: "sm" }),
							"rounded-lg",
						)}
					>
						Sign in
					</Link>
					<Link
						to="/sign-up"
						className={cn(
							buttonVariants({ variant: "primary", size: "sm" }),
							"rounded-lg",
						)}
					>
						Get started
					</Link>
				</div>

				<div className="flex items-center gap-1 md:hidden">
					<ThemeToggle />
					<Button
						type="button"
						variant="ghost"
						size="sm"
						isIconOnly
						aria-label={open ? "Close menu" : "Open menu"}
						aria-expanded={open}
						onPress={() => setOpen((v) => !v)}
						className="rounded-lg text-muted"
					>
						{open ? <X className="size-5" /> : <Menu className="size-5" />}
					</Button>
				</div>
			</div>

			{open && (
				<div className="border-t border-border/70 bg-background md:hidden">
					<nav className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-6 py-4">
						{navLinks.map((item) => (
							<Link
								key={item.label}
								to={item.to}
								hash={"hash" in item ? item.hash : undefined}
								onClick={() => setOpen(false)}
								className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-secondary hover:text-foreground"
							>
								{item.label}
							</Link>
						))}
						<div className="mt-3 flex flex-col gap-2">
							<Link
								to="/sign-in"
								onClick={() => setOpen(false)}
								className={cn(
									buttonVariants({ variant: "outline", size: "md" }),
									"w-full rounded-lg",
								)}
							>
								Sign in
							</Link>
							<Link
								to="/sign-up"
								onClick={() => setOpen(false)}
								className={cn(
									buttonVariants({ variant: "primary", size: "md" }),
									"w-full rounded-lg",
								)}
							>
								Get started
							</Link>
						</div>
					</nav>
				</div>
			)}
		</header>
	);
}
