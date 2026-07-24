import {
    Package,
    Loader,
    TriangleAlert,
    BookOpen
} from "lucide";

import {
    render
} from "../lib/template";

import {
    navLinks,
    logoUrl,
    footerLinks
} from "../data/site";

import {
    downloadInfo,
    requirementTiers
} from "../data/download";

import {
    renderShell
} from "./shell";

import {
    initDownloadCard
} from "../lib/downloadCard";

export function renderDownload(currentPath: string): string {
    const content: string = render("pages/download.njk", {
        title: downloadInfo.title,
        subtitle: downloadInfo.subtitle,
        warning: downloadInfo.warning,
        requirementTiers,
        icon_package: Package,
        icon_loader: Loader,
        icon_alert: TriangleAlert,
        icon_book: BookOpen
    });

    return renderShell({
        title: "Download — Vylen Linux",
        content,
        currentPath,
        navLinks,
        logoUrl,
        footerLinks
    });
}

export function mountDownload(): void {
    void initDownloadCard();
}
