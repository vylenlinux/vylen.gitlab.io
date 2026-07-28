import {
    Package,
    Loader,
    TriangleAlert
} from "lucide";

import {
    render
} from "../lib/template";

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
        icon_alert: TriangleAlert
    });

    return renderShell({
        content,
        currentPath
    });
}

export function mountDownload(): void {
    void initDownloadCard();
}
