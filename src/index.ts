import * as path from "path";
import * as semver from "semver";

// tslint:disable-next-line no-var-requires
const { version: packageVersion } = require(path.join(
    process.cwd(),
    "package.json",
));
const { major, minor, patch, pre } = buildManifest(packageVersion);
console.log(`major=${major}`);
console.log(`minor=${minor}`);
console.log(`patch=${patch}`);
console.log(`pre=${pre}`);
interface IManifest {
    major: number;
    minor: number;
    patch: number;
    pre: string;
}
export function buildManifest(version: string): IManifest {
    const prerelease = semver.prerelease(version);
    return {
        major: semver.major(version),
        minor: semver.minor(version),
        patch: semver.patch(version),
        pre: prerelease == null ? "" : prerelease.join("."),
    };
}
