#!/usr/bin/env bash

set -euo pipefail

if ! which bun ; then
    echo Bun needs to be installed before this setup can be executed
fi


git config diff.lockb.textconv bun
git config diff.lockb.binary true
