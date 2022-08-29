const clc = require("cli-color")
const path = require("path")
const configs = require("./default-configs.json");
const fs = require("fs")
const keypress = require("keypress")
const WebpackDevServer = require("webpack-dev-server")

const configFileNames = ['postcss.config.js', 'tailwind.config.js', 'tsconfig.json', 'nice.config.json']

let selectedOptionId = 0

const options = [
    " - Generate template with config files.",
    " - Create needed config files."
]

function selectOption(direction){
    if(direction === "up" && selectedOptionId > 0) selectedOptionId--
    if(direction === "down" && selectedOptionId < options.length - 1 ) selectedOptionId++
}

function displayOptions(){
    for (let i = 0; i < options.length; i++) {
        if(i !== selectedOptionId) console.log(clc.white(options[i]))
        else console.log(clc.green(options[i]))
    }
}

function createConfigFiles(){
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

function generateTemplate(){
    console.log(clc.greenBright("Creating template in src folder!"))
    
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

function runCommands(compiler, mode, webpackConfig){
    if(mode === "template"){
        generateTemplate()
    }

    if(mode === "config"){
        createConfigFiles()
    }
    
    if(mode === "init"){
        console.log(clc.yellowBright("Choose option by using arrow keys ") + clc.bold("[↑/↓]") + clc.yellowBright(" and proceed with Enter/Return key:"))
        displayOptions()

        keypress(process.stdin)

        process.stdin.on('keypress', function (ch, key) {

            selectOption(key.name)
            process.stdout.moveCursor(0, -1)
            process.stdout.clearLine(1)
            process.stdout.moveCursor(0, -1)
            process.stdout.clearLine(1)
            displayOptions()

            if(key.name === "return"){
                process.stdin.pause()
                console.clear()
                if(selectedOptionId === 0){
                    createConfigFiles()
                    generateTemplate() 
                }

                if(selectedOptionId === 1){
                    createConfigFiles()
                }
                
            }

            if (key && key.ctrl && key.name == 'c') {
              process.stdin.pause()
            }
        });
    
        process.stdin.setRawMode(true);
        process.stdin.resume();
    
    }


    if(mode === "deinit"){
        console.log(clc.red("Deleting config files!"))
        configFileNames.forEach(fileName => {
            fs.unlink("./" + fileName, err => {
                if(err) throw err
            })  
        })
    }
    
    if(!mode || mode === "serve"){
        const devServerOptions = { ...webpackConfig.devServer, open: true };
        const server = new WebpackDevServer(devServerOptions, compiler);
    
        server.startCallback(() => {
        });
    }
    
    if(mode === "watch"){
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