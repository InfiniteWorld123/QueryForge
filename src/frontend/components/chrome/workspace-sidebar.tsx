import { Button } from "@heroui/react";
import { Link } from "@tanstack/react-router";
import {
	Building2,
	ChartNoAxesColumn,
	FolderKanban,
	LayoutDashboard,
	type LucideIcon,
	Settings,
	SquareCheckBig,
	Tag,
	X,
} from "lucide-react";

import { Logo } from "#/frontend/components/ui/logo";

interface NavItem {
	label: string;
	to: string;
	icon: LucideIcon;
}

const primaryNav: NavItem[] = [
	{ label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
	{ label: "Projects", to: "/projects", icon: FolderKanban },
	{ label: "Tasks", to: "/tasks", icon: SquareCheckBig },
	{ label: "Labels", to: "/labels", icon: Tag },
	{ label: "Reports", to: "/reports", icon: ChartNoAxesColumn },
	{ label: "Organizations", to: "/organizations", icon: Building2 },
];

const secondaryNav: NavItem[] = [
	{ label: "Settings", to: "/settings/profile", icon: Settings },
];

function NavList({
	items,
	onNavigate,
}: {
	items: NavItem[];
	onNavigate?: () => void;
}) {
	return (
		<ul className="space-y-0.5">
			{items.map(({ label, to, icon: Icon }) => (
				<li key={label}>
					<Link
						to={to}
						onClick={onNavigate}
						className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-secondary hover:text-foreground"
						activeProps={{
							className: "!bg-accent-soft !text-accent-soft-foreground",
						}}
						activeOptions={{ exact: false }}
					>
						<Icon className="size-4.5 shrink-0" />
						{label}
					</Link>
				</li>
			))}
		</ul>
	);
}

function SidebarInner({ onNavigate }: { onNavigate?: () => void }) {
	return (
		<div className="flex h-full flex-col gap-6 px-4 py-5">
			<div className="px-2">
				<Link to="/dashboard" aria-label="QueryForge" onClick={onNavigate}>
					<Logo />
				</Link>
			</div>

			<nav className="flex-1">
				<p className="px-3 pb-2 font-mono text-[0.65rem] tracking-widest text-muted/70 uppercase">
					Workspace
				</p>
				<NavList items={primaryNav} onNavigate={onNavigate} />
			</nav>

			<div className="border-t border-border/70 pt-4">
				<NavList items={secondaryNav} onNavigate={onNavigate} />
			</div>
		</div>
	);
}

interface WorkspaceSidebarProps {
	mobileOpen: boolean;
	onClose: () => void;
}

export function WorkspaceSidebar({
	mobileOpen,
	onClose,
}: WorkspaceSidebarProps) {
	return (
		<>
			{/* Desktop: fixed rail */}
			<aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border/70 bg-surface lg:block">
				<SidebarInner />
			</aside>

			{/* Mobile: overlay drawer */}
			{mobileOpen && (
				<div className="fixed inset-0 z-50 lg:hidden">
					<button
						type="button"
						aria-label="Close navigation"
						className="absolute inset-0 bg-backdrop"
						onClick={onClose}
					/>
					<aside className="absolute inset-y-0 left-0 w-72 max-w-[80vw] border-r border-border/70 bg-surface shadow-overlay">
						<Button
							type="button"
							variant="ghost"
							size="sm"
							isIconOnly
							aria-label="Close navigation"
							onPress={onClose}
							className="absolute top-4 right-3 rounded-lg text-muted"
						>
							<X className="size-5" />
						</Button>
						<SidebarInner onNavigate={onClose} />
					</aside>
				</div>
			)}
		</>
	);
}
