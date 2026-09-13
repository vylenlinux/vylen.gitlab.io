export interface Principle {
    title:  string;
    text:   string;
}

export const principles: Principle[] = [
    {
        title: "Source over binary",
        text: "Vylen provides a source-based package workflow through Emerald and its ports tree. The bootstrap rootfs is distributed separately as a prebuilt base."
    },

    {
        title: "Independent tooling",
        text: "Vylen maintains its own package manager, ports repositories, rootfs releases, and supporting system projects on GitLab."
    },

    {
        title: "No systemd",
        text: "Vylen uses OpenRC for init and service management rather than systemd."
    },

    {
        title: "User sovereignty",
        text: "The project is aimed at experienced users who want to assemble and configure their system by hand."
    }
];
