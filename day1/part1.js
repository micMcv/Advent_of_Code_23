const fs = require('fs');

fs.readFile('./inputData.txt',"utf-8" , (err, data) => {
 
        data =  data.trim().split("\r\n")
        let sum = 0;

        data.forEach(line => {
            const regex = /[A-Z]/ig;

            line = line.replace(regex,"")
            sum += Number(line[0] + line[line.length - 1])
            
        })
        console.log(sum)       
    })