import {
    Menu,
    X
} from "lucide";

import {
    iconToSvg
} from "./icon";

import {
    updateThemeIcon,
    toggleTheme,

    type Theme
} from "./theme";

export function initHeader(): void {
    const currentTheme: Theme = ((document.documentElement.getAttribute("data-theme") as Theme) ?? "dark");
    updateThemeIcon(currentTheme);

    const menuIconEl: HTMLElement | null = document.querySelector<HTMLElement>("[data-menu-icon]");
    if (menuIconEl) menuIconEl.innerHTML = iconToSvg(Menu, 20);

    const themeToggle: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");
    themeToggle?.addEventListener("click", (): Theme => toggleTheme());

    const menuToggle: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
    const mobileNav: HTMLElement | null = document.querySelector<HTMLElement>("[data-mobile-nav]");

    let isAnimating: boolean = false;

    const closeMobileNav: () => void = (): void => {
        if (isAnimating) return;
        isAnimating = true;

        mobileNav?.classList.remove("header__mobile-nav--open");
        menuToggle?.setAttribute("aria-expanded", "false");

        const iconEl: HTMLElement | null | undefined = menuToggle?.querySelector<HTMLElement>("[data-menu-icon]");
        if (iconEl) iconEl.innerHTML = iconToSvg(Menu, 20);

        setTimeout((): void => {
            isAnimating = false;
        }, 350);
    };

    menuToggle?.addEventListener("click", (): void => {
        if (isAnimating) return;
        isAnimating = true;

        const isOpen: boolean = (mobileNav?.classList.toggle("header__mobile-nav--open") ?? false);
        menuToggle.setAttribute("aria-expanded", String(isOpen));

        const iconEl: HTMLElement | null = menuToggle.querySelector<HTMLElement>("[data-menu-icon]");
        if (iconEl) iconEl.innerHTML = iconToSvg((isOpen ? X : Menu), 20);

        setTimeout((): void => {
            isAnimating = false;
        }, 350);
    });

    document.querySelectorAll<HTMLAnchorElement>(".header__mobile-link").forEach((link: HTMLAnchorElement): void => {
        link.addEventListener("click", closeMobileNav);
    });

    document.addEventListener("click", (event: MouseEvent): void => {
        if (!mobileNav?.classList.contains("header__mobile-nav--open")) return;

        const target: EventTarget | null = event.target;
        if (!(target instanceof Node)) return;

        if (mobileNav.contains(target) || menuToggle?.contains(target)) return;
        closeMobileNav();
    });

    document.addEventListener("keydown", (event: KeyboardEvent): void => {
        if (event.key === "Escape") closeMobileNav();
    });
}
