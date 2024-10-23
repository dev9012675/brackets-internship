import readline from 'readline'

const calculator = (a:number , b:number , operator: `+` | `-` | `*` | `/` ):number => {
     switch(operator) {
        case `+`:
            return a + b

        case `-`:
            return a - b

        case `*`:
            return a * b

        case `/`:
            return a / b

     }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  const ask = (msg:string):Promise<string> => new Promise(resolve => 
      rl.question(msg, (response:string) => resolve(response))
    );
  
  const main = async ():Promise<void>=> {
    let num1:string = ``
    let num2:string = ``
    let operator:string = ``

    do {
        num1 = await ask("Enter first number:")
    }while(isNaN(parseFloat(num1)))
    
    do {
        num2 = await ask("Enter second number:")
    }while(isNaN(parseFloat(num2)))

    do{
      operator = await ask("Enter operator:")
    }while(!(operator === `+` || operator === `-` || operator === `/` || operator === `*`))
      
      console.log(`The result of the operation is:${calculator(parseFloat(num1), parseFloat(num2) , operator)}`)
      rl.close();
  
  }
  
  main()