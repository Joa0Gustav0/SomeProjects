import DataForm from "./components/DataForm";
import Dashboard from "./components/Dashboard";
import DataList from "./components/DataList";
import EditTab from "./components/EditTab";
import OcurrencesTab from "./components/OcurrencesTab";
import styles from './App.module.css'
import { useState } from "react";

function App() {

  const [productEditI, setProductEditI] = useState(null)
  const [productOcurrencesI, setProductOcurrencesI] = useState(null)
  const [pArr, setPArr] = useState([])

  const [ocurrences, setOcurrences] = useState([])
  const [hSalesNum, setHSalesNum] = useState(-1)

  const getOcurrences = () => {
    pArr.map((product) => {
      product.ocurrences?.map((pOcurrences) => {
        setOcurrences([...ocurrences, pOcurrences])
      })
    })
      
    getTheHSalesNum()
  }

  const getTheHSalesNum = () => {
    ocurrences.map((cOcurrence) => {
      if (cOcurrence.salesNum > hSalesNum) {
        setHSalesNum(cOcurrence.salesNum)
      }
    })
  }

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
            getOcurrences()
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
          getOcurrences()
        }}/>
    </main>
  );
}

export default App;
