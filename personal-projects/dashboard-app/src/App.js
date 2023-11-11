import DataForm from "./components/DataForm";
import Dashboard from "./components/Dashboard";
import DataList from "./components/DataList";
import EditTab from "./components/EditTab";
import OcurrencesTab from "./components/OcurrencesTab";
import styles from './App.module.css'
import { useState, useEffect } from "react";

function App() {

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

  return (
    <main>
      <DataForm formButtonFunc={(newProduct) => setPArr([...pArr, newProduct])} products={pArr}/>
      <Dashboard hSalesNum={hSalesNum} allOcurrences={allOcurrences}/>
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
        saveChanges={(newName, newPrice, index) => {
          pArr[index].name = newName
          pArr[index].price = newPrice
          setProductEditI(null)
        }
      }/>

      {/* create a function for removing ocurrences */}

      <OcurrencesTab pArr={pArr}
        pIndex={productOcurrencesI}
        closeTab={() => {
          setProductOcurrencesI(null)
        }}
        addOcurrenceFunction={(newOcurrence, index) => {
          pArr[index].ocurrences = [newOcurrence, ...pArr[index].ocurrences]
        }}/>
    </main>
  );
}

export default App;
