import styles from './styles/Dashboard.module.css'
import productsStyles from './styles/DataList.module.css'
import { useState, useEffect } from 'react'

export default function Dashboard( {hSalesNum, allOcurrences, products} ) {

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


    var allProducts = document.getElementsByClassName(productsStyles.productContainer)

    useEffect(() => {
        const c = document.getElementById('dashboardCanvas')
        var ctx = c.getContext('2d')

        ctx.clearRect(0, 0, 500, 300)

        allOcurrences?.map((productOcurrences, pIndex) => productOcurrences?.sort(function(a,b) {return a.month - b.month}).map((ocurrence, index) => {
            if (productOcurrences.length > 1) {
                if (index === 0) {
                    ctx.beginPath()
                    ctx.moveTo(((7.91 * (ocurrence.month))/100) * 500, 350 - ((((100/highestYNum) * ocurrence.salesNum)/100) * 350))
                }
                if (index < productOcurrences.length) {
                    ctx.lineTo(((7.91 * (ocurrence.month))/100) * 500, 350 - ((((100/highestYNum) * ocurrence.salesNum)/100) * 350))
                    ctx.lineWidth = 2
                    ctx.strokeStyle = allProducts[pIndex].className === `${products[pIndex].linedName} ${productsStyles.productContainer} ${productsStyles.selected}` ? ocurrence.color : `${ocurrence.color}40`
                }
                if (index === productOcurrences.length - 1) {
                    ctx.stroke()
                    ctx.closePath()
                }
            }
        }))
    })

    return (
        <aside className={styles.dashBoard}>

            <canvas key={'canvas'} width={500} height={350} id='dashboardCanvas'></canvas>

            {
                dashMarksY.map((elem, i) => (
                    <div key={'line-' + i} className={hSalesNum > -1 ? `${styles.xLines} ${styles.enabled}` : styles.xLines} style={{top: `${20 * i}%`}}></div>
                ))
            }
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
                allOcurrences?.map((productOcurrences, pIndex) => productOcurrences?.sort(function(a,b) {return a.month - b.month}).map((ocurrence, index) => (
                    <div key={`${products[pIndex].linedNname}point-m${ocurrence.month}-sn${ocurrence.salesNum}`} 
                        className={`${styles.dashboardPointModel} ${products[pIndex].linedNname}`}
                        style={{left: `${7.91 * (ocurrence.month)}%`, 
                        bottom: `${(100/highestYNum) * ocurrence.salesNum}%`, 
                        backgroundColor: allProducts[pIndex].className === `${products[pIndex].linedName} ${productsStyles.productContainer} ${productsStyles.selected}` ? ocurrence.color : `${ocurrence.color}40`}}>
                    </div>
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
        </aside>
    )
}