

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const getName = () => {
  return new Promise((resolve, reject) => {
    rl.question('What is your name? ', (name) => {
      resolve(name)
    })
  })
}

const getAge = () => {
  return new Promise((resolve, reject) => {
    rl.question('What is your age? ', (age) => {
      resolve(age)
    })
  })
}

const main = async () => {
  let name = await getName()
  let age  = await getAge()
  console.log(`Hello, ${name}(${age})`)
  rl.close()
}

main()