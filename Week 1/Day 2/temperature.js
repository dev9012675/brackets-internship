/* This function is used to convert temperatures between Celsius and Farenheit.
temperature(type:number) = The temperature to be converted 
convertTo(type:string) = Indicates the unit to convert temperature to. It has two valid values
            C: indicates that the temperature is in Farenheit and needs to be converted
                to Celsius
            F: indicates that the temperature is in Celsius and needs to be converted
                to Farenheit   
            For any other string , the function returns undefined
                */

function convertTemperature(temperature ,  convertTo)  {
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

console.log(convertTemperature(80 , "c"))

 