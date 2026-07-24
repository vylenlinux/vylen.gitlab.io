import {
    render
} from "../lib/template";

import {
    navLinks,
    logoUrl,
    footerLinks,
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
        navLinks,
        logoUrl,
        currentPath,
        features: homeFeatures,

        hero: {
            badge: "Independent · Source-based",
            title: "Your system.",
            highlight: "Your rules.",
            subtitle: "Vylen Linux is an independent, source-based distribution built for experienced users who want full control over every component.",
            primaryCtaLabel: "Get Vylen",
            secondaryCtaLabel: "View ports"
        },

        stats: [
            {
                value: "Emerald",
                label: "Package manager"
            },

            {
                value: "OpenRC",
                label: "Init system"
            },

            {
                value: "x86_64",
                label: "Architecture"
            },

            {
                value: "Rolling",
                label: "Release model"
            }
        ],

        sectionTitle: "What sets Vylen apart",
        sectionSubtitle: "A system designed for those who want maximum configurability — down to every detail.",
        ports_url: portsUrl
    });

    return renderShell({
        title: "Vylen Linux — Independent Source-Based Distribution",
        content,
        currentPath,
        navLinks,
        logoUrl,
        footerLinks
    });
}
