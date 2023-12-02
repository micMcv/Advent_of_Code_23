const { count } = require('console');
const fs = require('fs');

fs.readFile('./inputData.txt',"utf-8" , (err, data) => {
 
        data =  data.trim().split("\r\n")
        let sum = 0;
        for (const line of data) { // Game 11: 3 red, 7 blue; 2 red, 3 blue ...

            const countingObject = {"red" : 0 , "green" : 0 , "blue" : 0}
            const gameData = line.split(":")[1].trim().split(";") // [ '2 blue, 2 red, 9 green',' 4 green, 5 blue, 1 red',]

            for (const game of gameData){ // game '2 blue, 2 red, 9 green'

                const cubes = game.trim().split(", ")

                for (const cube of cubes){
                    
                    const color = cube.split(" ")[1]
                    const amount = Number(cube.split(" ")[0])

                    if (amount > countingObject[color]){
                        countingObject[color] = amount
                    }       
                }
            }
            sum += countingObject["red"] * countingObject["green"] * countingObject["blue"]

        }
        console.log(sum)})
