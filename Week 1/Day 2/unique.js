function unique(elements) {
    let uniqueElements = new Set();
    for(let element of elements)
    {
        uniqueElements.add(element)
    }
    return Array.from(uniqueElements)
}

console.log(unique([1,2,2,5]))
