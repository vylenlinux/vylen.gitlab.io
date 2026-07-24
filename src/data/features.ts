import {
    Package,
    Terminal,
    ShieldCheck,
    Boxes,
    Gitlab,
    Cpu,
    RefreshCw,
    Wrench,
    FileSliders as Sliders,
    Layers
} from "lucide";

import type {
    IconNode
} from "lucide";

export interface Feature {
    icon: IconNode;
    title: string;
    description: string;
}

export const homeFeatures: Feature[] = [
    {
        icon: ShieldCheck,
        title: "Fully Independent",
        description: "Not derived from any other distribution. The base system is minimal and fully auditable."
    },

    {
        icon: Sliders,
        title: "Total Control",
        description: "Every package is compiled on your machine with your build flags. Nothing is hidden or pre-decided."
    },

    {
        icon: Layers,
        title: "Minimal by Design",
        description: "Start from a stage3 tarball and build only what you need. No bloat, no unwanted defaults."
    }
];

export const aboutHighlights: Feature[] = [
    {
        icon: Package,
        title: "Emerald & Ports",
        description: "Every package is built from source on your machine via the Emerald package manager and its ports tree."
    },

    {
        icon: Cpu,
        title: "x86_64 Only",
        description: "Vylen targets 64-bit exclusively. There is no support for 32-bit, ARM, or other architectures."
    },

    {
        icon: ShieldCheck,
        title: "No systemd",
        description: "Vylen uses OpenRC with ConsoleKit2 and seatd instead of systemd."
    },

    {
        icon: Terminal,
        title: "Stage3 Tarball",
        description: "No ISO images. Vylen ships a stage3 tarball with prebuilt base packages to bootstrap the system."
    },

    {
        icon: RefreshCw,
        title: "Rolling Release",
        description: "Repositories hold current versions, but avoid unstable or unverified package releases."
    },

    {
        icon: Wrench,
        title: "POSIX Shell Ports",
        description: "Package build templates resemble Arch's PKGBUILD and CRUX, but are written entirely in POSIX shell."
    },

    {
        icon: Gitlab,
        title: "Open Source",
        description: "All source code, ports, and build scripts are publicly available on GitLab."
    },

    {
        icon: Boxes,
        title: "Flatpak Optional",
        description: "Flatpak is supported as a fallback for applications missing from the Vylen repositories."
    }
];
