import * as semver from "semver";
interface IManifest {
    major: number;
    minor: number;
    patch: number;
    pre: string;
}
export function buildManifest(version: string): IManifest {
    const coercedVersion = semver.coerce(version);
    if (coercedVersion === null) {
        throw new Error(`Invalid version: ${coercedVersion}`);
    } else {
        const prerelease = semver.valid(version)
            ? semver.prerelease(version)
            : null;
        return {
            major: semver.major(coercedVersion),
            minor: semver.minor(coercedVersion),
            patch: semver.patch(coercedVersion),
            pre: prerelease == null ? "" : prerelease.join("."),
        };
    }
}
