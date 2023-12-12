const fs = require('fs').promises
const rotate90 = require('2d-array-rotation').rotate90;
const rotate270 = require('2d-array-rotation').rotate270;

function expandTheUniverse(data){
    let newData = []
    let newdata2 = []
    let temp = []
    for (let i = 0; i < data.length; i++) { 
        if(data[i].includes("#")){
            newData.push(data[i])
        }
        else{
            newData.push(data[i])
            newData.push(data[i])
        }             
    }

    newdata2 = rotate90(newData)

    for (let i = 0; i < newdata2.length; i++) { 
        if(newdata2[i].includes("#")){
            temp.push(newdata2[i])
        }
        else{
            temp.push(newdata2[i])
            temp.push(newdata2[i])}             
    }
    newdata2 = rotate270(temp)
    return newdata2
}


fs.readFile('./inputData.txt',"utf-8" ).
then(rawData => {
    let result = 0
    let pairs = 0 

    rawData =  rawData.trim().split("\r\n")
    let data = expandTheUniverse(rawData)

    let indices = data.map((row,i) => {
        const matches = [...row.join("").matchAll(/#/g)];
        return [i, matches.map(match => match.index)]
    })

    for (let startY = 0; startY < indices.length ; startY++) {

        if ( indices[startY][1].length === 0) continue

        if ( indices[startY][1].length > 1) {

            for (let n = 0; n < indices[startY][1].length - 1; n++) {
                for (let m = n + 1; m < indices[startY][1].length; m++) {
                    result += Math.abs(indices[startY][1][m] - indices[startY][1][n])
                    pairs ++
                }
            }

        }

        for (let startX of indices[startY][1]) {
             //console.log(startY,startX)

            for (let endY = startY + 1; endY < indices.length; endY++) {
                if ( indices[endY][1].length === 0) continue

                for (let endX of indices[endY][1]) {
                    result += (endY - startY) + Math.abs(endX - startX)
                }
            }
           
        }
    }  
    console.log(result)
})