import DataForm from "./components/DataForm";
import Dashboard from "./components/Dashboard";
import DataList from "./components/DataList";
import EditTab from "./components/EditTab";
import OcurrencesTab from "./components/OcurrencesTab";
import productsStyles from './components/styles/DataList.module.css'
import styles from './App.module.css'
import { useState, useEffect } from "react";

function App() {

  var allProducts = document.getElementsByClassName(productsStyles.productContainer)
  
  const [view, setView] = useState("month")

  const [productEditI, setProductEditI] = useState(null)
  const [productOcurrencesI, setProductOcurrencesI] = useState(null)
  const [pArr, setPArr] = useState([])

  const [hSalesNum, setHSalesNum] = useState(-1)
  const [allOcurrences, setAllOcurrences] = useState(undefined)

  const setResponsiveState = (action) => {
    const main = document.getElementById('main')
    const dashboard = document.getElementById('dashboard')

    const oldDashboardContainer = document.getElementById('dashboardContainer')
    if (oldDashboardContainer !== null && oldDashboardContainer !== undefined) {
      main.appendChild(dashboard)
      oldDashboardContainer.remove()
    }

    if (action === 'break') {
      var dashboardContainer = document.createElement('div')
      dashboardContainer.id = 'dashboardContainer'
      dashboardContainer.className = styles.dashboardContainer
      const highestYDashMark = document.getElementById('highest-y-dashmark')
      dashboard.style.margin = 'auto'
      if (highestYDashMark !== null && highestYDashMark !== undefined) {
        if (window.innerWidth <= 500 + highestYDashMark) {
          dashboard.style.marginLeft = highestYDashMark.clientWidth + 'px'
        } 
      }else {
        if (window.innerWidth <= 600) {
          dashboard.style.marginLeft = '30px'
        } 
      }
      main.appendChild(dashboardContainer)
      dashboardContainer.appendChild(dashboard)
    }
  }

  const responsiveFunction = () => {
    const highestYDashMark = document.getElementById('highest-y-dashmark')
    const main = document.getElementById('main')

    if (highestYDashMark !== null && highestYDashMark !== undefined) {
      if (window.innerWidth <= 1220 + (highestYDashMark.clientWidth * 2 - 27)) {
        if (main !== undefined && main !== null) {
          main.style.flexDirection = 'column'
          setResponsiveState('break')
        }
      }else {
        if (main !== undefined && main !== null) {   
          main.style.flexDirection = 'row'
          setResponsiveState()
        }
      }
    }else {
      if (window.innerWidth <= 1225) {
        if (main !== undefined && main !== null) {
          main.style.flexDirection = 'column'
          setResponsiveState('break')
        }
      }else {
        if (main !== undefined && main !== null) {   
          main.style.flexDirection = 'row'
          setResponsiveState()
        }
      }
    }
  }
  
  window.onload = responsiveFunction()
  window.onresize = responsiveFunction()

  const getHSalesNum = () => {
    if (view === 'month') {
      var pOcurrences = []
  
      pArr.map((product) => {
        pOcurrences = [...pOcurrences, product.ocurrences]
      })
  
      setAllOcurrences(pOcurrences)
  
      var hSalesNumVar = -1
        
      pOcurrences.map((elem) => {
        elem?.map((ocurrence) => {
          if (ocurrence.salesNum > hSalesNumVar) {
            hSalesNumVar = ocurrence.salesNum
          }
        })
      })

    }else {
      var hSalesNumVar = -1
      var yearOcurrences = []

      for (var i = 2013; i <= 2023; i++) {
          allOcurrences.map((p) => p.map((ocurrence) => {
              if (ocurrence.year === i) {
                  yearOcurrences.push(ocurrence)
              }
          }))
      }

      for (var y = 2013; y <= 2023; y++) {
        var yearEarning = -1

        yearOcurrences.map((ocurrence) => {
          if (ocurrence.year === y) {
            yearEarning = yearEarning + (ocurrence.salesNum * ocurrence.price)
          }
        })

        if (yearEarning > hSalesNumVar) {
          hSalesNumVar = yearEarning
        }
      }
    }
    setHSalesNum(hSalesNumVar)
  }

  useEffect(() => {
    getHSalesNum()
  }, [productEditI, productOcurrencesI, pArr])

  useEffect(() => {
    allOcurrences?.map((pOcurrences) => {
      pOcurrences.sort(function(a, b) {
        return a.month - b.month
      })
    })
  })

  const [selectedYear, setSelectedYear] = useState(2023)

  return (
    <main id='main'>
      <DataForm formButtonFunc={(newProduct) => setPArr([...pArr, newProduct])} products={pArr}/>
      <Dashboard view={view} setView={(requiredView) => {
        setView(requiredView)
        if (requiredView === 'month') {
          var pOcurrences = []
  
          pArr.map((product) => {
            pOcurrences = [...pOcurrences, product.ocurrences]
          })
      
          setAllOcurrences(pOcurrences)
      
          var hSalesNumVar = -1
            
          pOcurrences.map((elem) => {
            elem?.map((ocurrence) => {
              if (ocurrence.salesNum > hSalesNumVar) {
                hSalesNumVar = ocurrence.salesNum
              }
            })
          })

          setHSalesNum(hSalesNumVar)

        }else {
          var hSalesNumVar = -1
          var yearOcurrences = []

          for (var i = 2013; i <= 2023; i++) {
              allOcurrences.map((p) => p.map((ocurrence) => {
                  if (ocurrence.year === i) {
                      yearOcurrences.push(ocurrence)
                  }
              }))
          }

          for (var y = 2013; y <= 2023; y++) {
            var yearEarning = -1

            yearOcurrences.map((ocurrence) => {
              if (ocurrence.year === y) {
                yearEarning = yearEarning + (ocurrence.salesNum * ocurrence.price)
              }
            })

            if (yearEarning > hSalesNumVar) {
              hSalesNumVar = yearEarning
            }
          }

          setHSalesNum(hSalesNumVar)

        } 

      }} selectedYear={selectedYear} setSelectedYear={(year) => setSelectedYear(year)} products={pArr} hSalesNum={hSalesNum} getHSalesNum={() => getHSalesNum()} allOcurrences={allOcurrences}/>
      <DataList productsArr={pArr} selectedYear={selectedYear} allOcurrences={allOcurrences}  hSalesNum={hSalesNum} editFunction={(productI) => setProductEditI(productI)} ocurrencesFunction={(productI) => setProductOcurrencesI(productI)} view={view}/>

      <EditTab productsArr={pArr} 
        editProductI={productEditI} 
        editableProduct={productEditI}
        closeNClear={(action, i) => {
          if (action === 'del') {
            setPArr(pArr.filter((elem, index) => index !== i))
          }
          setProductEditI(null)
        }}
        saveChanges={(newName, newPrice, index, newLinedName) => {
          pArr[index].name = newName
          pArr[index].price = newPrice
          allProducts[index].className = `${newLinedName} ${productsStyles.productContainer} ${productsStyles.selected}`
          setProductEditI(null)
        }
      }/>

      {/* create a function for removing ocurrences */}


      <OcurrencesTab pArr={pArr}
        selectedYear={selectedYear}
        ocurrences={allOcurrences?.sort(function (a, b) {
          return b.month - a.month
        })}
        pIndex={productOcurrencesI}
        closeTab={() => {
          setProductOcurrencesI(null)
        }}
        addOcurrenceFunction={(action, newOcurrence, index) => {
          if (action === 'add') {
            pArr[index].ocurrences = [...pArr[index].ocurrences, newOcurrence]
          }else {
            pArr[index].ocurrences.map((elem) => {
              if (elem.month === newOcurrence.month) {
                elem.salesNum = newOcurrence.salesNum
              }
            })
          }
        }}/>
    </main>
  );
}

export default App;
