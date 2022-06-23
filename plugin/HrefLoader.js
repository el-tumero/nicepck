const fs = require('fs')
module.exports = function (source){
    return source.replace(".pug", ".html")
}



