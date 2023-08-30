//variables
var newAccountInformations = {username: null, passwordt: null, accountType: null}

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
const accountTypeButtons = document.getElementsByClassName('create-account-section__aside__account-type-container__choose-boxes')

function createNewAccount(){
    //errors
    if (usernameInput.value == '' ||
    passwordInput.value == '' ||
    newAccountInformations.accountType == null ||
    newAccountInformations.accountType == undefined||
    newAccountInformations.accountType == ''){
        window.alert('Please, all fields need to be filled before creating an account.')
    }
    else if (passwordInput.value != confirmPasswordInput.value){
        window.alert('The entered passwords do not match. Review and try again.')
    }
    else{
        if (usernameInput.value.length < 8){
            window.alert('The entered username is not valid. A valid username should contain at least 8 characters.')
        }else{
            const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            let containUpperChar = false

            for (var i = 0; i < usernameInput.value.length; i++){
                if (usernameInput.value.toString()[i].indexOf(uppercaseChars) > -1){
                    containUpperChar = true
                }
            }
            if (containUpperChar == false){
                window.alert('The entered username is not valid. A valid username should contain at least one uppercase character.')
            }
        }

    }
}
