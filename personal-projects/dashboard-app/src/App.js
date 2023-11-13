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

  const [productEditI, setProductEditI] = useState(null)
  const [productOcurrencesI, setProductOcurrencesI] = useState(null)
  const [pArr, setPArr] = useState([])

  const [hSalesNum, setHSalesNum] = useState(-1)
  const [allOcurrences, setAllOcurrences] = useState(undefined)

  useEffect(() => {
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
  }, [productEditI, productOcurrencesI, pArr])

  useEffect(() => {
    allOcurrences?.map((pOcurrences) => {
      pOcurrences.sort(function(a, b) {
        return a.month - b.month
      })
    })
  })

  return (
    <main>
      <DataForm formButtonFunc={(newProduct) => setPArr([...pArr, newProduct])} products={pArr}/>
      <Dashboard products={pArr} hSalesNum={hSalesNum} allOcurrences={allOcurrences}/>
      <DataList productsArr={pArr} editFunction={(productI) => setProductEditI(productI)} ocurrencesFunction={(productI) => setProductOcurrencesI(productI)}/>

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
