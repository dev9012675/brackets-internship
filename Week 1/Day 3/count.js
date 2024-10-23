function countCharacters (string){
    let count = {};
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
    return count

}

console.log(countCharacters("hello"))