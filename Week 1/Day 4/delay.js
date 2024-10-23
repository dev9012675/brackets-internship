function call(){
    return new Promise((resolve , reject)=> {
        setTimeout(()=> {
            resolve("API call completed")
        }, 3000)
    })
}


async function delay() {
    console.log("Starting API call");
    response = await call();
    console.log(response)


    
}

delay()