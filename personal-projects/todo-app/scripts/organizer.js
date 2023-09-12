const addCategoriesButton = document.querySelector('.to-do-section__add-categorie-button')
const removeCategorieButton = document.querySelectorAll('.to-do-section__categorie-containers__delete-categorie-button')

//Create new containers
addCategoriesButton.addEventListener('click', () => {
    //create container
    const categorieContainerModel = document.querySelector('.to-do-section__other-categorie-containers-model-example')
    let newCategorieContainer = document.createElement('div')
    newCategorieContainer.innerHTML = categorieContainerModel.innerHTML

    const toDoSection = document.querySelector('.to-do-section')
    toDoSection.appendChild(newCategorieContainer)

    let otherCategoriesContainers = document.getElementsByClassName('to-do-section__other-categorie-containers')
    newCategorieContainer.className = `to-do-section__categorie-containers to-do-section__other-categorie-containers to-do-section__other${otherCategoriesContainers.length + 1}-categorie-container other${otherCategoriesContainers.length + 1}`

    const newCategorieContainerName = newCategorieContainer.childNodes[1]
    newCategorieContainerName.innerHTML = `<ion-icon name="book"></ion-icon> Other ${otherCategoriesContainers.length}`
    for (var i = 0; i < addNewCardButton.length; i++){
        addNewCardButton[i].addEventListener('click', () => {
            if (screenSaver.classList.contains('active') == false){
                screenSaver.classList.add('active')
            }
            if (addNewCardTab.classList.contains('active-tab') == false){
                addNewCardTab.classList.add('active-tab')
            }
        })
    }
    
    //create container tab
    const categorieTabModel = document.querySelector('.to-do-section__alt-categories-tabs-container__to-do-categories-tab')

    let newCategorieTab = document.createElement('div')
    newCategorieTab.innerHTML = categorieTabModel.innerHTML
    newCategorieTab.childNodes[1].name = 'book'
    newCategorieTab.className = `to-do-section__alt-categories-tabs-container__to-do-categories-tab to-do-section__alt-categories-tabs-container__other-categories-tab to-do-section__alt-categories-tabs-container__other${otherCategoriesContainers.length}-categories-tab`
    newCategorieTab.id = `other${otherCategoriesContainers.length}`
    newCategorieTab.childNodes[3].innerText = `Other ${otherCategoriesContainers.length}`
    newCategorieTab.addEventListener('click', () => {
        const currentCategorie = document.querySelector(`.to-do-section__${newCategorieTab.id}-categorie-container`)

        for (var i = 0; i < allContainers.length; i++){
            allContainers[i].style.display = 'none'
        }
        currentCategorie.style.display = 'flex'
    })

    const categoriesTabsContainer = document.querySelector('.to-do-section__alt-categories-tabs-container')
    categoriesTabsContainer.appendChild(newCategorieTab)

    reorganizeCreatedContainers()

    if (window.matchMedia('(max-width: 759px)').matches){
        for (var i = 0; i < allContainers.length; i++){
            allContainers[i].style.display = 'none'
        }
        newCategorieContainer.style.display = 'flex'
    }
})

//Remove containers
const removeCurrentContainer = (currentButton) =>{
    //set main to do container visible when the removed container is the displayed one
    let currentContainer = null

    for (var i = 0; i < allContainers.length; i++){
        if (allContainers[i].style.display == 'flex'){
            currentContainer = allContainers[i].classList[3]
        }
    }
    
    currentButton.parentNode.remove()

    const currentTab = document.querySelector(`#${currentButton.parentNode.classList[3]}`)
    currentTab.remove()

    reorganizeCreatedContainers()

    if (window.matchMedia('(max-width: 759px)').matches){
        if (currentContainer != null){
            for (var i = 0; i < allContainers.length; i++){
                allContainers[i].style.display = 'none'
            }
            allContainers[allContainers.length - 1].style.display = 'flex'
        }
    }
}

//rename other's containers
const reorganizeCreatedContainers = () => {
    const otherContainers = document.getElementsByClassName('to-do-section__other-categorie-containers')

    for (var i = 0; i < otherContainers.length; i++){
        otherContainers[i].className = `to-do-section__categorie-containers to-do-section__other-categorie-containers to-do-section__other${i + 1}-categorie-container other${i + 1}`
        otherContainers[i].childNodes[1].innerHTML = `<ion-icon name="book"></ion-icon> Other ${i + 1}`
    }

    const otherTabs = document.getElementsByClassName('to-do-section__alt-categories-tabs-container__other-categories-tab')

    for (var i = 0; i < otherTabs.length; i++){
        otherTabs[i].className = `to-do-section__alt-categories-tabs-container__to-do-categories-tab to-do-section__alt-categories-tabs-container__other-categories-tab to-do-section__alt-categories-tabs-container__other${i + 1}-categories-tab`
        otherTabs[i].id = `other${i + 1}`
        otherTabs[i].childNodes[3].innerText = `Other ${i + 1}`
    }
}

