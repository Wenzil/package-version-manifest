import test from "ava";
import { exec } from "child_process";
import * as semver from "semver";
import { Transform } from "stream";

// tslint:disable-next-line no-var-requires
const { version: packageVersion } = require("../package.json");

test.cb("Outputs the given version", t => {
    t.plan(1);
    exec("ts-node src/index.ts 1.2.3")
        .stdout.pipe(collect())
        .on("data", collected => {
            t.deepEqual(
                collected.toString(),
                "major=1\nminor=2\npatch=3\npre=\n",
            );
        })
        .on("error", t.end)
        .on("end", t.end);
});

test.cb("Outputs the package version by default", t => {
    t.plan(1);
    const prerelease = semver.prerelease(packageVersion);
    exec("ts-node src/index.ts")
        .stdout.pipe(collect())
        .on("data", collected => {
            t.deepEqual(
                collected.toString(),
                [
                    `major=${semver.major(packageVersion)}`,
                    `minor=${semver.minor(packageVersion)}`,
                    `patch=${semver.patch(packageVersion)}`,
                    `pre=${prerelease === null ? "" : prerelease.join(".")}`,
                ]
                    .join("\n")
                    .concat("\n"),
            );
        })
        .on("error", t.end)
        .on("end", t.end);
});

function collect() {
    let collected = Buffer.from([]);
    return new Transform({
        transform(data, encoding, callback) {
            collected = Buffer.concat([collected, data]);
            callback();
        },
        flush(callback) {
            this.push(collected);
            callback();
        },
    });
}
