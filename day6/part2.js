const fs = require('fs');

fs.readFile('./inputData.txt',"utf-8" , (err, data) => {
    result = 1
    data =  data.trim().split("\r\n")
        let time = Number(data[0].match(/\d+/g).join(""))
        let distance = Number(data[1].match(/\d+/g).join(""))  +  1
        console.log(time, distance)
        
            const min = Math.ceil(time / 2 - Math.sqrt(time * time / 4 - distance))
            const max = Math.ceil(time / 2 + Math.sqrt(time * time / 4 - distance))

            console.log(min, max, max -min)
            result *= max - min
            
        
        console.log(result)
})