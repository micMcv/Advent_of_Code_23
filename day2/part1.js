const fs = require('fs');

function breaksTheLimit(color, amount){
    
    const limits = {"red":12, "green": 13, "blue":14};
    const truth = amount > limits[color];
    return amount > limits[color];

}

fs.readFile('./inputData.txt',"utf-8" , (err, data) => {
 
        data =  data.trim().split("\r\n")
        let sum = 0;
        for (const line of data) { // Game 11: 3 red, 7 blue; 2 red, 3 blue ...


            let limitBroken = false
            const gameId = Number(line.split(":")[0].replace(/[A-Z]/ig,"")) 
            const gameData = line.split(":")[1].trim().split(";") // [ '2 blue, 2 red, 9 green',' 4 green, 5 blue, 1 red',]

            for (const game of gameData){ // game '2 blue, 2 red, 9 green'
                if (limitBroken){
                    break;
                }
                const cubes = game.trim().split(", ")

                for (const cube of cubes){
                    
                    const color = cube.split(" ")[1]
                    const amount = Number(cube.split(" ")[0])

                    if (breaksTheLimit(color,amount)){
                        limitBroken = true;
                        break;
                    }                    
                }
            }

            sum += limitBroken ? 0 : gameId  
        }
        console.log(sum)})
