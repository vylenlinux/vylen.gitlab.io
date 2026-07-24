import {
    ArrowUp
} from "lucide";

import {
    iconToSvg
} from "./icon";

const VISIBLE_OFFSET: number = 400;
const VISIBLE_CLASS: string = "scroll-top--visible";

let initialized: boolean = false;

export function initScrollTop(): void {
    if (initialized) return;
    initialized = true;

    const button: HTMLButtonElement = document.createElement("button");
    button.type = "button";
    button.className = "scroll-top";
    button.setAttribute("aria-label", "Scroll to top");
    button.innerHTML = iconToSvg(ArrowUp, 22);

    button.addEventListener("click", (): void => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    document.body.appendChild(button);

    const toggle: () => void = (): void => {
        if (window.scrollY >= VISIBLE_OFFSET) {
            button.classList.add(VISIBLE_CLASS);
            return;
        }

        button.classList.remove(VISIBLE_CLASS);
    };

    toggle();

    window.addEventListener("scroll", toggle, {
        passive: true
    });
}
