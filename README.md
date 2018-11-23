# package-version-manifest

Simple CLI to generate package version manifests

## Installation

```sh
yarn add --dev package-version-manifest
```

## Usage

### Basic example

```sh
source <(yarn -s package-version-manifest [version])
```

By default, the version is printed out in the following format:

```
major=<x>
major=<y>
major=<z>
pre=[<pre1>.<pre2> ...]
```

If no version is specified, the package version defined in `package.json` is
used.

### Writing to a file

```sh
yarn -s package-version-manifest > manifest.txt
```

The output format is the following
For example, a package version of `1.2.3-beta.1` will result in

```
major=1
major=2
major=3
pre=beta.1
```

### Loading as environment variables

```sh
source <(yarn -s package-version-manifest)
echo "Package version: $major.$minor.$patch (${pre:-final})"
```

### Extracting only the major, minor, patch version or pre-release suffix

```sh
source <(yarn -s package-version-manifest -o major)
source <(yarn -s package-version-manifest -o minor)
source <(yarn -s package-version-manifest -o patch)
source <(yarn -s package-version-manifest -o pre)
```