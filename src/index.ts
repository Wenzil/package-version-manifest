#!/usr/bin/env node
import * as path from "path";
import * as yargs from "yargs";
import { buildManifest } from "./parser";

// tslint:disable-next-line no-var-requires
const { version: packageVersion } = require(path.join(
    process.cwd(),
    "package.json",
));

// tslint:disable-next-line no-unused-expression
yargs
    .command(
        "$0 [source_version]",
        "Generate a package version manifest from a SemVer version",
        argv =>
            argv
                .positional("source_version", {
                    default: packageVersion,
                    description: "Semver version to parse",
                    type: "string",
                })
                .option("format", {
                    alias: "o",
                    choices: ["ini", "major", "minor", "patch", "pre"],
                    default: "ini",
                    description: "Output format",
                }),
        ({ source_version, format }) => {
            const { major, minor, patch, pre } = buildManifest(source_version);
            switch (format) {
                case "ini":
                    console.log(`major=${major}`);
                    console.log(`minor=${minor}`);
                    console.log(`patch=${patch}`);
                    console.log(`pre=${pre}`);
                    break;
                case "major":
                    console.log(major);
                    break;
                case "minor":
                    console.log(minor);
                    break;
                case "patch":
                    console.log(patch);
                    break;
                case "pre":
                    console.log(pre);
                    break;
            }
        },
    )
    .help().argv;
