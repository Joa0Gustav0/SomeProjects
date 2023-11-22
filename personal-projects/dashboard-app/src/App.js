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

      yearOcurrences.map((ocurrence) => {
        if ((ocurrence.price * ocurrence.salesNum) > hSalesNumVar) {
          hSalesNumVar = ocurrence.price * ocurrence.salesNum
        }
      })
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
    <main>
      <DataForm formButtonFunc={(newProduct) => setPArr([...pArr, newProduct])} products={pArr}/>
      <Dashboard view={view} setView={(requiredView) => setView(requiredView)} selectedYear={selectedYear} setSelectedYear={(year) => setSelectedYear(year)} products={pArr} hSalesNum={hSalesNum} getHSalesNum={() => getHSalesNum()} allOcurrences={allOcurrences}/>
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
