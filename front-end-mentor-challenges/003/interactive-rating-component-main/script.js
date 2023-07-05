let aRateIsSelected = false
let rateIdentifier = ''
let indexTab = document.querySelector('.container-default')
let resultTab = document.querySelector('.container-submitted')

function setRate(currentRate){
    let otherRates = document.querySelectorAll('.rate')
    otherRates.forEach(rate =>{
        rate.style.backgroundColor = 'hsla(216, 12%, 54%, 0.100)'
        rate.style.color='hsl(217, 12%, 63%)'
    })
    currentRate.transition
    currentRate.style.color='white'
    currentRate.style.backgroundColor='hsl(25, 97%, 53%)'
    rateIdentifier = currentRate.name
    aRateIsSelected = true
}

function submitRate(){
    if (rateIdentifier == ''){
        alert('Please, insert a rate and try again!')
    }
    else{
        let resultText = document.querySelector('.container-submitted__visual-result')
        resultText.innerText = `You selected ${rateIdentifier} of 5`
        indexTab.style.display='none'
        resultTab.style.display='flex'
    }
}