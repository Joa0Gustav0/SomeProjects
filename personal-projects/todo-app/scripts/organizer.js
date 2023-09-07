const addCategoriesButton = document.querySelector('.to-do-section__add-categorie-button')

addCategoriesButton.addEventListener('click', () => {
    const categorieContainerModel = document.querySelector('.to-do-section__other-categorie-containers-model-example')
    let newCategorieContainer = document.createElement('div')
    newCategorieContainer.innerHTML = categorieContainerModel.innerHTML

    const toDoSection = document.querySelector('.to-do-section')
    toDoSection.appendChild(newCategorieContainer)

    let otherCategoriesContainers = document.getElementsByClassName('to-do-section__other-categorie-containers')
    newCategorieContainer.className = `to-do-section__categorie-containers to-do-section__other-categorie-containers to-do-section__other${otherCategoriesContainers.length + 1}-categorie-containers`

    const newCategorieContainerName = newCategorieContainer.childNodes[1]
    newCategorieContainerName.innerHTML = `<ion-icon name="book"></ion-icon> Other ${otherCategoriesContainers.length}`
})