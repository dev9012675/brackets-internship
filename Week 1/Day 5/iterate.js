
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const ask = (msg) => new Promise(resolve => 
    rl.question(msg, response => resolve(response))
  );

const main = async() => {
    let data = {}
    let num = key = value = null
    do {
        num = await ask(`Enter no of key value pairs:`)
       }while(isNaN(num) || num < 1)
    for(let i = 0 ; i < num; i++) {
        key = await ask(`Enter key ${i + 1}:`)
        value = await ask(`Enter value ${i + 1}:`)
        data[key] = value
    }
    console.log("Now displaying your entered data")
    for(const [key , value] of Object.entries(data))
    {
      console.log(`${key}:${value}`)
    }
  rl.close();
}

main()

