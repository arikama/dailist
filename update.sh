#!/bin/bash

BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$BRANCH" != "master" ]]
then
  echo 'need to be in master branch'
  exit 1
fi

node "./update.js" $1
if [ $? -eq 0 ]
then
  git add -A
  git commit -m "update to v$1"
  git tag -a --message="dailist v$1" "v$1"
  git checkout develop
  git merge master
  git checkout master
else
  echo "update failed"
fi
