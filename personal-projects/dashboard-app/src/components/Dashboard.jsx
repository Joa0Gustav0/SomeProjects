import styles from './styles/Dashboard.module.css'
import { useState, useEffect } from 'react'

export default function Dashboard( {hSalesNum, allOcurrences} ) {

    const [view, setView] = useState("month")

    const months = ['jan','feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sept', 'oct', 'nov', 'dec']

    const years = []
    const currentYear = new Date().getFullYear()
    const initialYear = currentYear - 10

    for (var i = initialYear; i <= currentYear; i++){
        years.push(i)
    }

    const dashMarksY = [1,2,3,4,5] 

    const [highestYNum, setHighestYNum] = useState()

    useEffect(() => {
        if (Array.from(hSalesNum.toString())[Array.from(hSalesNum.toString()).length - 1] !== '0' &&
        Array.from(hSalesNum.toString())[Array.from(hSalesNum.toString()).length - 1] !== '5'){
            setHighestYNum(hSalesNum + (10 - Array.from(hSalesNum.toString())[Array.from(hSalesNum.toString()).length - 1]))
        }else {
            setHighestYNum(hSalesNum)
        }
    }, [hSalesNum])

    return (
        <aside className={styles.dashBoard}>

            {
                hSalesNum > -1 ?
                dashMarksY.map((elem, i) => (
                    <div key={'dashMarkY-' + i} style={{top: `${20 * i}%`}} className={styles.dashMarksY}>
                        {highestYNum - i * (highestYNum / 5)} -
                    </div>
                ))
                :
                <div key={'empty-value-y'} className={styles.emptyY}>
                    X -
                </div> 
            }
            <div key={'zero-value-y'} className={styles.zero}>
                0 -
            </div> 
            {
                view === 'month' ?
                
                months.map((elem, i) => (
                    <div key={elem + '-month'} 
                    className={styles.dashMark} 
                    style={{left: `${7.91 * (i + 1)}%`}}>
                        | <br />
                        {elem}
                    </div>
                ))

                :
                
                years.map((elem, i) => (
                    <div key={elem + '-month'} 
                    className={styles.dashMark} 
                    style={{left: `${8.25 * (i + 1)}%`}}>
                        | <br />
                        {elem}
                    </div>
                ))
            }

            {   
                allOcurrences?.map((productOcurrences) => productOcurrences?.map((ocurrence, index) => (
                    index !== productOcurrences.length - 1 ?
                    <div key={`point-m${ocurrence.month}-sn${ocurrence.salesNum}`} 
                        className={styles.dashboardPointModel}
                        style={{left: `${7.91 * (ocurrence.month)}%`, 
                            bottom: `${(100/highestYNum) * ocurrence.salesNum}%`, 
                            backgroundColor: `rgb(${productOcurrences[productOcurrences.length - 1][0]}, 
                                ${productOcurrences[productOcurrences.length - 1][1]}, 
                                ${productOcurrences[productOcurrences.length - 1][2]})`}}
                    ></div>
                    :
                    null
                )))
            }

            <span className={styles.dashView}>
                <button className={
                    view !== 'month' ?
                    styles.monthButton :
                    `${styles.monthButton} ${styles.active}`
                }
                onClick={() => {
                    setView('month')
                }}>
                    <h1>Months</h1>
                </button>
                <button className={
                    view === 'month' ?
                    styles.yearButton :
                    `${styles.yearButton} ${styles.active}`
                }
                onClick={() => {
                    setView('year')
                }}>
                    <h1>Years</h1> 
                </button>
            </span>
        </aside>
    )
}