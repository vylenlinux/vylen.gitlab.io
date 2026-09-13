import {
    render
} from "../lib/template";

import {
    portsUrl
} from "../data/site";

import {
    homeFeatures
} from "../data/features";

import {
    renderShell
} from "./shell";

export function renderHome(currentPath: string): string {
    const content: string = render("pages/home.njk", {
        features: homeFeatures,

        hero: {
            badge: "Independent · Source-based",
            title: "Your system.",
            highlight: "Your rules.",
            subtitle: "Vylen Linux is an independent, source-based distribution for experienced users who want to assemble and configure their system themselves.",
            primaryCtaLabel: "Get Vylen",
            secondaryCtaLabel: "View ports"
        },

        stats: [
            {
                label: "Package manager",
                value: "Emerald"
            },

            {
                label: "Init system",
                value: "OpenRC"
            },

            {
                label: "Architecture",
                value: "x86_64"
            },

            {
                label: "Package workflow",
                value: "Source-based"
            }
        ],

        sectionTitle: "What sets Vylen apart",
        sectionSubtitle: "A minimal starting point for users who want to make the important system choices themselves.",
        ports_url: portsUrl
    });

    return renderShell({
        content,
        currentPath
    });
}
