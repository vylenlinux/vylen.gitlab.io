export interface Route {
    path: string;
    title?: string;
    render: (currentPath: string) => string;
    mount?: () => void;
}

export interface RouterOptions {
    routes: Route[];
    container: HTMLElement;
    onNavigate?: () => void;
    notFound?: Route;
}

export class Router {
    private routes: Map<string, Route>;
    private container: HTMLElement;
    private readonly onNavigate?: () => void;
    private readonly notFoundRoute?: Route;

    constructor(options: RouterOptions) {
        this.routes = new Map(options.routes.map((r: Route): [string, Route] => [r.path, r]));
        this.container = options.container;
        this.onNavigate = options.onNavigate;
        this.notFoundRoute = options.notFound;
    }

    start(): void {
        window.addEventListener("hashchange", (): void => this.handleRoute());
        this.handleRoute();
    }

    private handleRoute(): void {
        const hash: string = (window.location.hash.slice(1) || "/");
        const route: Route | undefined = (this.routes.get(hash) ?? this.notFoundRoute ?? this.routes.get("/"));
        if (!route) return;

        document.title = (route.title ? `${route.title} | Vylen Linux` : "Vylen Linux");
        this.container.innerHTML = route.render(hash);
        this.onNavigate?.();

        route.mount?.();

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    }
}
