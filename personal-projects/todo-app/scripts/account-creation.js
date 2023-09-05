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

const setInputState = (currentInput, errorMessage, onError) => {
    let currentInputErrorMessage = document.querySelector(`.${currentInput.parentNode.classList[0]}__error-text`)

    //set input on error state
    if (onError == true){
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
    if (onError == false){
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
        setInputState(usernameInput, 'Username is required.', true)
    }
    if (usernameInput.value != "" && usernameInput.value.length < 8){
        setInputState(usernameInput, 'Username should contain at least 8 characters.', true)
    }
    let uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let containUpperChar = false
    for (var i = 0; i < usernameInput.value.length && containUpperChar == false; i++){
        if (uppercaseChars.includes(usernameInput.value[i]) == true){
            containUpperChar = true
        }
    }
    if (usernameInput.value != "" && usernameInput.value.length >= 8 && containUpperChar == false){
        setInputState(usernameInput, 'Username should contain at least one uppercase character.', true)
    }
    if (usernameInput.value != "" && usernameInput.value.length >= 8 && containUpperChar == true){
        setInputState(usernameInput, undefined, false)
    }

    //password
    if (passwordInput.value == ""){
        setInputState(passwordInput, 'Password is required.', true)
    }
    if (passwordInput.value != "" && passwordInput.value.length < 8){
        setInputState(passwordInput, 'Password should contain at least 8 characters.', true)
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
        setInputState(passwordInput, 'Password should contain at least a number, a letter and a special character.', true)
    }
    if (passwordInput.value != "" && passwordInput.value.length >= 8 && passwordContainNumber == true && passwordContainLetter == true && passwordContainSpecialChar == true){
        setInputState(passwordInput, undefined, false)
    }

    //confirm-password
    if (passwordInput.value != ""){
        if (confirmPasswordInput.value == ""){
            setInputState(confirmPasswordInput, 'Password confirmation is required.', true)
        }
        if (confirmPasswordInput.value != "" && confirmPasswordInput.value != passwordInput.value){
            setInputState(confirmPasswordInput, 'Passwords do not match.', true)
        }
        if (confirmPasswordInput.value != "" && confirmPasswordInput.value == passwordInput.value){
            setInputState(confirmPasswordInput, undefined, false)
        }
    }

    //account-type
    if (newAccountInformations.accountType == null){
        setInputState(accountTypeInput, 'Account type is required.', true)
    }
}

function createNewAccount(){
    findError()

    let inputsOnError = document.getElementsByClassName('input-error')
    if (inputsOnError.length <= 0){
        newAccountInformations.username = usernameInput.value
        newAccountInformations.password = passwordInput.value
        console.log(newAccountInformations)   
        window.open('login.html', '_self')
    }
}
