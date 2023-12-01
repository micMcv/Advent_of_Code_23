fetch("https://adventofcode.com/2023/day/1/input").

    
    then(res => res.text()).
    then(data => data =  data.trim().split("\n")).
    then(data => {

        let sum = 0;
        data.forEach(line => {
            const regex = /[A-Z]/ig;

            line = line.replace(regex,"")
            sum += Number(line[0] + line[line.length - 1])
            
        })
        console.log(sum)
        
    })