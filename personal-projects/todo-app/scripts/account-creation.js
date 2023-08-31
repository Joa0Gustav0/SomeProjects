//variables
var newAccountInformations = {username: null, password: null, accountType: null}

//permission for password visibility
passwordVisibilityButton = document.querySelector('.create-account-section__aside__password-container__eye-icon')

function setVisibility(passwordInput){
    if (passwordInput.value != ''){
        passwordVisibilityButton.style.display = 'block'
    }else{
        passwordVisibilityButton.style.display = 'none'
    }    
}

//set password visibility button and input state 

function setPasswordVisibilityState(){
    if (passwordVisibilityButton.getAttribute('name') == 'eye'){
        passwordInput.setAttribute('type', 'text')
        passwordVisibilityButton.setAttribute('name', 'eye-off')
    }else if (passwordVisibilityButton.getAttribute('name') == 'eye-off'){
        passwordInput.setAttribute('type', 'password')
        passwordVisibilityButton.setAttribute('name', 'eye')
    }
}

//confirm password box appears
const confirmPasswordBox = document.getElementsByClassName('confirm-password')

function confirmPasswordBoxStateSet(passwordInput){
    if (passwordInput.value == ''){
        for (var i = 0; i < confirmPasswordBox.length; i++){
            confirmPasswordBox[i].style.display = 'none'
        }
    }else{
        for (var i = 0; i < confirmPasswordBox.length; i++){
            confirmPasswordBox[i].style.display = 'flex'
        }
        confirmPasswordBox[confirmPasswordBox.length - 1].value = ''
    }
}

//set account type
function setAccountType(currentTypeButton){
    if (currentTypeButton.classList.contains('type-selected')){
        currentTypeButton.classList.remove('type-selected')
        newAccountInformations.accountType = null
    }else{
        for (var i = 0; i < accountTypeButtons.length; i++){
            if (accountTypeButtons[i].classList.contains('type-selected')){
                accountTypeButtons[i].classList.remove('type-selected')
            }
        }
        currentTypeButton.classList.add('type-selected')

        //set new account informations: type
        newAccountInformations.accountType = currentTypeButton.id.toString()
    }
}

//CREATE A NEW ACCOUNT!important
const usernameInput = document.querySelector('#username-input')
const passwordInput = document.querySelector('#password-input')
const confirmPasswordInput = document.querySelector('#confirm-password-input')
const accountTypeInput = document.getElementsByClassName('create-account-section__aside__account-type-container__choose-boxes')[0]
const accountTypeButtons = document.getElementsByClassName('create-account-section__aside__account-type-container__choose-boxes')

let anyErrorFound = null

const resetInputState = () => {
    if (usernameInput.parentNode.classList.contains('input-error')){
        usernameInput.parentNode.classList.remove('input-error')
    }
    if (passwordInput.parentNode.classList.contains('input-error')){
        passwordInput.parentNode.classList.remove('input-error')
    }
    if (confirmPasswordInput.parentNode.classList.contains('input-error')){
        confirmPasswordInput.parentNode.classList.remove('input-error')
    }
    if (accountTypeInput.parentNode.classList.contains('input-error')){
        accountTypeInput.parentNode.classList.remove('input-error')
    }

    const InputsErrorMessages = document.getElementsByClassName('create-account-section__aside__inputs-error-text')
    for (var i = 0; i < InputsErrorMessages.length; i++){
        if (InputsErrorMessages[i].classList.contains('on-error')){
            InputsErrorMessages[i].classList.remove('on-error')
        }
    }
}

