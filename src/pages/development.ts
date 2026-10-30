import {
    render
} from "../lib/template";

import {
    gitlabGroupUrl,
    portsRepoUrl
} from "../data/site";

import {
    renderShell
} from "./shell";

export function renderDevelopment(currentPath: string): string {
    const content: string = render("pages/development.njk", {
        gitlabUrl: gitlabGroupUrl,
        portsRepoUrl
    });

    return renderShell({
        content,
        currentPath
    });
}
