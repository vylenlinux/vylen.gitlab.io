import {
    render
} from "../lib/template";

import {
    navLinks,
    logoUrl,
    sourceLinks
} from "../data/site";

export interface ShellOptions {
    content: string;
    currentPath: string;
}

export function renderShell(opts: ShellOptions): string {
    return render("layout.njk", {
        content: opts.content,
        currentPath: opts.currentPath,
        navLinks,
        logoUrl,
        sourceLinks,
        year: new Date().getFullYear()
    });
}
