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

type LoadingState = "loading" | "loaded" | "error";

interface DownloadCardElements {
    loading: HTMLElement | null;
    error: HTMLElement | null;
    header: HTMLElement | null;
    body: HTMLElement | null;
    actions: HTMLElement | null;
    date: HTMLElement | null;
    tarball: HTMLElement | null;
    b3sum: HTMLElement | null;
    tarballLink: HTMLAnchorElement | null;
    b3sumLink: HTMLAnchorElement | null;
}

function getElements(): DownloadCardElements {
    return {
        loading:     document.querySelector("[data-download-loading]"),
        error:       document.querySelector("[data-download-error]"),
        header:      document.querySelector("[data-download-header]"),
        body:        document.querySelector("[data-download-body]"),
        actions:     document.querySelector("[data-download-actions]"),
        date:        document.querySelector("[data-download-date]"),
        tarball:     document.querySelector("[data-download-tarball]"),
        b3sum:       document.querySelector("[data-download-b3sum]"),
        tarballLink: document.querySelector("[data-download-tarball-link]"),
        b3sumLink:   document.querySelector("[data-download-b3sum-link]")
    };
}

function setState(state: LoadingState, el: DownloadCardElements): void {
    el.loading?.setAttribute("hidden", "");
    el.error?.setAttribute("hidden", "");

    switch (state) {
        case "loading":
            el.loading?.removeAttribute("hidden");

            if (el.loading) el.loading.innerHTML = `
                <span class="spin">${iconToSvg(Loader, 20)}</span>
                <span>Loading release info…</span>
            `;

            break;

        case "error":
            el.error?.removeAttribute("hidden");

            if (el.error) el.error.innerHTML = `
                <span>${iconToSvg(CircleAlert, 20)}</span>
                <span>Failed to load release info. Try again later.</span>
            `;

            break;
    }
}

function getFilename(url: string): string {
    const index: number = url.lastIndexOf("/");
    return ((index === -1) ? url : url.slice(index + 1));
}

function showRelease(release: LatestRelease, el: DownloadCardElements): void {
    const {
        tarballUrl,
        b3sumUrl
    } = buildDownloadUrls(release);

    const tarballName: string = resolveVersionTemplate(release.tarball, release.date);
    const b3sumName: string = resolveVersionTemplate(release.b3sum, release.date);

    if (el.date) el.date.textContent = formatDate(release.date);
    if (el.tarball) el.tarball.textContent = getFilename(tarballName);
    if (el.b3sum) el.b3sum.textContent = getFilename(b3sumName);

    if (el.tarballLink) {
        el.tarballLink.href = tarballUrl;
        el.tarballLink.innerHTML = `${iconToSvg(Download, 18)} <span>Download Tarball</span>`;
    }

    if (el.b3sumLink) {
        el.b3sumLink.href = b3sumUrl;
        el.b3sumLink.innerHTML = `${iconToSvg(FileCheck, 18)} <span>B3sum Checksum</span>`;
    }

    el.header?.removeAttribute("hidden");
    el.body?.removeAttribute("hidden");
    el.actions?.removeAttribute("hidden");
}

export function resolveVersionTemplate(value: string, version: string): string {
    return value.replaceAll("%(version)", version);
}

function formatDate(dateStr: string): string {
    if (dateStr.length === 8) {
        const y: string = dateStr.slice(0, 4);
        const m: string = dateStr.slice(4, 6);
        const d: string = dateStr.slice(6, 8);

        return `${y}-${m}-${d}`;
    }

    return dateStr;
}

export async function initDownloadCard(): Promise<void> {
    const el: DownloadCardElements = getElements();
    if (!el.loading) return;

    setState("loading", el);

    try {
        const res: Response = await fetch("/rootfs.json5");

        if (!res.ok) {
            setState("error", el);
            return;
        }

        const text: string = await res.text();
        const release: LatestRelease = (JSON5.parse(text) as LatestRelease);

        setState("loaded", el);
        showRelease(release, el);
    } catch {
        setState("error", el);
    }
}
