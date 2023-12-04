const fs = require('fs');

fs.readFile('./inputData.txt',"utf-8" , (err, data) => {
    
    data =  data.trim().split("\r\n")
        let points = 0
        for (const line of data) {  // i.e. Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
            let matches = 0
            const winningNumbers = line.split("|")[0].split(":")[1].trim().match(/[0-9]+/g) // [ '41', '48', '83', '86', '17' ]
            const playerNumbers = line.split("|")[1].trim().match(/[0-9]+/g) // [ '83', '86', '6', '31', '17', '9', '48', '53' ]

            playerNumbers.forEach((number) => {
                if (winningNumbers.includes(number)){
                    matches++
                }              
            })
            points += matches ? Math.pow(2, matches - 1) : 0
        }
        console.log(points)
})
