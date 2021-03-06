const clc = require("cli-color")
const path = require("path")
const configs = require("./default-configs.json");
const fs = require("fs")
const WebpackDevServer = require("webpack-dev-server")

const configFileNames = ['postcss.config.js', 'tailwind.config.js', 'tsconfig.json', 'nice.config.json']

function runCommands(compiler, mode, webpackConfig){
    if(mode == "template"){
        console.log(clc.yellow("Creating template in src folder!"))
    
        fs.mkdir("./src", err => {
            if(err) throw err
        })
    
        fs.readdir(path.join(__dirname, '../template'), (err, files) => {
            if(err) throw err
            files.forEach(file => {
                fs.copyFile(path.join(__dirname, '../template/' + file) , "./src/" + file, err => {
                    if(err) throw err
                })
            })
        })
    
    }
    
    if(mode == "init"){
        console.log(clc.blue("Creating config files:"))
        configFileNames.forEach(fileName => {
            if(configs[fileName]){
                fs.writeFile("./" + fileName, JSON.stringify(configs[fileName], null, 2), err => {
                    if(err) throw err
                    console.log(clc.yellow(fileName) + " created!")
                } )
    
            }else{
                    fs.copyFile(path.join(__dirname, "../configs/") + fileName, './' + fileName, err => {
                    if(err) throw err
                    console.log(clc.yellow(fileName) + " created!")
            })
            }
        }) 
    }

    if(mode == "deinit"){
        console.log(clc.red("Deleting config files!"))
        configFileNames.forEach(fileName => {
            fs.unlink("./" + fileName, err => {
                if(err) throw err
            })  
        })
    }
    
    if(!mode || mode == "serve"){
        const devServerOptions = { ...webpackConfig.devServer, open: true };
        const server = new WebpackDevServer(devServerOptions, compiler);
    
        server.startCallback(() => {
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

module.exports = {
    runCommands
}