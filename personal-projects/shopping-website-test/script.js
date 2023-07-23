function changeQuantity(currentQuantityButton){
    let quantityInput = document.querySelector('.pquantity')
    if (currentQuantityButton.name == 'add'){
        quantityInput.value = Number(quantityInput.value) + 1
    }
    if (currentQuantityButton.name == 'remove' && quantityInput.value > 1){
        quantityInput.value = Number(quantityInput.value) - 1
    }
}