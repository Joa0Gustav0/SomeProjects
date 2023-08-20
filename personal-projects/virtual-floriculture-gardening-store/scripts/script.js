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
    if (goTopButton != undefined){
        if (window.scrollY > 50){
            goTopButton.classList.add('active')
        }else{
            goTopButton.classList.remove('active')
        }
    }
    
}

//TABS
let cartTab = document.querySelector('.cart-shopping-tab')
let infoTab = document.querySelector('.info-shopping-tab')
let pathIndex = document.getElementsByClassName('alt-store-navbar__path-index')

//STORE
let searchBar = document.querySelector('#search-bar')
let cleanButton = document.querySelector('.clean-button')
let storeProductsList = document.querySelector('.products-list')

function searchBarFunction(){
    cleanButtonState()
    function MatchResults(){
        /*if (searchBar.value[searchBar.value.length - 1] == ' '){
            searchBar.value[searchBar.value.length - 1] = 'a'
        }
        if (searchBar.value == ''){
            for (let i = 1; i < storeProductsList.childNodes.length - 1; i++){
                storeProductsList.childNodes[i].style.display = 'flex'
            }
        }else{
            let userSearch = searchBar.value.toUpperCase()
            for (let i = 1; i < storeProductsList.childNodes.length - 1; i++){
                for (let ib = 0; ib < userSearch.length; ib++){
                    let currentChar = storeProductsList.childNodes[i].id.toUpperCase()
                    if (currentChar[ib] == userSearch[ib]){
                        storeProductsList.childNodes[i].style.display = 'flex'
                    }else{
                        storeProductsList.childNodes[i].style.display = 'none'
                    }
                }
            }
        }*/
        let userSearch = searchBar.value.toUpperCase()
        //let storeProductsList
        let products = document.querySelectorAll(".product")
        let productsName = document.querySelectorAll(".product__name")

        for (let i = 0; i < productsName.length; i++){
            let match = products[i].getElementsByTagName('h1')[0]

            if (match){
                let textValue = match.textContent || match.innerHTML

                if (textValue.toUpperCase().indexOf(userSearch) > -1){
                    products[i].style.display = ''
                }else{
                    products[i].style.display = 'none'
                }
            }
        }
    }
    MatchResults()
}

