# nicepck

## Intro

A couple of scripts for using Webpack 5 in more friendly way.
Currently our Webpack config is made for Typescript, Pug, Scss, Tailwind

* Install it with `npm` or `yarn`.
* Then just type `npm run pck init` or `yarn pck init`. This command will create nessesary config files.
* Generate template via `npm run pck template` or `yarn pck template`
* If you want to use .html instead of .pug file you need to create in project root folder file called nice.config.json and copy this code:

```json
{
    "htmlTemplate": "html
}
```

## Bundler

* In package.json create following scripts:

```json
    "scripts": {
        "dev": "pck",
        "build": "pck build"
    }
```

* `"dev"` for development server with HMR enabled
* `"build"`  for bundling files to `dist` folder
* Then simply run `yarn dev` or `npm run dev` or `yarn build` or `npm run build`
