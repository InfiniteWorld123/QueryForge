import {
	layout,
	physical,
	rootRoute,
	route,
} from "@tanstack/virtual-file-routes";

export const routes = rootRoute("_app/__root.tsx", [
	route("/api/$", "_app/api.$.ts"),
	layout("auth-layout", "_layouts/auth.tsx", [physical("_auth")]),
	layout("landing-layout", "_layouts/landing.tsx", [physical("_landing")]),
	layout("workspace-layout", "_layouts/workspace.tsx", [
		physical("_works-pace"),
	]),
]);
