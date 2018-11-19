# package-version-manifest

Simple CLI to generate package version manifests

## Installation

```sh
yarn add --dev package-version-manifest
```

## Usage

### Writing to a file

```sh
yarn package-version-manifest > manifest.txt
```

The output format is the following

```
major=<x>
major=<y>
major=<z>
pre=[<pre1>.<pre2> ...]
```

For example, a package version of `1.2.3-beta.1` will result in

```
major=1
major=2
major=3
pre=beta.1
```

### Loading as environment variables

source <(yarn -s package-version-manifest)
echo "Package version: $major.$minor.$patch (${pre:-final})"
