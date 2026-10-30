import {
    render
} from "../lib/template";

import {
    renderShell
} from "./shell";

export function renderHome(currentPath: string): string {
    const content: string = render("pages/home.njk", {});

    return renderShell({
        content,
        currentPath
    });
}
