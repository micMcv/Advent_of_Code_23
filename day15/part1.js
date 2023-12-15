const fs = require('fs').promises

function hashConverter(string, currentValue) {

    for (const char of string) {
        currentValue = ((currentValue + char.charCodeAt(0)) * 17) % 256
    }

    return currentValue

}

fs.readFile('./inputData.txt', "utf-8").
    then(data => {
        let result = 0
        data = data.trim().split(",")

        data.forEach(string => {
            console.log(string, hashConverter(string, 0))
            result += hashConverter(string, 0)
        })

        console.log(result)

    })