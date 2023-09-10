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
    
    //create container tab
    const categorieTabModel = document.querySelector('.to-do-section__alt-categories-tabs-container__to-do-categories-tab')

    let newCategorieTab = document.createElement('div')
    newCategorieTab.innerHTML = categorieTabModel.innerHTML
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
    if (addNewCardTab.classList.contains('active-tab')){
        addNewCardTab.classList.remove('active-tab')
    }
    if (screenSaver.classList.contains('active')){
        screenSaver.classList.remove('active')
    }
})

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
    
