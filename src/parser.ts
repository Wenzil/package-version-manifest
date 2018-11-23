import * as semver from "semver";
interface IManifest {
    major: number;
    minor: number;
    patch: number;
    pre: string;
}
export function buildManifest(version: string): IManifest {
    if (semver.valid(version) === null) {
        throw new Error(`Invalid version: ${version}`);
    } else {
        const prerelease = semver.prerelease(version);
        return {
            major: semver.major(version),
            minor: semver.minor(version),
            patch: semver.patch(version),
            pre: prerelease == null ? "" : prerelease.join("."),
        };
    }
}
