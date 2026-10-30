export interface LatestRelease {
    date:    string;
    tarball: string;
    b3sum:   string;
}

function resolveVersionTemplate(value: string, version: string): string {
    return value.replaceAll("%(version)", version);
}

export function buildDownloadUrls(release: LatestRelease): {
    tarballUrl: string;
    b3sumUrl:   string;
} {
    return {
        tarballUrl: resolveVersionTemplate(release.tarball, release.date),
        b3sumUrl:   resolveVersionTemplate(release.b3sum,   release.date)
    };
}
