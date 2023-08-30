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
const passwordInput = document.querySelector('#password-input')

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
    console.log("adasdasdasdssa")
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