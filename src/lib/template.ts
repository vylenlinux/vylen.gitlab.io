import nunjucks, {
    runtime
} from "nunjucks";

import {
    iconToSvg
} from "./icon";

import type {
    IconNode
} from "lucide";

import layoutTpl from "../templates/layout.njk?raw";
import headerTpl from "../templates/partials/header.njk?raw";
import footerTpl from "../templates/partials/footer.njk?raw";
import homeTpl from "../templates/pages/home.njk?raw";
import aboutTpl from "../templates/pages/about.njk?raw";
import downloadTpl from "../templates/pages/download.njk?raw";
import notFoundTpl from "../templates/pages/notFound.njk?raw";
import SafeString = runtime.SafeString;

const templates: Record<string, string> = {
    "layout.njk": layoutTpl,
    "partials/header.njk": headerTpl,
    "partials/footer.njk": footerTpl,
    "pages/home.njk": homeTpl,
    "pages/about.njk": aboutTpl,
    "pages/download.njk": downloadTpl,
    "pages/notFound.njk": notFoundTpl
};

class MemoryLoader extends nunjucks.Loader {
    // noinspection JSUnusedGlobalSymbols
    getSource(name: string): nunjucks.LoaderSource {
        const src: string = templates[name];
        if (!src) throw new Error(`Template not found: ${name}`);

        return {
            src,

            path: name,
            noCache: true
        };
    }
}

const env: nunjucks.Environment = new nunjucks.Environment(new MemoryLoader(), {
    trimBlocks:   true,
    lstripBlocks: true,
    autoescape:   true
});

env.addFilter("icon", (icon: IconNode, size?: number): SafeString => {
    return new nunjucks.runtime.SafeString(iconToSvg(icon, size));
});

export function render(template: string, context: Record<string, unknown> = {}): string {
    return env.render(template, context);
}