const addNewCardButton = document.getElementsByClassName('to-do-section__categorie-containers__add-card-button')
const screenSaver = document.querySelector('.screen-saver')
const addNewCardTab = document.querySelector('.to-do-section__screen-saver__add-card-tab')
const cancelTabButton = document.querySelector('#add-card-tab-cancel-button')
let containerToAdd = undefined

//get current container to add
function getCurrentContainer(currentAddButton){
    containerToAdd = currentAddButton.parentNode
}

//open screen saver and add card tab
for (var i = 0; i < addNewCardButton.length; i++){
    addNewCardButton[i].addEventListener('click', () => {
        if (screenSaver.classList.contains('active') == false){
            screenSaver.classList.add('active')
        }
        if (addNewCardTab.classList.contains('active-tab') == false){
            addNewCardTab.classList.add('active-tab')
        }
    })
}

//close add card tab and screen saver
cancelTabButton.addEventListener('click', () => {
    cardTabInput.value = ''
    resetCardTabInputState()
    if (addNewCardTab.classList.contains('active-tab')){
        addNewCardTab.classList.remove('active-tab')
    }
    if (screenSaver.classList.contains('active')){
        screenSaver.classList.remove('active')
    }
})

//add card
const cardTabAddButton = document.querySelector('#add-card-tab-add-button')
const cardTabInput = document.querySelector('#card-text-input')
const cardTabInputErrorText = document.querySelector('.to-do-section__screen-saver__add-card-tab__input-error-text')

cardTabAddButton.addEventListener('click', (c) => {
    let taskText = cardTabInput.value
    if (taskText == ''){
        if (cardTabInput.classList.contains('input-error') == false){
            cardTabInput.classList.add('input-error')
        }
        if (cardTabInputErrorText.classList.contains('error-text-active') == false){
            cardTabInputErrorText.classList.add('error-text-active')
        }
    }else{
        cardTabInput.value = ''
        resetCardTabInputState()
        if (addNewCardTab.classList.contains('active-tab')){
            addNewCardTab.classList.remove('active-tab')
        }
        if (screenSaver.classList.contains('active')){
            screenSaver.classList.remove('active')
        }
        
        //create card
        const cardModel = document.querySelector('.to-do-section__categorie-containers__cards-list__card-model')
        let newCard = document.createElement('div')
        newCard.className = 'to-do-section__categorie-containers__cards-list__card'
        newCard.innerHTML = cardModel.innerHTML
        newCard.childNodes[3].innerText = taskText

        containerToAdd.childNodes[3].appendChild(newCard)
        containerToAdd.childNodes[3].scrollTo(newCard)
    }
})
//reset input state
cardTabInput.addEventListener('input', () => {
    if (cardTabInput.classList.contains('input-error')){
        cardTabInput.classList.remove('input-error')
    }
    if (cardTabInputErrorText.classList.contains('error-text-active')){
        cardTabInputErrorText.classList.remove('error-text-active')
    }
})

const resetCardTabInputState = () => {
    if (cardTabInput.classList.contains('input-error')){
        cardTabInput.classList.remove('input-error')
    }
    if (cardTabInputErrorText.classList.contains('error-text-active')){
        cardTabInputErrorText.classList.remove('error-text-active')
    }
}

//open screen saver and delete card tab
const deleteCardTab = document.querySelector('.to-do-section__screen-saver__delete-card-alert-tab')
let currentDeletingContainer = undefined

function openDeleteTab(currentDeleteButton){
    currentDeletingContainer = currentDeleteButton.parentNode.parentNode.parentNode
    if (screenSaver.classList.contains('active') == false){
        screenSaver.classList.add('active')
    }
    if (deleteCardTab.classList.contains('active-tab') == false){
        deleteCardTab.classList.add('active-tab')
    }
}

//delete card cancel or delete and close delete card tab and screen saver
const deleteCardTabYesButton = document.querySelector('#yes-delete-input-button')
const deleteCardTabNoButton = document.querySelector('#no-delete-input-button')

