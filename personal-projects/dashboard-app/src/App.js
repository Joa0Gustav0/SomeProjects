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
    var initialValue = -1

    pArr.map((elem, i) => {
      elem.ocurrences.map((ocurrence, ocurrenceI) => {
          if (ocurrence.salesNum > initialValue){
            const numArr = Array.from(ocurrence.salesNum.toString())
            for (var i = numArr.length - 1; i >= 0; i--){
              if (i === numArr.length - 1){
                if (numArr[i] !== "5" || numArr[i] !== "0"){
                  initialValue = Number(ocurrence.salesNum) + (10 - numArr[i]) 
                }else {
                  initialValue = Number(ocurrence.salesNum)
                }
              }
            }
          }
      })
    })

    setHSalesNum(Number(initialValue))
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
            setPArr(pArr.filter((elem, index) => index !== i))
          }
          getHSalesNum()
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
