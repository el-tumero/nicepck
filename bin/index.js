#! /usr/bin/env node
const Webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NiceWebpackMessages = require('../plugin/NiceWebpackmessages')
const webpackConfig = require("../webpack.config.js")
const clc = require("cli-color")
const fs = require("fs")
const commands = require("./commands")

const mode = process.argv[2]
const isBundling = mode === undefined || mode === "serve" || mode === "build"
const isDevServerRunning = mode === undefined || mode === "serve"

const devServerPort = 1234


fs.readFile("./nice.config.json", async(err,data) => {
    if(err && isBundling) console.log(clc.green("nice.config.json file is not created, but it's all fine :)"))
    if(!data) {
        handleConfig({})
        return
    }
    handleConfig(await JSON.parse(data))
})

function handleConfig(configFile){
    let fileExt = "pug" // pug by default
    let port
    if(configFile.htmlTemplate === "html") fileExt = "html"
    if(isBundling) console.log(fileExt + " file set!")
    webpackConfig["plugins"].push(
        new HtmlWebpackPlugin({
        template: './src/index.' + fileExt,
        })
    )

    webpackConfig["devServer"].port = devServerPort // setting the dev server port 

    if(isDevServerRunning) port = devServerPort

    webpackConfig["plugins"].push(
        new NiceWebpackMessages(port)
    )
    init()
}

function init(){
    const compiler = Webpack(webpackConfig)
    commands.runCommands(compiler, mode, webpackConfig)
}



