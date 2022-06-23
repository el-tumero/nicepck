const clc = require("cli-color")
const fs = require("fs")
const path = require("path")


class NiceWebpackMessages {

    constructor(devServerPort){
       this.devServerPort = devServerPort
       this.clear = true
    }

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
            if(this.clear) console.clear()
            console.log("⚙️  " + clc.yellowBright("Compiling..."))
        })

        compiler.hooks.afterCompile.tapAsync('NiceWebpackMessages', (compilation, callback) => {
            if(this.clear) console.clear()
            if(this.devServerPort) console.log(clc.greenBright("Dev server: ") + "http://localhost:" + this.devServerPort )
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