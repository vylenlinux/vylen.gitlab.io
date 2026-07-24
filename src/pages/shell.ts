import {
    render
} from "../lib/template";

import type {
    NavLink
} from "../data/site";

import type {
    LatestRelease
} from "../data/download";

export interface ShellOptions {
    title: string;
    content: string;
    currentPath: string;
    navLinks: NavLink[];
    logoUrl: string;

    footerLinks: {
        href:  string;
        label: string;
    }[];
}

export function renderShell(opts: ShellOptions): string {
    return render("layout.njk", {
        title: opts.title,
        content: opts.content,
        currentPath: opts.currentPath,
        navLinks: opts.navLinks,
        logoUrl: opts.logoUrl,
        footerLinks: opts.footerLinks,
        year: new Date().getFullYear()
    });
}

export type {
    LatestRelease
};
