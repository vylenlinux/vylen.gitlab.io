import {
    Moon,
    Sun
} from "lucide";

import {
    iconToSvg
} from "./icon";

import type {
    IconNode
} from "lucide";

export type Theme = "light" | "dark";

const STORAGE_KEY: string = "vylen-theme";
const DATA_ATTR:   string = "data-theme";

function getStoredTheme(): Theme {
    try {
        const stored: string | null = localStorage.getItem(STORAGE_KEY);
        if ((stored === "light") || (stored === "dark")) return stored;
    } catch {
        // localStorage unavailable
    }

    return (prefersDark() ? "dark" : "light");
}

function prefersDark(): boolean {
    return (window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? true);
}

export function applyTheme(theme: Theme): void {
    document.documentElement.setAttribute(DATA_ATTR, theme);

    try {
        localStorage.setItem(STORAGE_KEY, theme);
    } catch {
        // ignore
    }

    updateThemeIcon(theme);
}

export function toggleTheme(): Theme {
    const current = document.documentElement.getAttribute(DATA_ATTR) as Theme;
    const next: Theme = ((current === "dark") ? "light" : "dark");

    applyTheme(next);
    return next;
}

export function updateThemeIcon(theme: Theme): void {
    const iconEl: HTMLElement | null = document.querySelector<HTMLElement>("[data-theme-icon]");
    if (!iconEl) return;

    const icon: IconNode = ((theme === "dark") ? Moon : Sun);
    iconEl.innerHTML = iconToSvg(icon, 18);
}

export function initTheme(): void {
    applyTheme(getStoredTheme());
}
