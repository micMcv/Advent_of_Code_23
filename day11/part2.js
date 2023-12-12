const fs = require('fs').promises
const rotate90 = require('2d-array-rotation').rotate90;
const taskFactor = 999999

function expandTheUniverse(data){
    let yFactor = {}
    let counter = 0
    let xFactor = {}

    for (let i = 0; i < data.length; i++) { 
        if(data[i].includes("#")){
         yFactor[i] = counter
        }
        else{
            counter ++
         yFactor[i] = counter
        }             
    }
    counter = 0
    data = rotate90(data)

    for (let i = 0; i < data.length; i++) { 
        if(data[i].includes("#")){
            xFactor[i] = counter
        }
        else{
            counter ++
            xFactor[i] = counter
        }                         
    }

    return [yFactor,xFactor]
}


fs.readFile('./inputData.txt',"utf-8" ).
then(data => {
    let result = 0
    let pairs = 0

    data =  data.trim().split("\r\n")
    const [yFactor,xFactor] = expandTheUniverse(data)

    let indices = data.map((row,i) => {
        const matches = [...row.matchAll(/#/g)];
        return [i, matches.map(match => match.index)]
    })

    for (let startY = 0; startY < indices.length ; startY++) {

        if ( indices[startY][1].length === 0) continue

        if ( indices[startY][1].length > 1) {

            for (let n = 0; n < indices[startY][1].length - 1; n++) {
                for (let m = n + 1; m < indices[startY][1].length; m++) {
                    result += taskFactor * ( xFactor[indices[startY][1][m]]  - xFactor[indices[startY][1][n]] )  +  Math.abs(indices[startY][1][m] - indices[startY][1][n])
                    pairs ++
                }
            }
        }

        for (let startX of indices[startY][1]) {

            for (let endY = startY + 1; endY < indices.length; endY++) {
                if ( indices[endY][1].length === 0) continue

                for (let endX of indices[endY][1]) {

                    result +=  taskFactor  * ((yFactor[endY] - yFactor[startY]) +  ( Math.abs(xFactor[endX] - xFactor[startX]))) + (endY - startY) + Math.abs(endX - startX)
                }
            }
           
        }
    }   
    console.log(result)
})