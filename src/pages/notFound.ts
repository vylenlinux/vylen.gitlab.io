import {
    render
} from "../lib/template";

import {
    navLinks,
    logoUrl,
    footerLinks
} from "../data/site";

import {
    renderShell
} from "./shell";

export function renderNotFound(currentPath: string): string {
    const content: string = render("pages/notFound.njk", {
        currentPath
    });

    return renderShell({
        title: "404 — Vylen Linux",
        content,
        currentPath,
        navLinks,
        logoUrl,
        footerLinks
    });
}
