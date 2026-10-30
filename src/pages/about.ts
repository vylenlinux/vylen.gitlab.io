import {
    render
} from "../lib/template";

import {
    highlights,
    principles
} from "../data/about";

import {
    renderShell
} from "./shell";

export function renderAbout(currentPath: string): string {
    const content: string = render("pages/about.njk", {
        highlights,
        principles
    });

    return renderShell({
        content,
        currentPath
    });
}
