import styles from './styles/DataForm.module.css'
import { useState, useEffect } from 'react'

export default function DataForm( {formButtonFunc, products} ) {

    const pColor = document.getElementById("caption-input")
    window.onload = () => {
        pColor.value = "#1872ff"
    }

    const inputs = document.getElementsByClassName('data-form-input')
    const [inputsSts, setInputsSts] = useState(['ok', 'ok'])
    const [pNameErrTxt, setpNameErrTxt] = useState('ok')
    const [pPriceErrTxt, setpPriceErrTxt] = useState('ok')

    useEffect(() => {
        inputsSts.map((elem) => elem = 'ok')
    })

    const resetInputStates = () => {
        inputsSts[0] = 'ok'
        inputsSts[1] = 'ok'
        setpNameErrTxt('ok')
        setpPriceErrTxt('ok')
    }

    const clearInputs = () => {
        pColor.value = "#1872ff"
        resetInputStates()
        for (var i = 0; i < inputs.length - 1; i++){
            inputs[i].value = ''
        }
    }

    const chars = 'abcdefghijklmnopqrstuvwxyz'

    const validateInput = (input, index) => {
        if (input.type === 'text') {
            var includesLetter = false
            var alreadyExists = false

            for (var i = 0; i < input.value.length; i++) {
                if (chars.includes(input.value.toLowerCase()[i])) {
                    i = input.value.length
                    includesLetter = true
                }
            }
            products?.map((elem) => {
                if (elem.name.toLowerCase() === input.value.toLowerCase()) {
                    alreadyExists = true
                }
            })

            if (input.value === "") {
                inputsSts[index] = 'A product name is required.'
            }else if (includesLetter === false){
                inputsSts[index] = 'Product name should contain at least a letter.'
            }else if (alreadyExists === true) {
                inputsSts[index] = 'Product name already in use.'
            }else {
                inputsSts[index] = 'ok'
            }

        }else {
            if (input.value.toString() === "") {
                inputsSts[index] = 'A product price is required.'
            }else if (Number(input.value) <= 0) {
                inputsSts[index] = 'Product price should be greater than 0.'
            }else {
                inputsSts[index] = 'ok'
            }
        }
    }

    return (
        <div className={styles.dataFormContainer}>
            <h1>Add New product</h1>
            <label htmlFor="product-input">
                <h2>Product:</h2>
            </label>
            <input type="text" className={inputsSts[0] === 'ok' ? 'data-form-input' : `data-form-input ${styles.onErr}`} id="product-input" 
            placeholder="Product name" autoComplete='off' onChange={() => resetInputStates()}/>
            <p className={pNameErrTxt === 'ok' ? styles.inputErrTxt : `${styles.inputErrTxt} ${styles.display}`}>
                {pNameErrTxt}
            </p>
            <label htmlFor="price-input">
                <h2>Price:</h2>
            </label>
            <input type="number" className={inputsSts[1] === 'ok' ? 'data-form-input' : `data-form-input ${styles.onErr}`} id="price-input" 
            placeholder="Product price" onChange={() => resetInputStates()}/>
            <p className={pPriceErrTxt === 'ok' ? styles.inputErrTxt : `${styles.inputErrTxt} ${styles.display}`}>
                {pPriceErrTxt}
            </p>
            <label htmlFor="price-input">
                <h2>Caption color:</h2>
            </label>
            <input type="color" id="caption-input" className={"data-form-input " + styles.colorInput}/>

            <button onClick={() => {
                for (var i = 0; i < inputs.length - 1; i++){
                    validateInput(inputs[i], i)
                }

                setpNameErrTxt(inputsSts[0])
                setpPriceErrTxt(inputsSts[1])

                if (inputsSts[0] === 'ok' && inputsSts[1] === 'ok') {
                    formButtonFunc({name: inputs[0].value, price: Number(inputs[1].value), color: inputs[2].value, ocurrences: []})
                    clearInputs()
                }
            }}>
                <h1>Add product</h1>
            </button>
        </div>
    )
}