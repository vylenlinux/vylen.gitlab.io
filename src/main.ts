import "./styles/main.css";

import {
    Router,
    type Route
} from "./lib/router";

import {
    initTheme
} from "./lib/theme";

import {
    initHeader
} from "./lib/header";

import {
    renderHome
} from "./pages/home";

import {
    renderAbout
} from "./pages/about";

import {
    renderDownload,
    mountDownload
} from "./pages/download";

import {
    renderNotFound
} from "./pages/notFound";

const root: HTMLElement | null = document.getElementById("app");
if (!root) throw new Error("Root element #app not found");

const routes: Route[] = [
    {
        path: "/",
        title: "Vylen Linux — Independent Source-Based Distribution",

        render: (path: string): string => renderHome(path)
    },

    {
        path: "/about",
        title: "About — Vylen Linux",

        render: (path: string): string => renderAbout(path)
    },

    {
        path: "/download",
        title: "Download — Vylen Linux",

        render: (path: string): string => renderDownload(path),
        mount: mountDownload
    }
];

const notFoundRoute: Route = {
    path: "/404",
    title: "404 — Vylen Linux",

    render: (path: string): string => renderNotFound(path)
};

const router: Router = new Router({
    routes,

    notFound: notFoundRoute,
    container: root,
    onNavigate: initHeader
});

initTheme();
router.start();
