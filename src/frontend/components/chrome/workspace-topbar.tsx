import { Avatar, Button, Kbd } from "@heroui/react";
import { Menu, Search } from "lucide-react";

import { ThemeToggle } from "#/frontend/components/ui/theme-toggle";

interface WorkspaceTopbarProps {
	onOpenMenu: () => void;
}

export function WorkspaceTopbar({ onOpenMenu }: WorkspaceTopbarProps) {
	return (
		<header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/70 bg-background/80 px-4 backdrop-blur-md sm:px-6">
			<Button
				type="button"
				variant="ghost"
				size="sm"
				isIconOnly
				aria-label="Open navigation"
				onPress={onOpenMenu}
				className="rounded-lg text-muted lg:hidden"
			>
				<Menu className="size-5" />
			</Button>

			{/* Search stub */}
			<button
				type="button"
				className="flex h-9 w-full max-w-sm items-center gap-2 rounded-lg border border-border bg-surface-secondary/60 px-3 text-sm text-muted transition-colors hover:border-border-secondary hover:text-foreground"
			>
				<Search className="size-4" />
				<span className="flex-1 text-left">Search…</span>
				<Kbd className="hidden sm:inline-flex">⌘K</Kbd>
			</button>

			<div className="ml-auto flex items-center gap-2">
				<ThemeToggle />
				<Avatar className="size-8">
					<Avatar.Fallback>QF</Avatar.Fallback>
				</Avatar>
			</div>
		</header>
	);
}
