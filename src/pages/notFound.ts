import {
    render
} from "../lib/template";

import {
    renderShell
} from "./shell";

export function renderNotFound(currentPath: string): string {
    const content: string = render("pages/notFound.njk", {});

    return renderShell({
        content,
        currentPath
    });
}
