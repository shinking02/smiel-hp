"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

// Explicit rendering: the implicit mode scans the page once on load, so it
// would miss a form reached through client-side navigation.
const SCRIPT_URL =
	"https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

interface Turnstile {
	render: (
		container: HTMLElement,
		options: {
			sitekey: string;
			language: string;
			theme: "light" | "dark" | "auto";
		},
	) => string | undefined;
	reset: (widgetId: string) => void;
	remove: (widgetId: string) => void;
}

declare global {
	interface Window {
		turnstile?: Turnstile;
	}
}

interface TurnstileWidgetProps {
	siteKey: string;
	/** Changes after every attempt, since a token is good for one check only. */
	resetKey: unknown;
}

export const TurnstileWidget = ({
	siteKey,
	resetKey,
}: TurnstileWidgetProps) => {
	const container = useRef<HTMLDivElement>(null);
	const widgetId = useRef<string | undefined>(undefined);

	const render = useCallback(() => {
		if (
			window.turnstile === undefined ||
			container.current === null ||
			widgetId.current !== undefined
		)
			return;

		widgetId.current = window.turnstile.render(container.current, {
			sitekey: siteKey,
			language: "ja",
			// The site has no dark theme, so the widget must not follow the OS.
			theme: "light",
		});
	}, [siteKey]);

	// Covers a remount once the script is already in place; `onReady` covers
	// the first load. Whichever runs second finds the widget and stops.
	useEffect(() => {
		render();

		return () => {
			if (widgetId.current !== undefined) {
				window.turnstile?.remove(widgetId.current);
				widgetId.current = undefined;
			}
		};
	}, [render]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: resetKey is the trigger, not an input
	useEffect(() => {
		if (widgetId.current !== undefined)
			window.turnstile?.reset(widgetId.current);
	}, [resetKey]);

	return (
		<>
			<Script src={SCRIPT_URL} onReady={render} />
			<div ref={container} className="min-h-[65px]" />
		</>
	);
};
