export interface Principle {
    number: string;
    title:  string;
    text:   string;
}

export const principles: Principle[] = [
    {
        number: "01",
        title: "Source over binary",
        text: "Every package is compiled from source on your machine. You see what goes in, control how it's built, and own the result."
    },

    {
        number: "02",
        title: "Independence",
        text: "Not derived from Debian, Arch, CRUX, or any other distribution. The toolchain and base system are built from scratch."
    },

    {
        number: "03",
        title: "No systemd",
        text: "Vylen uses OpenRC for init and service management, with ConsoleKit2 and seatd for seat management."
    },

    {
        number: "04",
        title: "User sovereignty",
        text: "Built for experienced users who want to construct their system by hand, without prebuilt binary packages."
    }
];
