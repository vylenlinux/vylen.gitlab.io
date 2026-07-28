import {
    render
} from "../lib/template";

import {
    aboutHighlights
} from "../data/features";

import {
    principles
} from "../data/about";

import {
    renderShell
} from "./shell";

export function renderAbout(currentPath: string): string {
    const content: string = render("pages/about.njk", {
        highlights: aboutHighlights,
        principles,

        hero: {
            badge: "About the distribution",
            title: "A distro built by you,",
            highlight: "for you.",
            subtitle: "Vylen Linux is an independent, source-based rolling-release distribution. No binary packages, no ISO images — just a stage3 tarball and full control."
        }
    });

    return renderShell({
        content,
        currentPath
    });
}
