const fs = require('fs');


fs.readFile('./inputData.txt',"utf-8" , (err, data) => {
    result = 0
    let dataObject = {}
    let instructions = ""
    let initialValue = "AAA"
    let counter = 0
    const directionObject = {"L" : 0 , "R" : 1}
    data =  data.trim().split("\r\n")
        
        for (let i = 0; i < data.length; i++) {  

            if (data[i].includes("=")) {
                const key = data[i].split(" = ")[0]               
                dataObject[key] = data[i].split(" = ")[1].split(", ").map(item => item.replace(/[()]/g, "" ))
                continue
            }
            
            instructions += data[i].trim()       
        }
        const repeatLength = instructions.length
        const destination = "ZZZ"
        let currentItem = ""
     
            for (let i = 0; i < repeatLength; i++) {

                const direction = instructions[i]
                if (counter == 0){
                    currentItem = dataObject[initialValue][directionObject[direction]]
                    counter ++
                    continue
                }
                currentItem = dataObject[currentItem][directionObject[direction]]
                counter ++
                if (currentItem == destination) {
                    break
                }

                if (i == repeatLength - 1 ) {
                    i = -1
                }

        }

        console.log(dataObject)
        console.log(initialValue)
        console.log(counter)
})
