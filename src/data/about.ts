import {
    Box,
    Code2,
    Cpu,
    Layers,
    Package,
    Settings,

    type IconNode
} from 'lucide';

export interface Highlight {
    title: string;
    description: string;
    icon: IconNode;
}

export interface Principle {
    title: string;
    text: string;
}

export const highlights: Highlight[] = [
    {
        title: "Source-based",
        description: "Ports are built from source on your own machine.",
        icon: Code2
    },

    {
        title: "Own package manager",
        description: "Emerald resolves dependencies, verifies checksums, builds and installs packages.",
        icon: Package
    },

    {
        title: "Prebuilt base",
        description: "A stage3-style rootfs tarball to bootstrap your system. No ISO images are published.",
        icon: Box
    },

    {
        title: "SystemD",
        description: "Services are managed with systemd, the standard init system and service manager.",
        icon: Settings
    },

    {
        title: "x86_64",
        description: "The current rootfs release targets the x86_64 architecture.",
        icon: Cpu
    },

    {
        title: "Public ports",
        description: "Ports repositories are open, so you can read, change and extend the build recipes.",
        icon: Layers
    }
];

export const principles: Principle[] = [
    {
        title: "Source code first",
        text: "Packages are built from upstream source on your machine. Build scripts list the source and the checksums it must match."
    },

    {
        title: "Project-owned infrastructure",
        text: "The project maintains Emerald, the ports, the rootfs releases and its tools in its GitLab group."
    },

    {
        title: "Readable build scripts",
        text: "Build scripts are plain text. Options are set per package."
    },

    {
        title: "For experienced users",
        text: "You read build scripts, edit configuration and fix failed builds yourself."
    }
];
