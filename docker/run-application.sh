#!/bin/sh

echo "App is ready now!!"
npm run migrate
echo "finished with exit code $?"
npm run start