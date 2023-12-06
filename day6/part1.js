const fs = require('fs');

fs.readFile('./inputData.txt',"utf-8" , (err, data) => {
    result = 1
    data =  data.trim().split("\r\n")
        let times = data[0].match(/\d+/g).map(Number)
        let distances = data[1].match(/\d+/g).map(Number)

        for (let i = 0; i < times.length; i++) {
            const time = times[i]
            const distance = distances[i] + .001
            const min = Math.ceil(time / 2 - Math.sqrt(time * time / 4 - distance))
            const max = Math.ceil(time / 2 + Math.sqrt(time * time / 4 - distance))

            console.log(min, max, max -min)
            result *= max - min
            
        }
        console.log(result)
})
