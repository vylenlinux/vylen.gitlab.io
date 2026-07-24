import {
    Gitlab,
    GitBranch,
    Download,

    type IconNode
} from "lucide";

export interface NavLink {
    label: string;
    path: string;
    external?: boolean;
}

export interface FooterLink {
    href: string;
    label: string;
    icon: IconNode;
}

export const logoUrl:  string = "https://gitlab.com/vylen/artworks/-/raw/main/png/round_colored.png";
export const portsUrl: string = "https://vylen.gitlab.io/packages";

export const navLinks: NavLink[] = [
    {
        label: "Home",
        path: "/"
    },

    {
        label: "About",
        path: "/about"
    },

    {
        label: "Download",
        path: "/download"
    },

    {
        label: "Ports",
        path: portsUrl,
        external: true
    }
];

export const footerLinks: FooterLink[] = [
    {
        href: "https://gitlab.com/vylen",
        label: "GitLab",
        icon: Gitlab
    },

    {
        href: "https://gitlab.com/vylen/ports",
        label: "Ports repository",
        icon: GitBranch
    },

    {
        href: "https://sourceforge.net/projects/vylen/files/rootfs/",
        label: "Downloads",
        icon: Download
    }
];
