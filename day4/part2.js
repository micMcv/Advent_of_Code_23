const fs = require('fs');

let winningMemory = {}
let sumOfCards = 0;
let cardStack = {}

fs.readFile('./inputData.txt',"utf-8" , (err, data) => {
 
        data =  data.trim().split("\r\n")
        for (const line of data) {  // i.e. Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
            let matches = 0
            const cardNumber = line.split(":")[0].replace("Card","").trim()// 1
            cardStack[cardNumber]  = 1
            
            const winningNumbers = line.split("|")[0].split(":")[1].trim().match(/[0-9]+/g) // [ '41', '48', '83', '86', '17' ]
            const playerNumbers = line.split("|")[1].trim().match(/[0-9]+/g) // [ '83', '86', '6', '31', '17', '9', '48', '53' ]

            playerNumbers.forEach((number) => {
                if (winningNumbers.includes(number)){
                    matches++
                }              
            })
            winningMemory[cardNumber] = matches
        }

        for (const card in cardStack){
                
                sumOfCards += cardStack[card]
                for (let i = 0; i < cardStack[card]; i++){
                        let counter = winningMemory[card]
                        
                        while ( counter > 0 ) {
        
                                cardStack[Number(card) + counter] += 1
                                counter --
                        } 
                }
        }
      console.log(sumOfCards)

})
