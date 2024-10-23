const counter = (function() {
    let count = 0
    function change(value) {
        count += value
    }
    return  {
            increment() {
                change(1)
            } ,

            value() {
                return count
            }
    }
})()

const counterValue = document.querySelector(".counter")
const counterButton = document.querySelector(".counter-button")
counterValue.innerText = counter.value()
counterButton.addEventListener("click" , ()=> {
    counter.increment();
    counterValue.innerText = counter.value()
})


