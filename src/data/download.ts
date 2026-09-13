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
        title: "Bootstrap notes",
        subtitle: "The project does not currently publish official minimum hardware requirements.",

        items: [
            {
                icon: Package,
                label: "RAM",
                value: "Depends on the build"
            },

            {
                icon: Terminal,
                label: "Disk",
                value: "Allow space for sources and packages"
            },

            {
                icon: Globe,
                label: "Network",
                value: "Required for downloads"
            }
        ]
    },

    {
        title: "Build considerations",
        subtitle: "Source builds can require substantially more resources than the rootfs itself.",

        items: [
            {
                icon: Package,
                label: "RAM",
                value: "More is better for parallel builds"
            },

            {
                icon: Terminal,
                label: "Disk",
                value: "Plan for source and build caches"
            },

            {
                icon: Globe,
                label: "Network",
                value: "Required for rootfs and port sources"
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
    subtitle: "Stage3-style rootfs tarball — a minimal base for bootstrapping a Vylen installation.",
    warning: "This is a minimal prebuilt base, not a ready-to-use system. Add packages and configuration after extracting it.",
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
    const baseUrl:     string = "https://sourceforge.net/projects/vylen/files/rootfs";
    const tarballName: string = tarball.replaceAll("%(version)", date);

    return {
        tarballUrl: `${baseUrl}/${date}/${tarballName}/download`,
        b3sumUrl:   `${baseUrl}/${date}/${tarballName}.b3sum/download`
    };
}
