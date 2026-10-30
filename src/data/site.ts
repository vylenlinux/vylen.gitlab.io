export interface NavLink {
    label: string;
    path: string;
    external?: boolean;
}

export const logoUrl: string = "https://gitlab.com/vylen/artworks/-/raw/main/png/round_colored.png";
export const portsUrl: string = "https://vylen.gitlab.io/packages";
export const wikiUrl: string = "https://vylen.gitlab.io/wiki";
export const gitlabGroupUrl: string = "https://gitlab.com/vylen";
export const portsRepoUrl: string = "https://gitlab.com/vylen/ports";

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
        label: "Development",
        path: "/development"
    },

    {
        label: "Ports",
        path: portsUrl,
        external: true
    },

    {
        label: "Wiki",
        path: wikiUrl,
        external: true
    }
];

export const sourceLinks: NavLink[] = [
    {
        label: "GitLab group",
        path: gitlabGroupUrl,
        external: true
    },

    {
        label: "Ports repository",
        path: portsRepoUrl,
        external: true
    }
];
