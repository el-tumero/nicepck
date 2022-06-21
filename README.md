# nicepck

## Intro

A couple of scripts for using Webpack 5 in more friendly way.
Currently our Webpack config is made for Typescript / Pug / Scss / Tailwind

* Install it with `npm` or `yarn`.
* Then just type `npm run pck init` or `yarn pck init`. This command will create nessesary config files.
* Generate template via `npm run pck template` or `yarn pck template`

## Bundler

* in package.json create script `"scripts":{ "dev": "pck"}` for development server with HMR enabled
* in package.json create script `"scripts":{ "build": "pck build"}` for bundling files to `dist` folder
* simply run `yarn dev` or `npm run dev` or `yarn build` or `npm run build`

