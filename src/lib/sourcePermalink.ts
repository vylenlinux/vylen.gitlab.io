type SourceView = "tree" | "blob" | "raw";

interface SourcePermalink {
    repo: string;
    packageName: string;
    view: SourceView;
    fileName: string;
}

const safeSegment: RegExp = /^[A-Za-z0-9][A-Za-z0-9._+-]{0,127}$/;
const allowedParameters: Set<string> = new Set(["repo", "package", "view", "file"]);

function hasPermalinkParameters(params: URLSearchParams): boolean {
    return [...allowedParameters].some((key: string): boolean => params.has(key));
}

function parsePermalink(params: URLSearchParams): SourcePermalink | null {
    const hasExtraParameter: boolean = [...params.keys()].some((key: string): boolean => !allowedParameters.has(key));
    const hasRepeatedParameter: boolean = [...allowedParameters].some((key: string): boolean => params.getAll(key).length > 1);
    if (hasExtraParameter || hasRepeatedParameter) return null;

    const repo: string = (params.get("repo") ?? "");
    const packageName: string = (params.get("package") ?? "");
    if (!safeSegment.test(repo) || !safeSegment.test(packageName)) return null;

    const requestedView: string | null = params.get("view");
    const defaultView: SourceView = params.has("file") ? "blob" : "tree";
    const view: SourceView = ((requestedView === "blob") || (requestedView === "raw") ? requestedView : ((requestedView === null) ? defaultView : "tree"));
    const fileName: string = (params.get("file") ?? "build.eme");
    if (!safeSegment.test(fileName)) return null;

    return {
        repo,
        packageName,
        view,
        fileName
    };
}

function buildDestinations(repo: string, packageName: string, fileName: string = "build.eme"): Record<SourceView, string> {
    const branch: string = "main";
    const projectUrl: string = `https://codeberg.org/vylen/${encodeURIComponent(repo)}`;
    const packagePath: string = encodeURIComponent(packageName);
    const filePath: string = encodeURIComponent(fileName);
    const packageUrl: string = `${projectUrl}/src/branch/${branch}/${packagePath}`;

    return {
        tree: packageUrl,
        blob: `${packageUrl}/${filePath}`,
        raw: `${projectUrl}/raw/branch/${branch}/${packagePath}/${filePath}`
    };
}

function showInvalidPermalink(root: HTMLElement): void {
    root.textContent = "Invalid package permalink";
    document.title = "Invalid permalink | Vylen Linux";
}

export function handleSourcePermalink(root: HTMLElement): boolean {
    const params: URLSearchParams = new URLSearchParams(window.location.search);
    if (!hasPermalinkParameters(params)) return false;

    const permalink: SourcePermalink | null = parsePermalink(params);

    if (!permalink) {
        showInvalidPermalink(root);
        return true;
    }

    const destinations: Record<SourceView, string> = buildDestinations(permalink.repo, permalink.packageName, permalink.fileName);
    window.location.replace(destinations[permalink.view]);

    return true;
}
