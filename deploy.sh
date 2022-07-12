#!/usr/bin/env bash

set -e

git fetch origin gh-pages
git checkout gh-pages
git fetch origin main
git reset --hard origin/main
npm run build
rm -rf ./docs && mv build docs
git add . && git commit -m "Build"
git push origin gh-pages --force && git checkout main

echo "Done. See the deploy progress here: https://github.com/mobx-cookbook/mobx-cookbook.github.io/commits/gh-pages"