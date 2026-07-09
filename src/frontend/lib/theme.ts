/**
 * Theme handling for QueryForge.
 *
 * Dark mode is driven by the `.dark` class on <html> (the strategy HeroUI v3
 * keys off). The init script runs before paint to avoid a flash of the wrong
 * theme, and `useTheme` reads/writes that same state on the client.
 */
import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "queryforge-theme";

/** Inline script injected into <head> — sets the theme class before first paint. */
export const themeInitScript = `(function(){try{var k="${THEME_STORAGE_KEY}";var s=localStorage.getItem(k);var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;var e=document.documentElement;e.classList.toggle("dark",d);e.style.colorScheme=d?"dark":"light";}catch(e){}})();`;

function applyTheme(theme: Theme) {
	const el = document.documentElement;
	el.classList.toggle("dark", theme === "dark");
	el.style.colorScheme = theme;
}

function persistTheme(theme: Theme) {
	try {
		localStorage.setItem(THEME_STORAGE_KEY, theme);
	} catch {
		/* storage unavailable — keep the in-memory theme only */
	}
}

export function useTheme() {
	const [theme, setTheme] = useState<Theme>("light");

	// The init script has already set the class; mirror it into React state.
	useEffect(() => {
		setTheme(
			document.documentElement.classList.contains("dark") ? "dark" : "light",
		);
	}, []);

	const setAndApply = useCallback((next: Theme) => {
		setTheme(next);
		applyTheme(next);
		persistTheme(next);
	}, []);

	const toggle = useCallback(() => {
		setTheme((prev) => {
			const next: Theme = prev === "dark" ? "light" : "dark";
			applyTheme(next);
			persistTheme(next);
			return next;
		});
	}, []);

	return { theme, setTheme: setAndApply, toggle };
}
