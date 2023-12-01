let fs = require('fs');
let translatedNumbers = {"one":"1","two":"2","three":"3","four":"4","five":"5","six":"6","seven":"7","eight":"8","nine":"9"}

fs.readFile('./inputData.txt',"utf-8", (err, data) => {
  
    if (err) throw err;
    data = data.trim().split("\r\n");
   

    let sum = 0;
    data.forEach(line => {

        let arrayOfFoundNumbers = []
       
        for (let i = 0; i < line.length; i++) {
            if (Number(line[i]) > 0) {
                arrayOfFoundNumbers.push(line[i])
                continue;
            }
           for (number in translatedNumbers) {
               if(line.slice(i).startsWith(number)) {
                   arrayOfFoundNumbers.push(translatedNumbers[number])
                   continue
               }
           }
        }
        sum += Number(arrayOfFoundNumbers[0] + arrayOfFoundNumbers[arrayOfFoundNumbers.length - 1])

    })
    console.log(sum)
}); 