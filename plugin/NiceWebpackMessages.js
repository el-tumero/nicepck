const clc = require("cli-color")
const fs = require("fs")
const path = require("path")
const { compile } = require("pug")

class NiceWebpackMessages {
    apply(compiler){

        let files = []

        compiler.hooks.beforeCompile.tapAsync('NiceWebpackMessages', (params, callback) => {
            files = []
            params.normalModuleFactory.hooks.module.tap("NiceWebpackMessages", (module) => {
                
                if(module.context.includes(path.resolve('./') + "/src")){

                    const formattedPath = module.resource.replace(path.resolve('./'), ".")
                    if(!files.find(path => path === formattedPath)){
                        files.push(formattedPath)
                    }
                }
            })

            callback()
          });

        compiler.hooks.compile.tap('NiceWebpackMessages', (params) => {
            console.clear()
            console.log("⚙️  " + clc.yellowBright("Compiling..."))
        })

        compiler.hooks.afterCompile.tapAsync('NiceWebpackMessages', (compilation, callback) => {
            console.clear()
            console.log("⚙️  " + clc.yellow("Compilation:"))
            console.log(clc.greenBright("Source files:"))
            files.forEach(path => {
                console.log(path)
            })
            callback()
        })


        
          compiler.hooks.done.tap('NiceWebpackMessages', stats => {
            const statsObject = stats.toJson({}, true)
            const time = statsObject.time
            console.log("📦 Done in " + clc.yellow(time) + " ms!")
          })
    }
}

module.exports = NiceWebpackMessages