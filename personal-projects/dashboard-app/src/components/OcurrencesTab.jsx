import styles from './styles/OcurrencesTab.module.css'
import { useState } from 'react'

export default function OcurrencesTab( {pArr, pIndex} ) {

    const [bttState, setBttState] = useState('deactivated')

    const validateOcurrence = () => {
        const month = document.getElementById('month-input')
        const salesNum = document.getElementById('sales-input')

        if (month.value !== '' && salesNum !== '') {
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
            <div className={pIndex !== null ? `${styles.ocurrencesTab} ${styles.active}` : styles.ocurrencesTab}>
                <h1>Add Ocurrences</h1>
                <p>You are adding ocurrences to: <br />
                    <span>{pArr[pIndex]?.name}</span>
                </p>
                <label htmlFor="month-input">Month:</label>
                <input type="number" id='month-input' placeholder='Ocurrence month' min={0} onChange={() => validateOcurrence()}/>
                <label htmlFor="sales-input">Number of sales:</label>
                <input type="number" id='sales-input' placeholder='Number of sales' min={0} onChange={() => validateOcurrence()}/>
                <button className={bttState !== 'deactivated' ? styles.enabled : ''}>Add Ocurrence</button>
            </div>
        </>
    )
}