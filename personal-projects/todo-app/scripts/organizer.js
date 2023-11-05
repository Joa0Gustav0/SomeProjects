//Create new containers
const addCategoriesButton = document.querySelector('.to-do-section__add-categorie-button')
const removeCategorieButton = document.querySelectorAll('.to-do-section__categorie-containers__delete-categorie-button')

addCategoriesButton.addEventListener('click', () => {
    if (allContainers.length < 10) {

    
    //create container
    const categorieContainerModel = document.querySelector('.to-do-section__other-categorie-containers-model-example')
    let newCategorieContainer = document.createElement('div')
    newCategorieContainer.innerHTML = categorieContainerModel.innerHTML

    const toDoSection = document.querySelector('.to-do-section')
    toDoSection.appendChild(newCategorieContainer)

    let otherCategoriesContainers = document.getElementsByClassName('to-do-section__other-categorie-containers')
    newCategorieContainer.className = `to-do-section__categorie-containers to-do-section__other-categorie-containers to-do-section__other${otherCategoriesContainers.length + 1}-categorie-container other${otherCategoriesContainers.length + 1} c-purple`

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
        otherContainers[i].className = `to-do-section__categorie-containers to-do-section__other-categorie-containers to-do-section__other${i + 1}-categorie-container other${i + 1} ${otherContainers[i].classList[otherContainers[i].classList.length - 1]}`
        otherContainers[i].childNodes[1].innerHTML = `<ion-icon name="book"></ion-icon> Other ${i + 1}`
    }

    const otherTabs = document.getElementsByClassName('to-do-section__alt-categories-tabs-container__other-categories-tab')

    for (var i = 0; i < otherTabs.length; i++){
        otherTabs[i].className = `to-do-section__alt-categories-tabs-container__to-do-categories-tab to-do-section__alt-categories-tabs-container__other-categories-tab to-do-section__alt-categories-tabs-container__other${i + 1}-categories-tab`
        otherTabs[i].id = `other${i + 1}`
        otherTabs[i].childNodes[3].innerText = `Other ${i + 1}`
    }
}

//open and close color set containers
function setColorsContainerState(colorsContainer){
    if (colorsContainer.classList.contains('set-color-active') == false){
        colorsContainer.classList.add('set-color-active')   
    }else{
        colorsContainer.classList.remove('set-color-active')
    }
}

function setContainerColor(currentColorButton){
    const currentColorsContainer = currentColorButton.parentNode
    const currentContainer = currentColorsContainer.parentNode

    if (currentColorsContainer.clientHeight == '200'){
        console.log(currentContainer.classList[currentContainer.classList.length - 1])
        if (currentContainer.classList[currentContainer.classList.length - 1][0] == 'c'){
            currentContainer.classList.remove(`${currentContainer.classList[currentContainer.classList.length - 1]}`)
            if (currentColorButton.classList[1] == 'purple-color'){
                currentContainer.classList.add('c-purple')
                console.log('classList.added(c-purple)')
            }
            if (currentColorButton.classList[1] == 'blue-color'){
                currentContainer.classList.add('c-blue')
                console.log('classList.added(c-blue)')
            }
            if (currentColorButton.classList[1] == 'green-color'){
                currentContainer.classList.add('c-green')
                console.log('classList.added(c-green)')
            }
            if (currentColorButton.classList[1] == 'yellow-color'){
                currentContainer.classList.add('c-yellow')
                console.log('classList.added(c-yellow)')
            }
            if (currentColorButton.classList[1] == 'pink-color'){
                currentContainer.classList.add('c-pink')
                console.log('classList.added(c-pink)')
            }
        }
        currentColorsContainer.insertBefore(currentColorButton, currentColorsContainer.childNodes[0])
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

//open screen saver and edit card text tab
const editCardTextTab = document.querySelector('.to-do-section__screen-saver__edit-card-text-tab')
const editCardTextTabInput = document.querySelector('#edit-card-text-input')
const editCardTextCancelButton = document.querySelector('#edit-card-cancel-button')
const editCardTextConfirmButton = document.querySelector('#edit-card-confirm-button')
let currentCardText = undefined

function openEditCardTextTab(currentText){
    currentCardText = currentText
    editCardTextTabInput.value = currentCardText.innerText
    if (screenSaver.classList.contains('active') == false){
        screenSaver.classList.add('active')
    }
    if (editCardTextTab.classList.contains('active-tab') == false){
        editCardTextTab.classList.add('active-tab')
    }
}

//edit card text tab cancel button
editCardTextCancelButton.addEventListener('click', () => {
    editCardTextTabInput.value = ''
    if (editCardTextTab.classList.contains('active-tab')){
        editCardTextTab.classList.remove('active-tab')
    }
    if (screenSaver.classList.contains('active')){
        screenSaver.classList.remove('active')
    }
})

//edit card text tab confirm button
editCardTextConfirmButton.addEventListener('click', () => {
    if (editCardTextTabInput.value != '' && editCardTextTabInput.value != currentCardText.innerText){
        currentCardText.innerText = editCardTextTabInput.value
        if (editCardTextTab.classList.contains('active-tab')){
            editCardTextTab.classList.remove('active-tab')
        }
        if (screenSaver.classList.contains('active')){
            screenSaver.classList.remove('active')
        }
    }
})

//change edit card text confirm button's style
editCardTextTabInput.addEventListener('input', () => {
    if (editCardTextTabInput.value != '' && editCardTextTabInput.value != currentCardText.innerText){
        editCardTextConfirmButton.classList.add('available-button')
    }
    if (editCardTextTabInput.value == '' || editCardTextTabInput.value == currentCardText.innerText){
        editCardTextConfirmButton.classList.remove('available-button')
    }
})

//send card to the top button
function sendCardToTop(currentButton){
    let currentCard = currentButton.parentNode.parentNode.parentNode
    let currentContainerCardsList = currentCard.parentNode
    console.log(currentContainerCardsList.parentNode.childNodes[1].innerText)
    let currentContainerAllCards = document.querySelectorAll(`.${currentContainerCardsList.parentNode.classList[2]} .to-do-section__categorie-containers__cards-list__card`)
    if (currentContainerCardsList.parentNode.childNodes[1].innerText == 'To do' ||
    currentContainerCardsList.parentNode.childNodes[1].innerText == 'Doing' ||
    currentContainerCardsList.parentNode.childNodes[1].innerText == 'Done'){
        currentContainerAllCards = document.querySelectorAll(`.${currentContainerCardsList.parentNode.classList[0]} .to-do-section__categorie-containers__cards-list__card`)
    }
    currentContainerCardsList.insertBefore(currentCard, currentContainerAllCards[0])
}

//open generate classic to do list
const generateClassicSideBar = document.querySelector('.to-do-section__screen-saver__classic-todo-list-sidebar')

function setGenerateButtonState(generateButton){
    let generateButtonStyle = getComputedStyle(generateButton)
    if (generateButtonStyle.getPropertyValue('right') == '0px'){
        adjustClassicTodoList()
        if (screenSaver.classList.contains('active') == false){
            screenSaver.classList.add('active')
        }
        if (generateClassicSideBar.classList.contains('sidebar-active') == false){
            generateClassicSideBar.classList.add('sidebar-active')
        }
    }
}

const adjustClassicTodoList = () =>{
    generateClassicSideBar.innerHTML = '<ion-icon name="print" class="to-do-section__screen-saver__classic-todo-list-sidebar__print-button" onmousedown="printClassicList()"></ion-icon> <ion-icon name="close" class="to-do-section__screen-saver__classic-todo-list-sidebar__close-button" onmousedown="closeGenerateClassicSideBar()"></ion-icon>'
    for (var i = 0; i < allContainers.length; i++){
       //get containers title and write
       let containerTitle = allContainers[i].childNodes[1]
       let newListTitle = document.createElement('h1')
       newListTitle.innerHTML = containerTitle.innerHTML
       generateClassicSideBar.appendChild(newListTitle)

       //create ul for list
       let newListTasksContainer = document.createElement('ul')
       generateClassicSideBar.appendChild(newListTasksContainer)
        
        //get containers task cards and write at created ul
        let containerTaskTexts
        if (i < 3){
            containerTaskTexts = document.querySelectorAll(`.${allContainers[i].classList[0]} .to-do-section__categorie-containers__cards-list__card__task-text`)
        }else if (i >= 3){
            containerTaskTexts = document.querySelectorAll(`.${allContainers[i].classList[2]} .to-do-section__categorie-containers__cards-list__card__task-text`)
        }
        for (var i_b = 0; i_b < containerTaskTexts.length; i_b++){
            let newListItem = document.createElement('li')
            newListItem.innerText = containerTaskTexts[i_b].innerText
            newListTasksContainer.appendChild(newListItem)
        }
        if (newListTasksContainer.innerHTML == ''){
            newListTasksContainer.innerHTML = '<p>There are no tasks for this categorie.</p>'
        }
    }
}

//close generate classic to do list
function closeGenerateClassicSideBar(){
    if (generateClassicSideBar.classList.contains('sidebar-active')){
        generateClassicSideBar.classList.remove('sidebar-active')
    }
    if (screenSaver.classList.contains('active')){
        screenSaver.classList.remove('active')
    }
}

//print generate classic to do list
const sideBarCloseButton = document.querySelector('.to-do-section__screen-saver__classic-todo-list-sidebar__close-button')
const header = document.querySelector('header')
const todoSection = document.querySelector('.to-do-section')
const footer = document.querySelector('.footer')

function printClassicList(){
    if (header.classList.contains('print-state') == false){
        header.classList.add('print-state')
    }
    if (todoSection.classList.contains('print-state') == false){
        todoSection.classList.add('print-state')
    }
    if (footer.classList.contains('print-state') == false){
        footer.classList.add('print-state')
    }
    if (sideBarCloseButton.classList.contains('print-state') == false){
        sideBarCloseButton.classList.add('print-state')
    }
    if (generateClassicSideBar.classList.contains('print-state') == false){
        generateClassicSideBar.classList.add('print-state')
    }
    window.print()
    if (header.classList.contains('print-state')){
        header.classList.remove('print-state')
    }
    if (todoSection.classList.contains('print-state')){
        todoSection.classList.remove('print-state')
    }
    if (footer.classList.contains('print-state')){
        footer.classList.remove('print-state')
    }
    if (generateClassicSideBar.classList.contains('print-state')){
        generateClassicSideBar.classList.remove('print-state')
    }
    if (sideBarCloseButton.classList.contains('print-state')){
        sideBarCloseButton.classList.remove('print-state')
    }
    if (generateClassicSideBar.classList.contains('sidebar-active')){
        generateClassicSideBar.classList.remove('sidebar-active')
    }
    if (screenSaver.classList.contains('active')){
        screenSaver.classList.remove('active')
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
    
