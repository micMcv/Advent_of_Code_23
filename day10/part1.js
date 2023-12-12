const fs = require('fs').promises
let seen = new Set()
let currentPoint = ""
let adjacents = [["N",-1,0],["E",0,1],["S",1,0],["W",0,-1]]
let vis = []
let output = ""

function isAllowedDirection(character, nextCharacter, direction){

    switch (character){

        case "|": {

            if (direction == "N" && "|7F".includes(nextCharacter)  || direction == "S" && "|JL".includes(nextCharacter)) {
                return true         
            }
            return false
        }
        case "-": {

            if (direction == "W" && "-FL".includes(nextCharacter)  || direction == "E" && "-7J".includes(nextCharacter)) {
                return true         
            }
            return false          
        }

        case "7": {

            if (direction == "S" && "|LJ".includes(nextCharacter)  || direction == "W" && "-LF".includes(nextCharacter)) {
                return true         
            }
            return false
        }
        case "F": {

            if (direction == "S" && "|LJ".includes(nextCharacter)  || direction == "E" && "-7J".includes(nextCharacter)) {
                return true         
            }
            return false 
            
        }

        case "L": {

            if (direction == "N" && "|7F".includes(nextCharacter)  || direction == "E" && "-J7".includes(nextCharacter)) {
                return true         
            }
            return false
        }
        case "J": {

            if (direction == "N" && "|7F".includes(nextCharacter)  || direction == "W" && "-LF".includes(nextCharacter)) {
                return true         
            }
            return false }

            case "S": {

                if (direction == "N" && "|7F".includes(nextCharacter)  || direction == "W" && "-LF".includes(nextCharacter) || direction == "E" && "-7J".includes(nextCharacter) || direction == "S" && "|JL".includes(nextCharacter)) {
                    return true         
                }
                return false }

    }
}

function searchForStartingpoint(data){

    for (let y = 0; y < data.length; y++) { 
        for (let x = 0; x < data[y].length; x++) { 
            if (data[y][x] === "S") {
                seen.add(`${y} ${x}`)
                return `${y} ${x}`
            }

        }            
    }
}

fs.readFile('./inputData.txt',"utf-8" ).
then(data => {
    result = 0 
    data =  data.trim().split("\r\n").map(item => item.split(""))
    for (let i = 0; i < data.length; i++) { 
        vis.push(new Array(data[i].length).fill("."))  
    }
    
    currentPoint = searchForStartingpoint(data)

    while (true) {

        [Y,X] = currentPoint.split(" ").map(item => parseInt(item))
        const currentCharacter = data[Y][X]
        vis[Y][X] = currentCharacter
        let nothingFound = true
        //directions = [["S",-1,0],["E",0,1],["N",1,0],["W",0,-1]]

        for (const ad of adjacents) {
            dx = X + ad[2]
            dy = Y + ad[1]

            if ( data[dy] && data[dy][dx] && (!seen.has(`${dy} ${dx}`)) && isAllowedDirection(currentCharacter, data[dy][dx], ad[0])) {
                currentPoint = `${dy} ${dx}`
                seen.add(currentPoint)
                nothingFound = false
                result++
                break
            }
        }

       if (nothingFound) {
           break
       }
            
    }
    console.log(Math.ceil(result/2))
    vis.forEach(item => {
        output += item.join("") + "\n"
    })
    return output.trim()
}).then(v => { 
    fs.writeFile("./output.txt", v, "utf-8", (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
        });



})