//Select products categories
let categoriesSelected = false
function SetCategoriesState(currentButton){
    if (currentButton.classList.contains('categorie-selected')){
        currentButton.classList.remove('categorie-selected')
        categoriesSelected = false
    }else{
        let allButtons = document.getElementsByClassName('categories-bar-buttons')
        for (let i = 0; i < allButtons.length; i++){
            if (allButtons[i].classList.contains('categorie-selected')){
                allButtons[i].classList.remove('categorie-selected')
            }
        }
        currentButton.classList.add('categorie-selected')
        categoriesSelected = true
    }
    function organizeProductsByCategories(){
        for (let i = 1; i < storeProductsList.childNodes.length - 1; i++){
            if (currentButton.getAttribute('name').toString() == 'flower-categorie'){
                if (storeProductsList.childNodes[i].className == 'product product-flower-type'){
                    if (storeProductsList.childNodes[i].style.display != 'none'){
                        storeProductsList.childNodes[i].style.display = 'flex'
                    }
                }else{
                    storeProductsList.childNodes[i].style.display = 'none'
                }
            }
            if (currentButton.getAttribute('name').toString() == 'plants-categorie'){
                if (storeProductsList.childNodes[i].className == 'product product-plants-type'){
                    if (storeProductsList.childNodes[i].style.display != 'none'){
                        storeProductsList.childNodes[i].style.display = 'flex'
                    }
                }else{
                    storeProductsList.childNodes[i].style.display = 'none'
                }
            }
            if (currentButton.getAttribute('name').toString() == 'tools-categorie'){
                if (storeProductsList.childNodes[i].className == 'product product-tools-type'){
                    if (storeProductsList.childNodes[i].style.display != 'none'){
                        storeProductsList.childNodes[i].style.display = 'flex'
                    }
                }else{
                    storeProductsList.childNodes[i].style.display = 'none'
                }
            }
        }
        
    }
    organizeProductsByCategories()
    if (categoriesSelected == false){
        for (let i = 1; i < storeProductsList.childNodes.length - 1; i++){
            storeProductsList.childNodes[i].style.display = 'flex'
        }
        searchBarFunction()
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
    for (let i = 1; i < storeProductsList.childNodes.length - 1; i++){
        storeProductsList.childNodes[i].style.display = 'flex'
    }
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

    showInfoTab()
}

function showInfoTab(){
    if (infoTab.classList.contains('info-opened') == false){
        infoTab.classList.add('info-opened')
    }
}
function unshowInfoTab(){
    if (infoTab.classList.contains('info-opened')){
        infoTab.classList.remove('info-opened')
    }
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

    unshowInfoTab()
}

//CART
let cartProductsList = document.querySelector('.cart-products')
let productCartContainerModel = document.querySelector('.default-cart-added-product-container')
let cartSubTotalValue = document.querySelector('.cart-shopping-tab__total-price-container__products-price__subtotal')
let cartShippingValue = document.querySelector(".cart-shopping-tab__total-price-container__products-price__shipping")
let cartDiscountValue = document.querySelector('.cart-shopping-tab__total-price-container__products-price__discount')
let cartClearButton = document.querySelector('.clear-cart-button')
let cartPreCheckoutQuantity = document.querySelector(".cart-end-quantity")
let cartPreCheckoutPrice = document.querySelector(".cart-end-price")
let promoCodeInput = document.querySelector('#promo-code-text')

//detect the presence of products inside cart
function detectPresenceAtCart(){
    if (cartProductsList.childNodes.length > 1 && String(cartProductsList.childNodes[0].innerHTML) == 'The cart is empty...'){
        cartProductsList.childNodes[0].remove()
    }
}

function setClearCartButtonInfo(){
    cartClearButton.innerText = `(Clear ${cartProductsList.childNodes.length})`
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

        let foundSameProduct = false
        for (let i = 0; i < cartProductsList.childNodes.length && foundSameProduct == false; i++){
            let preparedClassName = ''
            for (let i = 0; i < productNameSpace.innerText.length; i++){
                if (productNameSpace.innerText[i] != ' '){
                    preparedClassName = preparedClassName + productNameSpace.innerText[i].toString()
                }
                if (productNameSpace.innerText[i] == ' '){
                    preparedClassName = preparedClassName + '-'
                }  
            }
            if (cartProductsList.childNodes[i] != undefined && cartProductsList.childNodes[i].classList.contains(`${preparedClassName}`)){
                foundSameProduct = true
                cartProductsList.childNodes[cartProductsList.childNodes.length - 1].remove()
            }
        }

        if (foundSameProduct == false){
            let productCartContainerPicture = document.querySelector(`.${productCartContainer.className}:last-child img`)
            let productCartContainerName = document.querySelector(`.${productCartContainer.className}:last-child .cart-added-product-container__product-name`)
            let productCartContainerPrice = document.querySelector(`.${productCartContainer.className}:last-child .cart-added-product-container__product-price-quantity > h1`)
            let productCartContainerQuantity = document.querySelector(`.${productCartContainer.className}:last-child .cart-added-product-container__product-price-quantity__quantity > h1`)
            productCartContainerPicture.src = productPictureSpace.src
            productCartContainerName.innerText = productNameSpace.innerText
            productCartContainerPrice.innerText = totalPrice.innerText
            productCartContainerQuantity.innerText = quantityNumber.innerText
            let preparedClassName = ''
            for (let i = 0; i < productNameSpace.innerText.length; i++){
                if (productNameSpace.innerText[i] != ' '){
                    preparedClassName = preparedClassName + productNameSpace.innerText[i].toString()
                }
                if (productNameSpace.innerText[i] == ' '){
                    preparedClassName = preparedClassName + '-'
                }  
            }
            cartProductsList.childNodes[cartProductsList.childNodes.length - 1].classList.add(`${preparedClassName}`)
            cartProductsList.childNodes[cartProductsList.childNodes.length - 1].setAttribute('id', `${productPriceSpace.innerText}`)
            let productId = cartProductsList.childNodes[cartProductsList.childNodes.length - 1].getAttribute('id').toString()
            let productIdNumber = ''
            for (let i = 1; i < productId.length; i++){
                productIdNumber = productIdNumber + productId[i]
            }
            cartProductsList.childNodes[cartProductsList.childNodes.length - 1].setAttribute('id', `${productIdNumber}`)
                 
            detectPresenceAtCart()
        }
        if (foundSameProduct == true){
            let preparedName = ''
            for (let i = 0; i < productNameSpace.innerText.length; i++){
                if (productNameSpace.innerText[i] != ' '){
                    preparedName = preparedName + productNameSpace.innerText[i].toString()
                }
                if (productNameSpace.innerText[i] == ' '){
                    preparedName = preparedName + '-'
                }  
            }
            let productCartContainerPrice = document.querySelector(`.${preparedName} .cart-added-product-container__product-price-quantity > h1`)
            let productCartContainerQuantity = document.querySelector(`.${preparedName} .cart-added-product-container__product-price-quantity__quantity > h1`)

            function calculateValuesForCart(){
                productCartContainerQuantity.innerText = (Number(quantityNumber.innerText) + Number(productCartContainerQuantity.innerText))

                let totalPriceValue = ''
                for (let i = 1; i < totalPrice.innerText.length; i++){
                    totalPriceValue = totalPriceValue + totalPrice.innerText[i]
                }
                let alreadyOnCartPrice = ''
                for (let i = 1; i < productCartContainerPrice.innerText.length; i++){
                    alreadyOnCartPrice = alreadyOnCartPrice + productCartContainerPrice.innerText[i]
                }
                productCartContainerPrice.innerText = `$${(Number(totalPriceValue) + Number(alreadyOnCartPrice)).toFixed(2)}`
            }
            calculateValuesForCart()
        }

        setClearCartButtonInfo()
        calculateCartEndValues()
        if (window.matchMedia("screen and (max-width: 1039px)").matches){
            showCartTab()
        }
    }
}
function showCartTab(){ 
    if (cartTab.classList.contains('cart-opened') == false){
        cartTab.classList.add('cart-opened')
    }
}
function unshowCartTab(){
    if (cartTab.classList.contains('cart-opened')){
        cartTab.classList.remove('cart-opened')
    }  
}

