import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useState } from "react";

import { WorkspaceSidebar } from "#/frontend/components/chrome/workspace-sidebar";
import { WorkspaceTopbar } from "#/frontend/components/chrome/workspace-topbar";

export const Route = createFileRoute("/_workspace-layout")({
	component: WorkspaceLayout,
});

function WorkspaceLayout() {
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<div className="min-h-screen bg-background">
			<WorkspaceSidebar
				mobileOpen={mobileOpen}
				onClose={() => setMobileOpen(false)}
			/>
			<div className="flex min-h-screen min-w-0 flex-col lg:pl-64">
				<WorkspaceTopbar onOpenMenu={() => setMobileOpen(true)} />
				<main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
