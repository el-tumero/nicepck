# nicepck

## Intro

A couple of scripts for using Webpack 5 in more friendly way.
Currently our Webpack config is made for Typescript, Pug, Scss, Tailwind

* Install it with `npm` or `yarn`.
* Then just type `npm run pck init` or `yarn pck init`. This command will create nessesary config files.
* Generate template via `npm run pck template` or `yarn pck template`
* If you want to use .html instead of .pug file you need to change "pug" to "html in nice.config.json file:

```json
{
    "htmlTemplate": "html"
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

## Next steps

### Using images

* PUG

```js
    img(src=require("<path_to_your_image>"))
```

* HTML

```html
    <img src="<path_to_your_image>" />
```

* CSS

```css
    #testDiv{
         background: url("<path_to_your_image>");
    }
```

* TypeScript

```ts
    import testImg from "<path_to_your_image>"
    const image = new Image()
    image.src = testImg
```

### Using fonts

* CSS

```css

@font-face {
    font-family: TestFont;
    src: url("<path_to_your_font>");
}

body{
    font-family: TestFont
}

```
