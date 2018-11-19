import test from "ava";
import { buildManifest } from "./index";

test("Returns the major, minor and patch versions separately", t => {
    const manifest = buildManifest("1.2.3");
    t.deepEqual(manifest, { major: 1, minor: 2, patch: 3, pre: "" });
});

test("Returns pre-release string if any", t => {
    const manifest = buildManifest("2.0.0-beta.1");
    t.deepEqual(manifest, { major: 2, minor: 0, patch: 0, pre: "beta.1" });
});
