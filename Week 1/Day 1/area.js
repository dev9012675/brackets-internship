const readline = require("readline");
let rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt(`Enter radius of circle:`);
rl.prompt();
rl.on('line', (radius) => {
    console.log(`Radius received by the user: ${radius}`);
    radius = parseFloat(radius);
    console.log(`Area of circle is: ${Math.PI * radius * radius}`)
    rl.close();
});