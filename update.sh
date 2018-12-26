yarn build
curl http://rebuildshownotesjson.herokuapp.com/episodes >| ./docs/json/episodes.json
git add ./docs/json/episodes.json
git commit -m "update shownotes"
git push origin master
