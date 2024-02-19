#!/bin/sh

echo "App is ready now!!"
npm run migrate
npm run test
echo "finished with exit code $?"
npm run start