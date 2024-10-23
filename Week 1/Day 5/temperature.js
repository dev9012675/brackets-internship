/* This function is used to convert temperatures between Celsius and Farenheit.
temperature(type:number) = The temperature to be converted 
convertTo(type:string) = Indicates the unit to convert temperature to. It has two valid values
            C: indicates that the temperature is in Farenheit and needs to be converted
                to Celsius
            F: indicates that the temperature is in Celsius and needs to be converted
                to Farenheit   
            For any other string , the function returns undefined
                */

 const convertTemperature = (temperature ,  convertTo)=>  {
    if(isNaN(parseFloat(temperature)) || typeof(convertTo) !== "string" 
    || !(convertTo.toUpperCase() === "C" || convertTo.toUpperCase() === "F") )
    {
        return undefined
    }
   else if(convertTo.toUpperCase() === "C") {
        return Math.round((temperature - 32) * 5/9 * 10)/10
    }
    else {
        return Math.round((temperature * 9/5 + 32)  * 10)/10
    }
}

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const ask = (msg) => new Promise(resolve => 
    rl.question(msg, response => resolve(response))
  );

const main = async ()=> {
    console.log("Hello!This is a simple program which converts temperatures between Celsius and Farenheit")

    let temperature = unit = null
    do {
         unit = await ask("Enter your temperature unit(C For Celsius , F for Farenheit):")
    }while(!(unit.toUpperCase() === "C"  || unit.toUpperCase() === "F")  )

    
    do {
       temperature = parseFloat(await ask("Enter your temperature:"))
    }while(isNaN(temperature))

    rl.close() 

    if(unit === "c" || unit === "C") {
        console.log(`Your temperature in Farenheit:${convertTemperature(temperature , "F")}`)
    } else {
        console.log(`Your temperature in Celsius:${convertTemperature(temperature , "C")}`)
    }
    
    
}

main()

 