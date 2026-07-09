import { createRouter as createTanStackRouter } from "@tanstack/react-router";

import { ErrorState } from "../components/status/error-state";
import { Loading } from "../components/status/loading";
import { NotFound } from "../components/status/not-found";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
	const router = createTanStackRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		defaultPendingComponent: () => <Loading />,
		defaultErrorComponent: ({ error, reset }) => (
			<ErrorState error={error} reset={reset} />
		),
		defaultNotFoundComponent: () => <NotFound />,
	});

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
