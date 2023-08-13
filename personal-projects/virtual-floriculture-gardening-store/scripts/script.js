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

//PRODUCT INFO TAB
let productPictureSpace = document.querySelector('.selected-product-picture > img')
let productNameSpace = document.querySelector('.selected-product-name')
let productPriceSpace = document.querySelector('.selected-product-price')
let productDescriptionSpace = document.querySelector('.selected-product-description')
let totalPrice = document.querySelector('.selected-product-total-price')

//change selected product quantity
let quantityNumber = document.querySelector('.selected-product-price-quantity__quantity > h1')
let quantity = 0

function changeQuantity(currentQuantityButton){
    if (productNameSpace.innerText == "---"){
        window.alert('PLEASE, FIRSTLY, SELECT A PRODUCT.')
    }else if (productNameSpace.innerText != "---"){
        if (currentQuantityButton.name == 'add-outline'){
            quantity = quantity + 1
            quantityNumber.innerText = `${quantity}`
        }else if (currentQuantityButton.name == 'remove-outline'){
            if (quantity >= 1){
                quantity = quantity - 1
                quantityNumber.innerText = `${quantity}`
            }
        }
        function calculateTotalPrice(){
            let currentProductPrice = document.querySelector(`.selected-product-price`)
            let productPrice = currentProductPrice.innerText
            let numberPrice = ''
            for (let i = 1; i < productPrice.length; i++){
                numberPrice = numberPrice + productPrice[i]
            }
            totalPrice.innerText = `$${(Number(numberPrice) * quantity).toFixed(2)}`
        }
        calculateTotalPrice()
    }
}

//select product
function selectProduct(selectedProduct){
    let productPicture = document.querySelector(`#${selectedProduct.id} .product__picture`)
    let productName = document.querySelector(`#${selectedProduct.id} .product__name`)
    let productPrice = document.querySelector(`#${selectedProduct.id} .product__price`)
    let productDescription = document.querySelector(`#${selectedProduct.id} .product__description`)

    quantity = 0
    quantityNumber.innerText = `${quantity}`
    totalPrice.innerText = "$00.00"
    productPictureSpace.src = productPicture.src
    productNameSpace.innerText = productName.innerText
    productPriceSpace.innerText = productPrice.innerText
    productDescriptionSpace.innerText = productDescription.innerText
}

//clean products info tab
function cleanProductInfoTab(){
    productPictureSpace.src = ''
    productNameSpace.innerText = '---'
    productPriceSpace.innerText = '$00.00'
    productDescriptionSpace.innerText = '...'
    quantity = 0
    quantityNumber.innerText = `${quantity}`
    totalPrice.innerText = "$00.00"
}

//CART
let cartProductsList = document.querySelector('.cart-products')
let cartEmptySign = document.querySelector('.cart-empty-sign')
let productCartContainerModel = document.querySelector('.default-cart-added-product-container')

//detect the presence of products inside cart
function detectPresenceAtCart(){
    if (cartProductsList.innerHTML != '<h1 class="cart-empty-sign">The cart is empty...</h1>' && cartProductsList.innerHTML == ''){
        cartEmptySign.style.display = 'block'
    }
    if (cartProductsList.innerHTML.length > 53){
        cartEmptySign.style.display = 'none'
    }
}

//add product to cart list
function addProductToCart(){
    if (productNameSpace == "---" || Number(quantityNumber.innerText) <= 0){
        window.alert('Please, select a product adding a minimum quantity of one unit of the product.')
    }else{
        let productCartContainer = document.createElement('div')
        productCartContainer.className = `cart-added-product-container`
        productCartContainer.innerHTML = productCartContainerModel.innerHTML
        cartProductsList.appendChild(productCartContainer)

        let productCartContainerPicture = document.querySelector(`.${productCartContainer.className}:last-child img`)
        let productCartContainerName = document.querySelector(`.${productCartContainer.className}:last-child .cart-added-product-container__product-name`)
        let productCartContainerPrice = document.querySelector(`.${productCartContainer.className}:last-child .cart-added-product-container__product-price-quantity > h1`)
        let productCartContainerQuantity = document.querySelector(`.${productCartContainer.className}:last-child .cart-added-product-container__product-price-quantity__quantity > h1`)
        productCartContainerPicture.src = productPictureSpace.src
        productCartContainerName.innerText = productNameSpace.innerText
        productCartContainerPrice.innerText = totalPrice.innerText
        productCartContainerQuantity.innerText = quantityNumber.innerText
        detectPresenceAtCart()
    }
}

function clearCartProductsList(){
    cartProductsList.innerHTML = '<h1 class="cart-empty-sign">The cart is empty...</h1>'
    console.log(cartProductsList.innerHTML.length)
}