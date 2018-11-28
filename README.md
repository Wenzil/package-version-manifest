# package-version-manifest

Simple CLI to generate package version manifests

## Installation

```sh
yarn add --dev package-version-manifest
```

## Usage

### Basic example

```sh
yarn -s package-version-manifest [version]
```

By default, the version is printed out in the following format:

```
major=<x>
major=<y>
major=<z>
pre=[<pre1>.<pre2> ...]
```

This format is useful for [loading as environment variables in Bash](#loading-as-environment-variables-in-bash).

If no version is specified, the package version defined in `package.json` is
used.

### Writing to a file

```sh
yarn -s package-version-manifest > manifest.ini
```

### Loading as environment variables in Bash

```sh
source <(yarn -s package-version-manifest)
echo "Package version: $major.$minor.$patch (${pre:-final})"
```

### Output formats


```sh
yarn -s package-version-manifest -o json
```

The version is then printed in JSON:

```json
{"major":<x>,"minor":<y>,"patch":<z>,"pre":"<pre1>.<pre2> ..."}
```

### Extracting only the major, minor, patch version or pre-release suffix

```sh
yarn -s package-version-manifest -o major
yarn -s package-version-manifest -o minor
yarn -s package-version-manifest -o patch
yarn -s package-version-manifest -o pre
```