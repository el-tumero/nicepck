# nicepck

## Intro

A couple of scripts for using Webpack 5 in more friendly way.
Currently our Webpack config is made for Typescript, HTML, Pug, Scss, Tailwind

## Contents

1. [Quick start](#quick-start)
2. [Importing assets](#importing-assets)
    * [Images](#images)
    * [Fonts](#fonts)
3. [Multipage setup](#multipage-setup)
    * [Example setup](#example-setup)

<a href="#quick-start"></a>

## Quick start

### Basic setup

* Install with `npm install nicepck` or `yarn add nicepck`.
* Type `npm run pck init` or `yarn pck init`. This command will bring you to menu where you can select starter options for project (config files/template).
* You can optionally create config files and generate template via `npm run pck config` and `npm pck template` or `yarn pck config` and `yarn pck template`
* If you want to use the `.pug` extension instead of `.html` you need to change `"html"` to `"pug"` in the **`nice.config.json`** file:

```json
{
    "htmlTemplate": "pug"
}
```

* Add following scripts to the **`package.json`** file:

```json
    "scripts": {
        "dev": "pck",
        "build": "pck build"
    }
```

* `"dev"` - for development server with [HMR](https://webpack.js.org/concepts/hot-module-replacement/) enabled
* `"build"` - for bundling files to `dist` folder
* Then simply run `yarn dev` or `npm run dev` or `yarn build` or `npm run build`

<a href="#importing-assets"></a>

## Importing assets

<a href="#images"></a>

### Images

* HTML

```html
    <img src="<path_to_your_image>" />
```

* PUG

```js
    img(src=require("<path_to_your_image>"))
```

* CSS

```css
    #testDiv {
         background: url("<path_to_your_image>");
    }
```

* TypeScript

```ts
    import testImg from "<path_to_your_image>"
    const image = new Image()
    image.src = testImg
```
<a href="#fonts"></a>

### Fonts

* CSS

```css

@font-face {
    font-family: TestFont;
    src: url("<path_to_your_font>");
}

body {
    font-family: TestFont
}

```

<a href="#multipage-setup"></a>

## Multipage setup

In **`nice.config.json`** you can create new entries. For every new entry you need to create a `html` or `pug` file (depending on your setup) with the same name as .ts file.

<a href="#example-setup"></a>

### Example setup

* nice.config.js:

```json
{
  "htmlTemplate": "pug",
  "entries": [
    "./src/index.ts",
    "./src/other.ts",
  ]
}
```

* file structure:

```bash
src
├── assets
│   ├── fonts
│   │   └── Font.ttf
│   └── images
│       └── img.png
├── index.pug
├── index.ts
├── other.pug
├── other.ts
└── styles.scss
```

* index.pug:

```js
doctype html
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(http-equiv="X-UA-Compatible", content="IE=edge")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        title Welcome
    body 
        h1 NicePck Starter
        img(src=require("./assets/images/img.png"))
        a(href="./other.pug") Other
```

### Note
If you create an entry for example in <b>'./src/other/other.ts'</b> then to a use a link to a subpage you should include only a name of .html / .pug file in ``` <a> ``` tag:
```html
    <a href="other.html">Other</a>
```
#### Made with love by el-tumero