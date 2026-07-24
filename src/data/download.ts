import {
    Terminal,
    Package,
    Globe
} from "lucide";

import type {
    IconNode
} from "lucide";

export interface RequirementSet {
    icon: IconNode;
    label: string;
    value: string;
}

export interface RequirementTier {
    title: string;
    subtitle: string;
    items: RequirementSet[];
}

export const requirementTiers: RequirementTier[] = [
    {
        title: "Minimum",
        subtitle: "Enough to bootstrap the stage3 tarball and build a basic system.",

        items: [
            {
                icon: Package,
                label: "RAM",
                value: "512 MB"
            },

            {
                icon: Terminal,
                label: "Disk",
                value: "1 GB"
            },

            {
                icon: Globe,
                label: "Network",
                value: "Required for stage3 download"
            }
        ]
    },

    {
        title: "Recommended",
        subtitle: "Comfortable builds and a smoother experience compiling packages from source.",

        items: [
            {
                icon: Package,
                label: "RAM",
                value: "2 GB+"
            },

            {
                icon: Terminal,
                label: "Disk",
                value: "10 GB+"
            },

            {
                icon: Globe,
                label: "Network",
                value: "Required for stage3 and port sources"
            }
        ]
    }
];

export const downloadInfo: {
    title:    string;
    subtitle: string;
    warning:  string;
    jsonPath: string;
} = {
    title: "Download Vylen Linux",
    subtitle: "Stage3 tarball — a minimal base system to bootstrap a full Vylen installation.",
    warning: "This is a minimal base, not a ready-to-use system. The rest is built and configured from source.",
    jsonPath: "https://gitlab.com/api/v4/projects/vylen%2Frootfs/repository/files/release.json/raw"
};

export interface LatestRelease {
    date:    string;
    tarball: string;
    b3sum:   string;
}

export function buildDownloadUrls(date: string, tarball: string): {
    tarballUrl: string;
    b3sumUrl:   string;
} {
    const baseUrl: string = "https://sourceforge.net/projects/vylen/files/rootfs";

    return {
        tarballUrl: `${baseUrl}/${date}/${tarball}/download`,
        b3sumUrl:   `${baseUrl}/${date}/${tarball}.b3sum/download`
    };
}
