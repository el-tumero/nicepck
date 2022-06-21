#! /usr/bin/env node
const Webpack = require("webpack")
const WebpackDevServer = require("webpack-dev-server")
const webpackConfig = require("../webpack.config.js")
const clc = require("cli-color")
const fs = require("fs")
const path = require("path")
const configs = require("./default-configs.json")


const mode = process.argv[2]

const configFileNames = ['postcss.config.js', 'tailwind.config.js', 'tsconfig.json']


const compiler = Webpack(webpackConfig)

if(mode == "init"){
    console.log(clc.blue("Creating config files:"))
    configFileNames.forEach(fileName => {
        if(configs[fileName]){
            fs.writeFile("./" + fileName, JSON.stringify(configs[fileName], null, 2), err => {
                if(err) throw err
                console.log(clc.yellow(fileName) + " created!")
            } )

        }else{
                fs.copyFile(path.join(__dirname, "../default-configs/") + fileName, './' + fileName, err => {
                if(err) throw err
                console.log(clc.yellow(fileName) + " created!")
        })
        }
    }) 
}

if(!mode || mode == "serve"){
    const devServerOptions = { ...webpackConfig.devServer, open: true };
    const server = new WebpackDevServer(devServerOptions, compiler);

    server.startCallback(() => {
        console.log('Server running on http://localhost:1234');
    });
}

if(mode == "watch"){
    compiler.watch({
        aggregateTimeout: 300,
        poll: undefined
      }, (err, stats) => {

        if(stats.hasErrors()) printErrors(stats)

      });
}

if(mode === "build"){
    compiler.run((err, stats) => {
        if(stats.hasErrors()) printErrors(stats) 
    })
}

function printErrors(stats){
    const errors = stats.toJson().errors
    const errorsCount = stats.toJson().errorsCount
    console.log(clc.red(errorsCount + " error(s)!"))
    
    errors.forEach(error => {
        console.log("file:" + clc.yellow(error.moduleId))
        console.log(error.message)
    })
}