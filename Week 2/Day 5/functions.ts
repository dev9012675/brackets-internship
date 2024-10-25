interface Product {
    name:string ,
    price:number
}

const countCharacters = (string:string):any =>{
    const count:any = {};
    for(let character of string)
    {
        if(count.hasOwnProperty(character) === true)
        {
            ++count[character]
        }
        else
        {
            count[character] = 1
        }
    }
    console.log(`The characters in your string and the number of times they are used is as follows:`)
    console.log(`${JSON.stringify(count)}`)
  
    return count

}

const greeting = (name:string , age:number):string => {
    const message:string = `Hello ${name}.Your age is ${age}`
    return message

}

const convertTemperature = (temperature:number ,  convertTo:`C` |  `F`
):string =>  {
    
    if(convertTo.toUpperCase() === "C") {
        return `${temperature} F converted into Celsius is:${Math.round((temperature - 32) * 5/9 * 10)/10} C`
    }
    else {
        return `${temperature} C converted into Farenheit is:${Math.round((temperature * 9/5 + 32)  * 10)/10} F`
    }
}

const updateProduct = (product: Product, update?: { name?: string; price?: number }): Product => {
    if ((typeof update === "undefined") ||
        (typeof update.name === "undefined" && typeof update.price === "undefined")) {
        return product;
    } else {
        return {
            ...product,
            ...(typeof update.name !== "undefined" && { name: update.name }),
            ...(typeof update.price !== "undefined" && { price: update.price }),
        };
    }
};

countCharacters("Hello")

console.log(greeting('Ali' , 40))

console.log(convertTemperature(102.5 , 'C'))

let product:Product = {name: `HTC` , price:500}

console.log(`${JSON.stringify(updateProduct(product , {price:300} ))}`)

console.log(`${JSON.stringify(updateProduct(product , {name:'Nokia',price:300} ))}`)

console.log(`${JSON.stringify(updateProduct(product , {name:`Nokia`} ))}`)

console.log(`${JSON.stringify(updateProduct(product , {} ))}`)

console.log(`${JSON.stringify(updateProduct(product  ))}`)

