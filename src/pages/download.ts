import {
    render
} from "../lib/template";

import {
    renderShell
} from "./shell";

import {
    initDownloadCard
} from "../lib/downloadCard";

export function renderDownload(currentPath: string): string {
    const content: string = render("pages/download.njk");

    return renderShell({
        content,
        currentPath
    });
}

export function mountDownload(): void {
    void initDownloadCard();
}
