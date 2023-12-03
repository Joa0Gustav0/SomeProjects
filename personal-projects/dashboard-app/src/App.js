import DataForm from "./components/DataForm";
import Dashboard from "./components/Dashboard";
import DataList from "./components/DataList";
import EditTab from "./components/EditTab";
import Header from "./components/Header";
import Footer from './components/Footer'
import OcurrencesTab from "./components/OcurrencesTab";
import productsStyles from './components/styles/DataList.module.css'
import styles from './App.module.css'
import { useState, useEffect } from "react";

function App() {

  var allProducts = document.getElementsByClassName(productsStyles.productContainer)
  
  const [view, setView] = useState("month")

  const [darkMode, setDarkMode] = useState(false)

  const [productEditI, setProductEditI] = useState(null)
  const [productOcurrencesI, setProductOcurrencesI] = useState(null)
  const [pArr, setPArr] = useState([])

  const [hSalesNum, setHSalesNum] = useState(-1)
  const [allOcurrences, setAllOcurrences] = useState(undefined)

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
    <>
    <Header darkMode={darkMode} setDarkMode={() => setDarkMode(!darkMode)}/>
    <main id='main' style={darkMode === true ? {backgroundColor: '#151515'} : {backgroundColor: 'white'}}>
      <DataForm darkMode={darkMode} formButtonFunc={(newProduct) => setPArr([...pArr, newProduct])} products={pArr}/>
      <Dashboard darkMode={darkMode} view={view} setView={(requiredView) => {
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
      <DataList darkMode={darkMode} productsArr={pArr} selectedYear={selectedYear} allOcurrences={allOcurrences}  hSalesNum={hSalesNum} editFunction={(productI) => setProductEditI(productI)} ocurrencesFunction={(productI) => setProductOcurrencesI(productI)} view={view}/>

      <EditTab darkMode={darkMode} productsArr={pArr} 
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


      <OcurrencesTab darkMode={darkMode} pArr={pArr}
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
    <Footer darkMode={darkMode}/>
    </>
  );
}

export default App;