function changeQuantityAtCart(quantityPressedButton){
    let cartProductsQuantity = quantityPressedButton.parentNode.childNodes[1]
    let cartProductsPrice = quantityPressedButton.parentNode.parentNode.childNodes[0]

    function recalculateValues(){
        let currentProductInitialValue = quantityPressedButton.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('id')
        cartProductsPrice.innerText = `$${(Number(cartProductsQuantity.innerText) * Number(currentProductInitialValue)).toFixed(2)}`
        calculateCartEndValues()
    }
    if (quantityPressedButton.name == 'remove-sharp'){
        if (Number(cartProductsQuantity.innerText) > 1){
            cartProductsQuantity.innerText = Number(cartProductsQuantity.innerText) - 1
        }
    }
    if (quantityPressedButton.name == 'add-sharp'){
        cartProductsQuantity.innerText = Number(cartProductsQuantity.innerText) + 1
    }
    recalculateValues()
}
function deleteThisCartItem(deleteButtonOfCurrentProduct){
    deleteButtonOfCurrentProduct.parentNode.remove()
    setClearCartButtonInfo()
    calculateCartEndValues()
    if (cartProductsList.childNodes.length == 0){
        cartProductsList.innerHTML = '<h1 class="cart-empty-sign">The cart is empty...</h1>'
        cartClearButton.innerText = `(Clear 0)`
        cartSubTotalValue.innerText = '$00.00'
    }
}

