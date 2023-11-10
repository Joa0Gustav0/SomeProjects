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

  useEffect(() => {
    var ocurrencesVar = []

    pArr.map((product) => {
      product?.ocurrences?.map((pOcurrences) => {
        ocurrencesVar = [...ocurrencesVar, pOcurrences]
      })
    })

    var hSalesNumVar = -1
      
    if (ocurrencesVar.length > 0) {
      ocurrencesVar.map((cOcurrence) => {
        if (cOcurrence.salesNum > hSalesNumVar) {
          hSalesNumVar = cOcurrence.salesNum
        }
      })
    }

    setHSalesNum(hSalesNumVar)
  })

  return (
    <main>
      <DataForm formButtonFunc={(newProduct) => setPArr([...pArr, newProduct])}/>
      <Dashboard hSalesNum={hSalesNum}/>
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
          pArr[index].ocurrences = [...pArr[index].ocurrences, newOcurrence]
        }}/>
    </main>
  );
}

export default App;
