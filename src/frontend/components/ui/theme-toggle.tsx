import { Button, cn } from "@heroui/react";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "#/frontend/lib/theme";

interface ThemeToggleProps {
	className?: string;
}

/** Icon button that flips between light and dark, persisting the choice. */
export function ThemeToggle({ className }: ThemeToggleProps) {
	const { theme, toggle } = useTheme();
	const isDark = theme === "dark";

	return (
		<Button
			type="button"
			variant="ghost"
			size="sm"
			isIconOnly
			aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
			onPress={toggle}
			className={cn("rounded-lg text-muted", className)}
		>
			<Sun className={cn("size-4.5", isDark && "hidden")} />
			<Moon className={cn("size-4.5", !isDark && "hidden")} />
		</Button>
	);
}