const availablePromoCodes = [{code:'GARDENIAS100', discount: 100},{code: 'GARDENING25', discount: 25},{code: 'FLOWERFUL15', discount: 15}]
function SetPromoCode(){
    let promoCodeIsAvailable = false
    let availablePromoCodeIndex = undefined
    if (promoCodeInput.value.toUpperCase() == ''){
        window.alert('Please, insert a valid promo code.')
    }
    if (promoCodeInput.value.toUpperCase() != ''){
        for (let i = 0; i < availablePromoCodes.length; i++){
            if (promoCodeInput.value.toUpperCase() == availablePromoCodes[i].code){
                promoCodeIsAvailable = true
                availablePromoCodeIndex = i
            }
        }
        if (promoCodeIsAvailable == false){
            window.alert('Inavailable promo code.')
        }
        if (promoCodeIsAvailable == true){
            cartDiscountValue.innerText = `${availablePromoCodes[availablePromoCodeIndex].discount}%`
            window.alert(`Congratulations! A ${availablePromoCodes[availablePromoCodeIndex].discount}% discount promo was applied to your cart.`)
        }

        calculatePreCheckoutValues()
    }
}
function calculateCartEndValues(){
    let subTotalValue = 0
    cartSubTotalValue.innerText = `$00.00`
    let cartPreCheckoutQuantityNumber = 0
    
    for (let ia = 0; ia < cartProductsList.childNodes.length; ia++){
        if (cartProductsList.childNodes[ia].childNodes[0].checked){
            cartPreCheckoutQuantityNumber = cartPreCheckoutQuantityNumber + 1
            let intCurrentProductValue = ''
            let productValue = cartProductsList.childNodes[ia].childNodes[1].childNodes[1].childNodes[1].childNodes[0]
            for (let ib = 1; ib < productValue.innerText.length; ib++){
                intCurrentProductValue = intCurrentProductValue + productValue.innerText[ib]
            }
            subTotalValue = subTotalValue + Number(intCurrentProductValue)
            cartSubTotalValue.innerText = `$${subTotalValue.toFixed(2)}` 
        }
        
    }

    calculatePreCheckoutValues(cartPreCheckoutQuantityNumber)
}
function calculatePreCheckoutValues(totalQuantity){
    let treatedcartSubTotalValue = ''
    for (let i = 1; i < cartSubTotalValue.innerText.length; i++){
        treatedcartSubTotalValue = treatedcartSubTotalValue + cartSubTotalValue.innerText[i]
    }

    cartShippingValue.innerText = `$${(1/100 * Number(treatedcartSubTotalValue)).toFixed(2)}`
    if (cartShippingValue.innerText.length < 6){
        cartShippingValue.innerText = `$0${(1/100 * Number(treatedcartSubTotalValue)).toFixed(2)}`
    }

    let treatedcartShippingValue = ''
    for (let i = 1; i < cartShippingValue.innerText.length; i++){
        treatedcartShippingValue = treatedcartShippingValue + cartShippingValue.innerText[i]
    }

    let treatedCartDiscountValue = ''
    for (let i = 0; i < cartDiscountValue.innerText.length - 1; i++){
        treatedCartDiscountValue = treatedCartDiscountValue + cartDiscountValue.innerText[i]
    }

    if (totalQuantity != null || totalQuantity != undefined){
        cartPreCheckoutQuantity.innerText = `Total (${totalQuantity} items):`
    }
    cartPreCheckoutPrice.innerText = `$${ ((Number(treatedcartSubTotalValue) + Number(treatedcartShippingValue)) -(treatedCartDiscountValue / 100 * (Number(treatedcartSubTotalValue) + Number(treatedcartShippingValue)))).toFixed(2)}`
    if (cartPreCheckoutPrice.innerText.length < 6){
        cartPreCheckoutPrice.innerText = `$0${ ((Number(treatedcartSubTotalValue) + Number(treatedcartShippingValue)) -(treatedCartDiscountValue / 100 * (Number(treatedcartSubTotalValue) + Number(treatedcartShippingValue)))).toFixed(2)}`
    }
}
function showMeTheWay(currentProduct){
    console.log(String(currentProduct.getAttribute('id')))
}
function clearCartProductsList(){
    cartProductsList.innerHTML = '<h1 class="cart-empty-sign">The cart is empty...</h1>'
    cartClearButton.innerText = `(Clear 0)`
    cartSubTotalValue.innerText = '$00.00'
    cartShippingValue.innerText = '$00.00'
    cartPreCheckoutPrice.innerText = '$00.00'
}