const setInputState = (currentInput, errorMessage) => {
    let currentInputErrorMessage = document.querySelector(`.${currentInput.parentNode.classList[0]}__error-text`)
    console.log()

    //set input on error state
    if (anyErrorFound == true){
        if (currentInput.parentNode.classList.contains('input-error') == false){
            currentInput.parentNode.classList.add('input-error')
        }

        //set input error message
        currentInputErrorMessage.innerText = errorMessage
        if (currentInputErrorMessage.classList.contains('on-error') == false){
            currentInputErrorMessage.classList.add('on-error')
        }
    }
    
    //set input on valid state 
    if (anyErrorFound == false){
        if (currentInput.parentNode.classList.contains('input-error') == true){
            currentInput.parentNode.classList.remove('input-error')
        }
        if (currentInput.parentNode.classList.contains('input-valid') == false){
            currentInput.parentNode.classList.add('input-valid')
        }
    }
}

function findError(){
    //username
    if (usernameInput.value == ""){
        anyErrorFound = true
        setInputState(usernameInput, 'Username is required.')
    }
    if (usernameInput.value != "" && usernameInput.value.length < 8){
        anyErrorFound = true
        setInputState(usernameInput, 'Username should contain at least 8 characters.')
    }
    let uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let containUpperChar = false
    for (var i = 0; i < usernameInput.value.length && containUpperChar == false; i++){
        if (uppercaseChars.includes(usernameInput.value[i]) == true){
            containUpperChar = true
        }
    }
    if (usernameInput.value != "" && usernameInput.value.length >= 8 && containUpperChar == false){
        anyErrorFound = true
        setInputState(usernameInput, 'Username should contain at least one uppercase character.')
    }
    if (usernameInput.value != "" && usernameInput.value.length >= 8 && containUpperChar == true){
        anyErrorFound = false
        setInputState(usernameInput)
    }

    //password
    if (passwordInput.value == ""){
        anyErrorFound = true
        setInputState(passwordInput, 'Password is required.')
    }
    if (passwordInput.value != "" && passwordInput.value.length < 8){
        anyErrorFound = true
        setInputState(passwordInput, 'Password should contain at least 8 characters.')
    }
    let passwordContainNumber = false
    let passwordContainLetter = false
    let passwordContainSpecialChar = false

    const number = "0123456789"
    const lettersChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const specialChars = "!@#$%&*()-_=+?"

    for (var i = 0; i < passwordInput.value.length; i++){
        if (number.includes(passwordInput.value[i])){
            passwordContainNumber = true
        }
        if (lettersChars.includes(passwordInput.value[i])){
            passwordContainLetter = true
        }
        if (specialChars.includes(passwordInput.value[i])){
            passwordContainSpecialChar = true
        }
    }
    if (passwordInput.value != "" && passwordInput.value.length >= 8 && (passwordContainNumber == false || passwordContainLetter == false || passwordContainSpecialChar == false)){
        anyErrorFound = true
        setInputState(passwordInput, 'Password should contain at least a number, a letter and a special character.')
    }
    if (passwordInput.value != "" && passwordInput.value.length >= 8 && passwordContainNumber == true && passwordContainLetter == true && passwordContainSpecialChar == true){
        anyErrorFound = false
        setInputState(passwordInput)
    }

    //confirm-password
    if (passwordInput.value != ""){
        if (confirmPasswordInput.value == ""){
            anyErrorFound = true
            setInputState(confirmPasswordInput, 'Password confirmation is required.')
        }
        if (confirmPasswordInput.value != "" && confirmPasswordInput.value != passwordInput.value){
            anyErrorFound = true
            setInputState(confirmPasswordInput, 'Passwords do not match.')
        }
        if (confirmPasswordInput.value != "" && confirmPasswordInput.value == passwordInput.value){
            anyErrorFound = false
            setInputState(confirmPasswordInput)
        }
    }

    //account-type
    if (newAccountInformations.accountType == null){
        anyErrorFound = true
        setInputState(accountTypeInput, 'Account type is required.')
    }
}

function createNewAccount(){
    findError()

    if (anyErrorFound == false){
        newAccountInformations.username = usernameInput.value
        newAccountInformations.password = passwordInput.value
    }
}
