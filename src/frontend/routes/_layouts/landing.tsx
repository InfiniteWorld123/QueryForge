import { createFileRoute, Outlet } from "@tanstack/react-router";

import { MarketingFooter } from "#/frontend/components/chrome/marketing-footer";
import { MarketingHeader } from "#/frontend/components/chrome/marketing-header";

export const Route = createFileRoute("/_landing-layout")({
	component: LandingLayout,
});

function LandingLayout() {
	return (
		<div className="flex min-h-screen flex-col bg-background">
			<MarketingHeader />
			<main className="flex-1">
				<Outlet />
			</main>
			<MarketingFooter />
		</div>
	);
}
