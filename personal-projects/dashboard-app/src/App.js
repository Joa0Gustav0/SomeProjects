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

  const [hSalesNum, setHSalesNum] = useState(-1)
    
  const getHSalesNum = () => {
    pArr.map((elem, i) => {
      elem.ocurrences.map((ocurrence, ocurrenceI) => {
          if (ocurrence.salesNum > hSalesNum){
            setHSalesNum(Number(ocurrence.salesNum))
          }
      })
    })
  }

  return (
    <main>
      <DataForm formButtonFunc={(newProduct) => setPArr([...pArr, newProduct])}/>
      <Dashboard products={pArr} hSalesNum={hSalesNum}/>
      <DataList productsArr={pArr} editFunction={(productI) => setProductEditI(productI)} ocurrencesFunction={(productI) => setProductOcurrencesI(productI)}/>

      <EditTab productsArr={pArr} 
        editProductI={productEditI} 
        editableProduct={productEditI}
        closeNClear={(action, i) => {
          if (action === 'del') {
            console.log('dsadsada')
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
      <OcurrencesTab pArr={pArr}
        pIndex={productOcurrencesI}
        closeTab={() => {
          setProductOcurrencesI(null)
        }}
        addOcurrenceFunction={(newOcurrence, index) => {
          pArr[index].ocurrences = [...pArr[index].ocurrences, newOcurrence]
          getHSalesNum()
        }}/>
    </main>
  );
}

export default App;
