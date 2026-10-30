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
    initScrollTop
} from "./lib/scrollTop";

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

import {
    renderDevelopment
} from "./pages/development";

const root: HTMLElement | null = document.getElementById("app");
if (!root) throw new Error("Root element #app not found");

const routes: Route[] = [
    {
        path: "/",
        render: renderHome
    },

    {
        path: "/about",
        title: "About",
        render: renderAbout
    },

    {
        path: "/download",
        title: "Download",
        render: renderDownload,
        mount: mountDownload
    },

    {
        path: "/development",
        title: "Development",
        render: renderDevelopment
    }
];

const notFoundRoute: Route = {
    path: "/404",
    title: "404",
    render: renderNotFound
};

const router: Router = new Router({
    routes,

    notFound: notFoundRoute,
    container: root,
    onNavigate: initHeader
});

initTheme();
initScrollTop();

router.start();
