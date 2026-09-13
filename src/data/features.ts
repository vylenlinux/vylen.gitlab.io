import {
    Package,
    Terminal,
    ShieldCheck,
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
        title: "Independent tooling",
        description: "Vylen develops and publishes its own package, ports, and rootfs projects rather than presenting a preconfigured desktop image."
    },

    {
        icon: Sliders,
        title: "Build-time control",
        description: "Emerald builds ports from source and exposes the build configuration so users can inspect and adjust the process."
    },

    {
        icon: Layers,
        title: "Minimal by design",
        description: "Start from the published rootfs and add the software and configuration needed for your system."
    }
];

export const aboutHighlights: Feature[] = [
    {
        icon: Package,
        title: "Emerald & Ports",
        description: "Emerald provides the package workflow, while the public ports repositories contain the build definitions used by Vylen."
    },

    {
        icon: Cpu,
        title: "x86_64 rootfs",
        description: "The published rootfs release is an x86_64 tarball. Other architecture targets are not documented by the current release metadata."
    },

    {
        icon: ShieldCheck,
        title: "No systemd",
        description: "Vylen uses OpenRC for init and service management rather than systemd."
    },

    {
        icon: Terminal,
        title: "Stage3 Tarball",
        description: "The project publishes a stage3-style rootfs tarball with a prebuilt base for bootstrapping, not a ready-to-use desktop installation."
    },

    {
        icon: RefreshCw,
        title: "Rolling updates",
        description: "Packages and rootfs releases are published independently; check the repositories and release metadata for current versions."
    },

    {
        icon: Wrench,
        title: "POSIX Shell Ports",
        description: "Emerald's port build workflow uses shell-based build definitions and follows a PKGBUILD-inspired layout."
    },

    {
        icon: Package,
        title: "Open source projects",
        description: "The package manager, ports, rootfs metadata, and supporting projects are published in the Vylen GitLab group."
    }
];
