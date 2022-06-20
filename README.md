# nicepck

## Intro

A couple of scripts to use Webpack 5 in more friendly way.
Simply create src folder and place there:

* .html file
* .ts file
* .scss file

In root folder place:

* tsconfig.json file

### Prefered options for tsconfig.json

```json
{
    "compilerOptions": {
      "allowSyntheticDefaultImports": true,
      "noImplicitAny": true,
      "module": "es6",
      "target": "es5",
      "allowJs": true
    },
    "files": ["src/index.ts"]
  }
  
```

## How to use

* place `import '<file_name>.scss'` in .ts file
* in package.json create script `"scripts":{ "dev": "pck"}` for development server with HMR enabled
* in package.json create script `"scripts":{ "build": "pck build"}` for bundling files to `dist` folder
* simply run `yarn dev` or `npm run dev` or `yarn build` or `npm run build`

## Future plans

* npx script for creating basic template for project
