import styles from './styles/DataList.module.css'
import dashboardStyles from './styles/Dashboard.module.css'
import { useState, useEffect } from 'react'

export default function DataList( {productsArr, editFunction, ocurrencesFunction, allOcurrences, hSalesNum, selectedYear, view, darkMode} ) {

    const allProducts = document.getElementsByClassName(styles.productContainer)

    const [highestYNum, setHighestYNum] = useState()

    useEffect(() => {
        if (Array.from(hSalesNum.toString())[Array.from(hSalesNum.toString()).length - 1] !== '0' &&
        Array.from(hSalesNum.toString())[Array.from(hSalesNum.toString()).length - 1] !== '5'){
            setHighestYNum(hSalesNum + (10 - Array.from(hSalesNum.toString())[Array.from(hSalesNum.toString()).length - 1]))
        }else {
            setHighestYNum(hSalesNum)
        }
    }, [hSalesNum])

    const dashboard = document.getElementById('dashboard')

    const drawCanvasLines = () => {
        for (var i = 0; i <= 3; i++) {
            for (var childI = 0; childI < dashboard?.childNodes.length; childI++) {
                if (dashboard?.childNodes[childI].className === dashboardStyles.dashboardPointModel) {
                    dashboard?.childNodes[childI].remove()
                }
            }
        }

        const canvas = document.getElementById('dashboardCanvas')
        canvas?.remove()

        var c = document.createElement('canvas')
        c.setAttribute('width', 500)
        c.setAttribute('height', 350)
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
                    ctx.strokeStyle = allProducts[pIndex]?.className === `${productsArr[pIndex]?.linedName} ${styles.productContainer} ${styles.selected}` ? ocurrence.color : `${ocurrence.color}40`
                }
                if (index === productOcurrences.length - 1) {
                    ctx.stroke()
                    ctx.closePath()
                }
                var newOcurrencePoint = document.createElement('div')
                newOcurrencePoint.className = dashboardStyles.dashboardPointModel
                newOcurrencePoint.style.left = `${((7.91 * (ocurrence.month))/100) * 500}px`
                newOcurrencePoint.style.top = `${340 - ((((100/highestYNum) * ocurrence.salesNum)/100) * 350)}px`
                newOcurrencePoint.style.backgroundColor = ocurrence.color
                if (allProducts[pIndex]?.classList.contains(productsArr[pIndex]?.linedName)) {
                    newOcurrencePoint.style.backgroundColor = ocurrence.color
                }else {
                    newOcurrencePoint.style.backgroundColor = ocurrence.color 
                    + '40'
                }
    
                var ocurrencePointData = document.createElement('div')
                ocurrencePointData.className = dashboardStyles.dashboardPointDataContainer
                ocurrencePointData.innerHTML = `<div><h1>Month:</h1> <p>${ocurrence.month}</p></div> <div><h1>Sales:</h1> <p>${ocurrence.salesNum}</p></div> <div><h1>Earnings:</h1> <p>$${ocurrence.salesNum * productsArr[pIndex]?.price}</p></div>`
                dashboard.appendChild(newOcurrencePoint)
                newOcurrencePoint.appendChild(ocurrencePointData)
            }))
        }
        if (view === 'year') {
            var yearOcurrences = []

            for (var i = 2013; i <= 2023; i++) {
                allOcurrences.map((p) => p.map((ocurrence) => {
                    if (ocurrence.year === i) {
                        yearOcurrences.push(ocurrence)
                    }
                }))
            }

            for (var year = 2013; year <= 2023; year++) {
                var currentYearEarning = 0
                var currentYearSalesNum = 0

                yearOcurrences.map((elem) => {
                    if (elem.year === year) {
                        currentYearEarning = currentYearEarning + (elem.price * elem.salesNum)
                    }
                })

                if (currentYearEarning > 0) {
                    var newOcurrencePoint = document.createElement('div')
                    newOcurrencePoint.className = dashboardStyles.dashboardPointModel
                    newOcurrencePoint.style.left = `${((8.25 * (year - 2012))/100) * 500}px`
                    newOcurrencePoint.style.top = `${340 - ((((100/highestYNum) * currentYearEarning)/100) * 350)}px`
                    newOcurrencePoint.style.backgroundColor = '#1872ff'
                    dashboard.appendChild(newOcurrencePoint)

                    var ocurrencePointData = document.createElement('div')
                    ocurrencePointData.className = dashboardStyles.dashboardPointDataContainer
                    ocurrencePointData.innerHTML = `<div><h1>Year:</h1> <p>${year}</p></div> <div><h1>Sales:</h1> <p>${currentYearSalesNum}</p></div> <div><h1>Earnings:</h1> <p>$${currentYearEarning}</p></div>`
                    newOcurrencePoint.appendChild(ocurrencePointData)

                    if (year === 0) {
                        ctx.beginPath()
                        ctx.moveTo(((8.25 * (year - 2012))/100) * 500, 352 - ((((100/highestYNum) * currentYearEarning)/100) * 350))
                    }
                    if (year > 0) {
                        ctx.lineTo(((8.25 * (year - 2012))/100) * 500, 352 - ((((100/highestYNum) * currentYearEarning)/100) * 350))
                        ctx.lineWidth = 2
                        ctx.strokeStyle = '#1872ff'
                    }
                    if (year === 2023) {
                        ctx.stroke()
                        ctx.closePath()
                    }
                }
            }

        }
    }

    return (
        <aside id='data-list' className={darkMode === true ? `${styles.dataListContainer} ${styles.dark}` : styles.dataListContainer}>
            <h1>Products <span>({productsArr.length} items)</span></h1>
            <div className={styles.dataList__List} style={productsArr?.length > 0 ? {justifyContent: "flex-start"} : {justifyContent: "center"}}>

                {
                    productsArr?.length > 0 ?
                    productsArr.map((elem, i) => (
                        <div key={elem.name + i} id={elem.id} className={`${elem.linedName} ${styles.productContainer}`} onClick={() => {

                            for (var index = 0; index < allProducts.length; index++) {
                                if (index === i){
                                    allProducts[index].className = `${elem.linedName} ${styles.productContainer} ${styles.selected}`
                                }else {
                                    allProducts[index].className = `${elem.linedName} ${styles.productContainer}`
                                }
                            }

                            for (var childI = 0; childI < dashboard?.childNodes.length; childI++) {
                                if (dashboard?.childNodes[childI].className === dashboardStyles.dashboardPointModel) {
                                    dashboard?.childNodes[childI].remove()
                                }
                            }

                            drawCanvasLines()
                        }}>
                            <abbr title={elem.name}>
                                <h1>{elem.name}</h1>
                            </abbr>
                            <h2>${elem.price.toFixed(2)}</h2>
                            <button onClick={() => ocurrencesFunction(i)}>Add ocurrences</button>
                            <div className={styles.pColorCaption} 
                                style={{backgroundColor: elem.color}
                                }></div>
                            <ion-icon name="brush"
                                onClick={() => {
                                    editFunction(i)
                                }}></ion-icon>
                        </div> 
                    ))
                    :
                    <p>No products were added... </p>
                }

            </div>
        </aside>
    )
}