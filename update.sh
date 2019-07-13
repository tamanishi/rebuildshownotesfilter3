#!/bin/sh
. ./.apienv
yarn build
curl ${API_ENDPOINT} --header "x-api-key:${API_KEY}" >| ./docs/json/episodes.json
cp -f ./docs/json/episodes.json ./public/json/episodes.json
git add ./docs/json/episodes.json
git add ./docs/
git commit -m "update shownotes"
git push origin master
