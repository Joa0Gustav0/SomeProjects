window.onload = actionsOnLoad =>{
    let formularyInputs = document.getElementsByTagName("input")
    const passwordInputVisibleButton = document.querySelector('.login-section__inputs-container__input-eye-icon')

    passwordInputVisibleButton.addEventListener('click', function (){
        const passwordInput = document.querySelector('#password-input') 

        if (passwordInputVisibleButton.name == 'eye'){
            passwordInput.setAttribute('type', 'text')
            passwordInputVisibleButton.name = 'eye-off'
        }else if (passwordInputVisibleButton.name == 'eye-off'){
            passwordInput.setAttribute('type', 'password')
            passwordInputVisibleButton.name = 'eye'
        }
    })

    for (var i = 0; i < formularyInputs.length; i++){
        formularyInputs[i].addEventListener('input', function (){
            let formularyInputs = document.getElementsByTagName("input")
            for (var i = 0; i < formularyInputs.length; i++){
                if (formularyInputs[i].parentNode.classList.contains('on-error')){
                    formularyInputs[i].parentNode.classList.remove('on-error')
                }

                let currentFormularyErrorText = document.querySelector(`.login-section__${formularyInputs[i].id.toString()}-error-text`)
                if (currentFormularyErrorText.classList.contains('show-error-message')){
                    currentFormularyErrorText.classList.remove('show-error-message') 
                }

                if (formularyInputs[i].id == 'password-input'){
                    if (formularyInputs[i].value != ''){
                        passwordInputVisibleButton.style.display = 'block'
                    }else{
                        passwordInputVisibleButton.style.display = 'none'
                    }
                }
            }
        })
    }
}

const setFieldsState = (currentField, ErrorMessage, onError) =>{
    if (onError == true){
        if (currentField.parentNode.classList.contains('on-error') == false){
            currentField.parentNode.classList.add('on-error')
        }

        const currentFieldErrorMessage = document.querySelector(`.login-section__${currentField.id.toString()}-error-text`)

        currentFieldErrorMessage.innerText = ErrorMessage

        if (currentFieldErrorMessage.classList.contains('show-error-message') == false){
            currentFieldErrorMessage.classList.add('show-error-message')
        }
    }
}

const usernameInput = document.querySelector('#username-input')
const passwordInput = document.querySelector('#password-input') 

function login(){
    if (usernameInput.value == ''){
        setFieldsState(usernameInput, 'Username is required.', true)
    }
    if (passwordInput.value == ''){
        setFieldsState(passwordInput, 'Password is required.', true)
    }

    const InputsOnError = document.getElementsByClassName('on-error')

    if (InputsOnError.length == 0){
        window.open('organizer.html', '_self')
    }
}