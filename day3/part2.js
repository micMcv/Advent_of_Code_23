const fs = require('fs');

let sum = 0;
let row = 0;


function checkIfRelevant( Y, X ,data){
        
        let number = ""
        let starCoordinate = []
        let relevantNumber = false
        while( true) {
        
        if ( X > data[Y].length - 1){
                break
        }
                
        const adjacent = [ [Y-1,X-1], [Y-1,X], [Y-1,X+1], [Y,X-1], [Y,X+1], [Y+1,X-1], [Y+1,X], [Y+1,X+1]]
            if(data[Y][X].match(/[0-9]/)){
                        
                    number += data[Y][X]
                    
                    if (relevantNumber == false){
                            for (const coordinate of adjacent){

                                    if (data[coordinate[0]] && data[coordinate[0]][coordinate[1]] && data[coordinate[0]][coordinate[1]].match(/[*]/)){
                                            relevantNumber = true
                                            starCoordinate = "" + coordinate[0] +" " + coordinate[1]
                                    }
                            }
                    }
               X++
            }
            else{
                    break
            }
        }
     
        return relevantNumber ? [starCoordinate, number, number.length] : [false, number.length]
    }

fs.readFile('./inputData.txt',"utf-8" , (err, data) => {
 
        data =  data.trim().split("\r\n")
        result = []

        data.forEach((Y) => {
                let currentNumber = "";
                for (let X = 0; X < Y.length; X++) {

                                if (Y[X].match(/[0-9]/)){
                                        currentNumber = checkIfRelevant(row,X,data)
                                        
                                        if (currentNumber[0]){
                                            X += currentNumber[2] - 1
                                            result.push(currentNumber[0] + ";" + currentNumber[1])
                                        }
                                        else{
                                            X += currentNumber[1] - 1
                                        }                                                    
                                }                                              
                }

                row++
        })
        result = result.sort()
let re = 0
for (let i = 0; i < result.length -1; i++) {
    if (result[i].split(";")[0] == result[i+1].split(";")[0]){

        re += result[i].split(";")[1] * result[i+1].split(";")[1]       
    }
}
console.log(re)
})