deleteCardTabNoButton.addEventListener('click', () => {
    if (deleteCardTab.classList.contains('active-tab')){
        deleteCardTab.classList.remove('active-tab')
    }
    if (screenSaver.classList.contains('active')){
        screenSaver.classList.remove('active')
    }
})
deleteCardTabYesButton.addEventListener('click', () => {
    currentDeletingContainer.remove()
    if (deleteCardTab.classList.contains('active-tab')){
        deleteCardTab.classList.remove('active-tab')
    }
    if (screenSaver.classList.contains('active')){
        screenSaver.classList.remove('active')
    }
})

//open screen saver and change categorie tab
const changeCategorieTab = document.querySelector('.to-do-section__screen-saver__change-categorie-tab')
const availableCategoriesList = document.querySelector('.to-do-section__screen-saver__change-categorie-tab__available-categories')
const availableCategoriesButtonsModel = document.querySelector('.available-categories-categories-button-model')
const categoriesTabs = document.getElementsByClassName('to-do-section__alt-categories-tabs-container__to-do-categories-tab')
let cardToSetCategorie = null

function openChangeCategorieTab(currentButton){
    cardToSetCategorie = currentButton.parentNode.parentNode.parentNode
    if (screenSaver.classList.contains('active') == false){
        screenSaver.classList.add('active')
    }

    availableCategoriesList.innerHTML = ''
    for (var i = 0; i < categoriesTabs.length; i++){
        let newAvailableCategorieButton = document.createElement('div')
        newAvailableCategorieButton.id = categoriesTabs[i].id
        newAvailableCategorieButton.className = 'to-do-section__screen-saver__change-categorie-tab__available-categories-categories-button'
        newAvailableCategorieButton.innerHTML = availableCategoriesButtonsModel.innerHTML
        newAvailableCategorieButton.innerHTML = categoriesTabs[i].innerHTML
        newAvailableCategorieButton.setAttribute('onclick', 'changeCardCategorie(this)')

        availableCategoriesList.appendChild(newAvailableCategorieButton)
    }

    changeCategorieTab.classList.add('active-tab')
}
function changeCardCategorie(choosenCategorieButton){
    let choosenCategorie = document.querySelector(`.to-do-section__${choosenCategorieButton.id}-categorie-container > .to-do-section__categorie-containers__cards-list`)
    choosenCategorie.appendChild(cardToSetCategorie)
    if (screenSaver.classList.contains('active')){
        screenSaver.classList.remove('active')
    }
    if (changeCategorieTab.classList.contains('active-tab')){
        changeCategorieTab.classList.remove('active-tab')
    }
    if (window.matchMedia('(max-width: 759px)').matches){
        for (var i = 0; i < allContainers.length; i++){
            allContainers[i].style.display = 'none'
        }
        choosenCategorie.parentNode.style.display = 'flex'
    }
}

//close change card categorie tab and screen saver
function closeChangeCategorieTab(){
    if (screenSaver.classList.contains('active')){
        screenSaver.classList.remove('active')
    }
    if (changeCategorieTab.classList.contains('active-tab')){
        changeCategorieTab.classList.remove('active-tab')
    }
}

/*RESPONSIVINESS*/
const allContainers = document.getElementsByClassName('to-do-section__categorie-containers')
const allOtherContainers = document.getElementsByClassName('to-do-section__other-categorie-containers')
let matchTheSize = false

window.onload = () => {
    if (window.matchMedia('(max-width: 759px)').matches){
        if (matchTheSize == false){
            for (var i = 0; i < allContainers.length; i++){
                allContainers[i].style.display = 'none'
            }
            allContainers[0].style.display = 'flex'
            matchTheSize = true
        }
    }
    if (window.matchMedia('(min-width: 760px)').matches){
        for (var i = 0; i < allContainers.length; i++){
            allContainers[i].style.display = 'flex'
        }
        matchTheSize = false
    }
}

window.addEventListener('resize', () => {
    if (window.matchMedia('(max-width: 759px)').matches){
        if (matchTheSize == false){
            for (var i = 0; i < allContainers.length; i++){
                allContainers[i].style.display = 'none'
            }
            allContainers[0].style.display = 'flex'
            matchTheSize = true
        }
    }
    if (window.matchMedia('(min-width: 760px)').matches){
        for (var i = 0; i < allContainers.length; i++){
            allContainers[i].style.display = 'flex'
        }
        matchTheSize = false
    }
})

//navigate through containers using the tabs
const setCurrentContainerVisible = (currentTab) => {
    const currentCategorie = document.querySelector(`.to-do-section__${currentTab.id}-categorie-container`)

    for (var i = 0; i < allContainers.length; i++){
        allContainers[i].style.display = 'none'
    }
    currentCategorie.style.display = 'flex'
}
    
