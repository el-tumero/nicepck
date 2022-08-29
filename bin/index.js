#! /usr/bin/env node
const Webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NiceWebpackMessages = require(path.join(__dirname, "../plugin/NiceWebpackMessages"))
const webpackConfig = require("../webpack.config.js")
const clc = require("cli-color")
const fs = require("fs")
const commands = require("./commands")

const mode = process.argv[2]
const isBundling = mode === undefined || mode === "serve" || mode === "build"
const isDevServerRunning = mode === undefined || mode === "serve"

const devServerPort = 1234


fs.readFile("./nice.config.json", async(err,data) => {
    if(err && isBundling){
        console.log(clc.red("nice.config.json file is not created :("))
        return
    } 
  
    if(err && !isBundling) init()

    if(data) handleConfig(await JSON.parse(data))
    
})

function handleConfig(configFile){
    let fileExt = "html" // html by default
    let port
    if(configFile.htmlTemplate === "pug") fileExt = "pug"

    if(isBundling) console.log(fileExt + " file set!")

    if(configFile.htmlTemplate)
    configFile.entries.forEach(entry => {
        const splitedEntry = entry.split("/")
        const name = splitedEntry[splitedEntry.length - 1].split(".")[0]
        webpackConfig.entry[name] = entry

        const templatePath = path.join(".", entry).replace('.ts', '.' + fileExt)

        webpackConfig["plugins"].push(
        new HtmlWebpackPlugin({
            inject: true,
            chunks: [name],
            filename: name + '.' + "html",
            template:  templatePath
        })
        )

    })

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

module.exports = {
    handleConfig
}



