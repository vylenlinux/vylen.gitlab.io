import {
    Code2,
    ExternalLink,
    Github,
    Gitlab,
    Mail,
    Users,
    UserRound,

    type IconNode
} from "lucide";

import JSON5 from "json5";

import {
    render
} from "../lib/template";

import {
    renderShell
} from "./shell";

interface Developer {
    name: string;
    role: string;
    image?: string;

    contacts?: {
        github?: string;
        gitlab?: string;
        codeberg?: string;
        email?: string;
    };
}

interface DeveloperLink {
    label: string;
    url: string;
    icon: IconNode;
    external: boolean;
}

export function renderDevelopers(currentPath: string): string {
    const content: string = render("pages/developers.njk");

    return renderShell({
        content,
        currentPath
    });
}

export function mountDevelopers(): void {
    const list: HTMLElement | null = document.querySelector<HTMLElement>("[data-developers-list]");
    if (!list) return;

    void fetch("/developers.json5").then(async (response: Response): Promise<Developer[]> => {
        if (!response.ok) throw new Error(`Developer data request failed: ${response.status}`);
        return JSON5.parse(await response.text()) as Developer[];
    }).then((developers: Developer[]): void => {
        list.innerHTML = ((developers.length > 0) ? developers.map((developer: Developer, index: number): string => renderDeveloperCard(developer, (index + 1))).join("") : render("partials/developers-empty.njk", {
            icon: Users
        }));
    }).catch((): void => {
        list.innerHTML = render("partials/developers-error.njk", {
            icon: Mail
        });
    });
}

function renderDeveloperCard(developer: Developer, index: number): string {
    const links: DeveloperLink[] = [
        createExternalLink(developer.contacts?.github, "GitHub", Github),
        createExternalLink(developer.contacts?.gitlab, "GitLab", Gitlab),
        createExternalLink(developer.contacts?.codeberg, "Codeberg", Code2),
        createEmailLink(developer.contacts?.email)
    ].filter((link: DeveloperLink | null): link is DeveloperLink => (link !== null));

    return render("partials/developer-card.njk", {
        developer: {
            name: developer.name,
            role: developer.role,
            image: sanitizeImageUrl(developer.image ?? "")
        },

        index: String(index).padStart(2, "0"),
        avatarIcon: UserRound,
        externalIcon: ExternalLink,
        links
    });
}

function createExternalLink(url: string | undefined, label: string, icon: IconNode): DeveloperLink | null {
    if (!url) return null;

    return {
        label,
        url: sanitizeUrl(url),
        icon,
        external: true
    };
}

function createEmailLink(email: string | undefined): DeveloperLink | null {
    if (!email) return null;

    return {
        label: "Email",
        url: sanitizeEmail(email),
        icon: Mail,
        external: false
    };
}

function sanitizeUrl(value: string): string {
    return (/^https:\/\//i.test(value) ? value : "#");
}

function sanitizeImageUrl(value: string): string {
    return (/^(https?:\/\/|\/)/i.test(value) ? value : "");
}

function sanitizeEmail(value: string): string {
    return (/^mailto:/i.test(value) ? value : "#");
}
