import styles from './styles/OcurrencesTab.module.css'
import { useState } from 'react'

export default function OcurrencesTab( {pArr, pIndex, addOcurrenceFunction, closeTab, selectedYear, darkMode} ) {

    const [bttState, setBttState] = useState('deactivated')
    const month = document.getElementById('month-input')
    const salesNum = document.getElementById('sales-input')

    const [conflictTxtSts, setConflictTxtSts] = useState('unabled')

    const validateOcurrence = () => {
        var alreadyExists = false

        pArr[pIndex].ocurrences.map((elem) => {
            if (Number(elem.month) === Number(month.value) && Number(elem.year) === Number(selectedYear)) {
                alreadyExists = true
            }
        })

        alreadyExists ?  setConflictTxtSts('enabled') : setConflictTxtSts('unabled')

        if (month.value !== '' && salesNum.value !== '') {
            if (Number(month.value) > 0 && Number(month.value) <= 12 && Number(salesNum.value) >= 0) {
                setBttState('activated')
            }else {
                setBttState('deactivated')
            }
        }else {
            setBttState('deactivated')
        }
    }

    return (
        <>
            <div className={pIndex !== null ? `${styles.safeLayer} ${styles.active}` : styles.safeLayer}></div>
            <div className={pIndex === null ? darkMode === true ? `${styles.ocurrencesTab} ${styles.dark}` : styles.ocurrencesTab : darkMode === true ? `${styles.ocurrencesTab} ${styles.dark} ${styles.active}` : `${styles.ocurrencesTab} ${styles.active}`}>
                <h1>Add Ocurrences</h1>
                <p>You are adding ocurrences to: <br />
                    <span>{pArr[pIndex]?.name}</span>
                </p>
                <label htmlFor="month-input">Month:</label>
                <input type="number" id='month-input' placeholder='Ocurrence month' min={0} onChange={() => validateOcurrence()}/>
                <p className={conflictTxtSts === 'unabled' ? styles.conflictTxt : `${styles.conflictTxt} ${styles.enabled}`}>Adding an ocurrence to a month already containing an ocurrence only results on a value changing</p>
                <label htmlFor="sales-input">Number of sales:</label>
                <input type="number" id='sales-input' placeholder='Number of sales' min={0} onChange={() => validateOcurrence()}/>
                <button className={bttState !== 'deactivated' ? styles.enabled : ''}
                onClick={() => {
                    validateOcurrence()
                    if (bttState !== 'deactivated') {
                        if (conflictTxtSts === 'enabled') {
                            addOcurrenceFunction('change', {month: Number(month.value), salesNum: Number(salesNum.value)}, pIndex)
                        }else {
                            addOcurrenceFunction('add', {month: Number(month.value), year: selectedYear, salesNum: Number(salesNum.value), price: pArr[pIndex].price, color: pArr[pIndex].color}, pIndex)
                        }
                        month.value = ""
                        salesNum.value = ""
                        setBttState('deactivated')
                        setConflictTxtSts('unabled')
                        closeTab()
                    }
                }}>Add Ocurrence</button>

                <ion-icon name="close" onClick={() => {
                    month.value = ""
                    salesNum.value = ""
                    setConflictTxtSts('unabled')

                    closeTab()
                }}></ion-icon>
            </div>
        </>
    )
}