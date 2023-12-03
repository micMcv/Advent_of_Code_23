const fs = require('fs');

let sum = 0;
let row = 0;

function checkIfRelevant( Y, X ,data){     
        let number = ""
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

                                    if (data[coordinate[0]] && data[coordinate[0]][coordinate[1]] && data[coordinate[0]][coordinate[1]].match(/[^0-9.]/)){
                                            relevantNumber = true
                                    }
                            }
                    }
               X++
            }
            else{
                    break
            }
        }
        return relevantNumber ? [number, number.length] : [number , 0]
    }

fs.readFile('./inputData.txt',"utf-8" , (err, data) => {
 
        data =  data.trim().split("\r\n")
        

        data.forEach((Y) => {
                let currentNumber = "";
                for (let X = 0; X < Y.length; X++) {

                                if (Y[X].match(/[0-9]/)){
                                        currentNumber = checkIfRelevant(row,X,data)
                                        
                                        if (currentNumber[1]){
                                                sum += Number(currentNumber[0])
                                                X += currentNumber[1] - 1
                                        }
                                        
                                        else{
                                                X += currentNumber[0].length - 1
                                        }
                                       
                                }                                  
                }

                row++
        })
console.log(sum)
})
