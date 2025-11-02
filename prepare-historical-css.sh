#!/usr/bin/env bash
set -e

# 1. Build fresh assets
vite build

# 2. Ensure archive folder exists
mkdir -p public/historical-css

# 3. Copy ALL built CSS fingerprints into archive
cp dist/assets/*.css public/historical-css/
