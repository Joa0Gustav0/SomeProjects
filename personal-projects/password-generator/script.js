let lengthInput = 20
let generatedPassword = ''
let resPassword = document.querySelector('.presult')

function changeLength(input){
    lengthInput = Number(input.value)
    let lengthText = document.querySelector('.container span')
    lengthText.innerText = `Password with ${lengthInput} characters.`
}

function generatePassword(){
    resPassword.innerText = ''
    generatedPassword = ''
    let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%&-_'
    for (let pos = 0; pos < lengthInput; pos++){
        generatedPassword += characters[Math.floor(Math.random() * (70-0) + 0)]
    }
    resPassword.innerText = `${generatedPassword}`
}

function copyPassword(){ 
    if (resPassword.innerText != '...'){
        navigator.clipboard.writeText(resPassword.innerText)
    }

}