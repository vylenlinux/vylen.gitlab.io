import JSON5 from "json5";

import {
    Loader,
    CircleAlert,
    Download,
    FileCheck
} from "lucide";

import {
    iconToSvg
} from "./icon";

import {
    buildDownloadUrls
} from "../data/download";

import type {
    LatestRelease
} from "../data/download";

interface ReleaseCardElements {
    loading: HTMLElement | null;
    error: HTMLElement | null;
    content: HTMLElement | null;
    date: HTMLElement | null;
    file: HTMLElement | null;
    archiveLink: HTMLAnchorElement | null;
    checksumLink: HTMLAnchorElement | null;
}

function getElements(): ReleaseCardElements {
    return {
        loading:      document.querySelector<HTMLElement>("[data-release-loading]"),
        error:        document.querySelector<HTMLElement>("[data-release-error]"),
        content:      document.querySelector<HTMLElement>("[data-release-content]"),
        date:         document.querySelector<HTMLElement>("[data-release-date]"),
        file:         document.querySelector<HTMLElement>("[data-release-file]"),
        archiveLink:  document.querySelector<HTMLAnchorElement>("[data-release-archive]"),
        checksumLink: document.querySelector<HTMLAnchorElement>("[data-release-checksum]")
    };
}

function isRelease(value: unknown): value is LatestRelease {
    if (typeof value !== "object" || value === null) return false;

    const release: Record<string, unknown> = value as Record<string, unknown>;

    return (typeof release.date === "string")
        && (typeof release.tarball === "string") && release.tarball.startsWith("https://")
        && (typeof release.b3sum === "string") && release.b3sum.startsWith("https://");
}

function getFilename(url: string): string {
    return url.slice(url.lastIndexOf("/") + 1);
}

function formatDate(dateStr: string): string {
    if (dateStr.length !== 8) return dateStr;

    return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
}

function showRelease(release: LatestRelease, el: ReleaseCardElements): void {
    const {
        tarballUrl,
        b3sumUrl
    } = buildDownloadUrls(release);

    if (el.date) el.date.textContent = formatDate(release.date);
    if (el.file) el.file.textContent = getFilename(tarballUrl);

    if (el.archiveLink) {
        el.archiveLink.href = tarballUrl;
        el.archiveLink.innerHTML = `${iconToSvg(Download, 16)}<span>Download archive</span>`;
    }

    if (el.checksumLink) {
        el.checksumLink.href = b3sumUrl;
        el.checksumLink.innerHTML = `${iconToSvg(FileCheck, 16)}<span>Checksum file</span>`;
    }

    el.loading?.setAttribute("hidden", "");
    el.content?.removeAttribute("hidden");
}

function showError(el: ReleaseCardElements): void {
    el.loading?.setAttribute("hidden", "");

    if (el.error) {
        el.error.innerHTML = `${iconToSvg(CircleAlert, 18)}<span>Release information is unavailable right now. Try again later.</span>`;
        el.error.removeAttribute("hidden");
    }
}

export async function initDownloadCard(): Promise<void> {
    const el: ReleaseCardElements = getElements();
    if (!el.loading) return;

    el.loading.innerHTML = `<span class="spin">${iconToSvg(Loader, 18)}</span><span>Loading release information</span>`;

    try {
        const response: Response = await fetch("/rootfs.json5");
        if (!response.ok) throw new Error(`Release request failed: ${response.status}`);

        const release: unknown = JSON5.parse(await response.text());
        if (!isRelease(release)) throw new Error("Unexpected release metadata");

        showRelease(release, el);
    } catch {
        showError(el);
    }
}
