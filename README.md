# Travle

This is a personal project recreating [travle.earth](https://travle.earth) website.

## Getting started a new project with this boilerplate

1. Clone this repo
2. Search for `boilerplate` occurences and replace with your project name. Use the same value everywhere and prefer pascal case
3. Copy files env.sample into .env (in app and api folders) and fill with appropriates values
4. run `npm install` in root folder, app, api and shared

## Run the app

You'll need to run 3 terminals

1. You'll need to transpile typescript from shared resources : `cd shared ; npm run dev`
2. You'll need to run the api : `cd api ; npm start`
3. You'll need to run the app : `cd app ; npm start`
