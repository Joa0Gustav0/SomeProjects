const navbar = document.querySelector('.alt-navbar')
const goTopButton = document.querySelector('.go-top-button')

function navbarFunctions(currentButton){
    if (currentButton.name == 'menu-sharp'){
        navbar.classList.add('open')
    }
    if (currentButton.name == 'close-sharp'){
        navbar.classList.remove('open')
    }
}

window.onscroll = function scrolling(){
    if (window.scrollY > 50){
        goTopButton.classList.add('active')
    }else{
        goTopButton.classList.remove('active')
    }
}

//STORE
let searchBar = document.querySelector('#search-bar')
let cleanButton = document.querySelector('.clean-button')

//Select products categories
function SetCategoriesState(currentButton){
    if (currentButton.classList.contains('categorie-selected')){
        currentButton.classList.remove('categorie-selected')
    }else{
        let allButtons = document.getElementsByClassName('categories-bar-buttons')
        for (let i = 0; i < allButtons.length; i++){
            if (allButtons[i].classList.contains('categorie-selected')){
                allButtons[i].classList.remove('categorie-selected')
            }
        }
        currentButton.classList.add('categorie-selected')
    }
    
}

//clean search bar button appears and disappears
function cleanButtonState(){
    if (searchBar.value != ''){
        cleanButton.style.display = 'block'
    }else{
        cleanButton.style.display = 'none'
    }
}

//clean search bar
function cleanSearchBar(){
    searchBar.value = ''
    cleanButton.style.display = 'none'
}
