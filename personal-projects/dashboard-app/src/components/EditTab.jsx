import styles from './styles/EditTab.module.css'
import { useState } from 'react'

export default function EditTab( {productsArr, editProductI, closeNClear, saveChanges, darkMode} ) {

    const [buttonState, setButtonState] = useState('deactivated')
    const pNameInput = document.getElementById("product-input-edit")
    const pPriceInput = document.getElementById("price-input-edit")

    const clearInputs = () => {
        pNameInput.value = ""
        pPriceInput.value = ""
    }

    const validateInputs = () => {
        var alreadyExists = false
        var containsLetter = false

        for (var i  = 0; i < productsArr.length; i++) {
            if (productsArr[i].name === pNameInput.value) {
                alreadyExists = true
            }
        }

        const chars = "abcdefghijklmnopqrstuvwxyz"

        for (var aI = 0; aI < Array.from(pNameInput.value.toLowerCase()).length; aI++) {
            if (chars.includes(Array.from(pNameInput.value.toLowerCase())[aI])) {
                containsLetter = true
            }
        }

        if (pNameInput.value !== "" && containsLetter === true && alreadyExists === false && pPriceInput.value !== "" && Number(pPriceInput.value) > 0){
            setButtonState('activated')
        }else {
            setButtonState('deactivated')
        }
    }

    const postNewChanges = () => {

        const txtArr = Array.from(pNameInput.value.toLowerCase())
        var formatName = ''

        txtArr.map((char) => {
            if (char === ' ') {
                formatName = formatName + '-'
            }else {
                formatName = formatName + char
            }
        })


        saveChanges(pNameInput.value, Number(pPriceInput.value), editProductI, formatName)
        clearInputs()
    }

    return (
        <>
            <div className={editProductI !== null ? `${styles.safeLayer} ${styles.active}` : styles.safeLayer}></div>
            <div className={editProductI === null ? darkMode === true ? `${styles.editTabContainer} ${styles.dark}` : styles.editTabContainer : darkMode === true ? `${styles.editTabContainer} ${styles.dark} ${styles.active}` : `${styles.editTabContainer} ${styles.active}`}>
                <h1>Edit Product</h1>
                <p>The product you are editing is: <br /><span>{productsArr[editProductI]?.name}</span></p>
                <label htmlFor="product-input-edit">Product:</label>
                <input type="text" id="product-input-edit" onChange={() => validateInputs()} placeholder={productsArr[editProductI]?.name} autoComplete='off'/>
                <label htmlFor="price-input-edit">Price:</label>
                <input type="number" id="price-input-edit" onChange={() => validateInputs()} placeholder={productsArr[editProductI]?.price}/>
                <button className={buttonState !== 'activated' ? styles.scButton : `${styles.scButton} ${styles.enabled}`} onClick={() => {
                    if (buttonState === 'activated'){
                        postNewChanges()
                    }
                }}>Save Changes</button>
                <button className={styles.delButton}
                onClick={() => {
                    clearInputs()
                    closeNClear('del', editProductI)
                }}><ion-icon name="trash"></ion-icon></button>
                <ion-icon name="close" onClick={() => {
                    clearInputs()

                    closeNClear()
                }}></ion-icon>
            </div>
        </>
    )
}