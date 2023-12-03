import styles from './styles/Dashboard.module.css'
import productsStyles from './styles/DataList.module.css'
import { useState, useEffect } from 'react'

export default function Dashboard( {hSalesNum, getHSalesNum, allOcurrences, products, selectedYear, setSelectedYear, view, setView, darkMode} ) {

    const months = ['jan','feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sept', 'oct', 'nov', 'dec']

    const years = []
    const currentYear = 2023
    const initialYear = currentYear - 10

    for (var i = initialYear; i <= currentYear; i++){
        years.push(i)
    }

    const [yearBttStt, setYearBttStt] = useState('deactivated')

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

    var highestYDashMark = document.getElementById('highest-y-dashmark') 
    useEffect(() => {
        highestYDashMark = document.getElementById('highest-y-dashmark')
        if (dashboard !== undefined && dashboard !== null 
            && highestYDashMark !== undefined && highestYDashMark !== null) {
            dashboard.style.marginLeft = highestYDashMark.clientWidth - 15 + 'px'
            dashboard.style.marginRight = highestYDashMark.clientWidth - 15 + 'px'
        }
    })

    var allProducts = document.getElementsByClassName(productsStyles.productContainer)
    const dashboard = document.getElementById('dashboard')

    const drawnCanvasLines = () => {
        for (var i = 0; i <= 3; i++) {
            for (var childI = 0; childI < dashboard?.childNodes.length; childI++) {
                if (dashboard?.childNodes[childI].className === styles.dashboardPointModel) {
                    dashboard?.childNodes[childI].remove()
                }
            }
        }

        const canvas = document.getElementById('dashboardCanvas')
        canvas?.remove()

        var c = document.createElement('canvas')
        c.setAttribute('width', '500')
        c.setAttribute('height', '350')
        c.setAttribute('id', 'dashboardCanvas')
        dashboard?.appendChild(c)

        var ctx = c.getContext('2d')

        if (view === 'month') {
            var formatedOcurrences = []

            allOcurrences?.map((p, i) => {
                formatedOcurrences.push(p.filter((v) => v.year === selectedYear))
            })

            formatedOcurrences?.map((productOcurrences, pIndex) => productOcurrences?.sort(function(a,b) {return a.month - b.month}).map((ocurrence, index) => {
                if (index === 0) {
                    ctx.beginPath()
                    ctx.moveTo(((7.91 * (ocurrence.month))/100) * 500, 352 - ((((100/highestYNum) * ocurrence.salesNum)/100) * 350))
                }
                if (index > 0) {
                    ctx.lineTo(((7.91 * (ocurrence.month))/100) * 500, 352 - ((((100/highestYNum) * ocurrence.salesNum)/100) * 350))
                    ctx.lineWidth = 2
                    ctx.strokeStyle = allProducts[pIndex]?.className === `${products[pIndex]?.linedName} ${productsStyles.productContainer} ${productsStyles.selected}` ? ocurrence.color : `${ocurrence.color}40`
                }
                if (index === productOcurrences.length - 1) {
                    ctx.stroke()
                    ctx.closePath()
                }
                var newOcurrencePoint = document.createElement('div')
                newOcurrencePoint.className = styles.dashboardPointModel
                newOcurrencePoint.style.left = `${((7.91 * (ocurrence.month))/100) * 500}px`
                newOcurrencePoint.style.top = `${340 - ((((100/highestYNum) * ocurrence.salesNum)/100) * 350)}px`
            
                if (allProducts[pIndex]?.classList.contains(products[pIndex]?.linedName)) {
                    newOcurrencePoint.style.backgroundColor = ocurrence.color
                }else {
                    newOcurrencePoint.style.backgroundColor = ocurrence.color 
                    + '40'
                }
                var ocurrencePointData = document.createElement('div')
                ocurrencePointData.className = styles.dashboardPointDataContainer
                ocurrencePointData.innerHTML = `<div><h1>Month:</h1> <p>${ocurrence.month}</p></div> <div><h1>Sales:</h1> <p>${ocurrence.salesNum}</p></div> <div><h1>Earnings:</h1> <p>$${ocurrence.salesNum * products[pIndex]?.price}</p></div>`
                dashboard.appendChild(newOcurrencePoint)
                newOcurrencePoint.appendChild(ocurrencePointData)
            }))
        }
        if (view === 'year') {
            var yearOcurrences = []

            years.map((year) => {
                allOcurrences.map((p) => p.map((ocurrence) => {
                    if (ocurrence.year === year) {
                        yearOcurrences.push(ocurrence)
                    }
                }))
            })

            years.map((year, yi) => {
                var currentYearEarning = 0
                var currentYearSalesNum = 0

                yearOcurrences.map((elem) => {
                    if (elem.year === year) {
                        currentYearEarning = currentYearEarning + (elem.price * elem.salesNum)
                        currentYearSalesNum = currentYearSalesNum + elem.salesNum
                    }
                })

                if (currentYearEarning > 0) {
                    var newOcurrencePoint = document.createElement('div')
                    newOcurrencePoint.className = styles.dashboardPointModel
                    newOcurrencePoint.style.left = `${((8.25 * (yi + 1))/100) * 500}px`
                    newOcurrencePoint.style.top = `${340 - ((((100/highestYNum) * currentYearEarning)/100) * 350)}px`
                    newOcurrencePoint.style.backgroundColor = '#1872ff'
                    dashboard.appendChild(newOcurrencePoint)

                    var ocurrencePointData = document.createElement('div')
                    ocurrencePointData.className = styles.dashboardPointDataContainer
                    ocurrencePointData.innerHTML = `<div><h1>Year:</h1> <p>${year}</p></div> <div><h1>Sales:</h1> <p>${currentYearSalesNum}</p></div> <div><h1>Earnings:</h1> <p>$${currentYearEarning}</p></div>`
                    newOcurrencePoint.appendChild(ocurrencePointData)

                    if (yi === 0) {
                        ctx.beginPath()
                        ctx.moveTo(((8.25 * (yi + 1))/100) * 500, 352 - ((((100/highestYNum) * currentYearEarning)/100) * 350))
                    }
                    if (yi > 0) {
                        ctx.lineTo(((8.25 * (yi + 1))/100) * 500, 352 - ((((100/highestYNum) * currentYearEarning)/100) * 350))
                        ctx.lineWidth = 2
                        ctx.strokeStyle = '#1872ff'
                    }
                    if (yi === years.length - 1) {
                        ctx.stroke()
                        ctx.closePath()
                    }
                }

            })
        }
        
    }

    useEffect(() => {
        drawnCanvasLines()
    })

    return (
        <div className={styles.dashboardContainer} style={{paddingLeft: `${highestYDashMark?.clientWidth}`}}>
            <aside id='dashboard' className={darkMode === true ? `${styles.dashBoard} ${styles.dark}` : styles.dashBoard} style={{}}>
                <canvas key={'canvas'} width={500} height={350} id='dashboardCanvas'></canvas>
                {
                    dashMarksY.map((elem, i) => (
                        <div key={'line-' + i} className={hSalesNum > -1 ? darkMode === true ?`${styles.xLines} ${styles.dark} ${styles.enabled}` : `${styles.xLines} ${styles.enabled}` : darkMode === true ? `${styles.xLines} ${styles.dark}` : styles.xLines} style={{top: `${20 * i}%`}}></div>
                    ))
                }
                {
                    hSalesNum > -1 ?
                    dashMarksY.map((elem, i) => (
                        <div key={'dashMarkY-' + i} id={i === 0 ? 'highest-y-dashmark' : ''} style={{top: `${20 * i}%`}} className={styles.dashMarksY}>
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
                <span className={styles.yearsView}
                    style={view === 'month' ? {display: 'block'} : {display: 'none'}}>
                    <button style={yearBttStt === 'activated' ? {borderRadius: '5px 5px 0px 0px'} : {borderRadius: '5px'}} onClick={() => yearBttStt === 'activated' ? setYearBttStt('deactivated') : setYearBttStt('activated')}>{selectedYear} <ion-icon name='chevron-down'></ion-icon></button>
                    <div id='yC' className={styles.yearsContainer}
                        style={yearBttStt === 'activated' ? {display: 'block'} : {display: 'none'}}>
                        {
                            years.map((elem) => (
                                <button key={elem + '-month'} onClick={() => {setSelectedYear(elem); setYearBttStt('deactivated'); const yC = document.getElementById('yC'); yC.scrollTo(0, 0)}}>{elem}</button>
                            ))
                        }
                    </div>
                    <h1>Year</h1>
                </span>
                <span className={darkMode === true ? `${styles.dashView} ${styles.dark}` : styles.dashView}>
                    <button className={
                        view !== 'month' ?
                        styles.monthButton :
                        `${styles.monthButton} ${styles.active}`
                    }
                    onClick={() => {
                        setView('month')
                        drawnCanvasLines()
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
                        drawnCanvasLines()
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
        </div>
    )
}