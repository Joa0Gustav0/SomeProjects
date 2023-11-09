import DataForm from "./components/DataForm";
import Dashboard from "./components/Dashboard";
import DataList from "./components/DataList";
import EditTab from "./components/EditTab";
import styles from './App.module.css'
import { useState } from "react";

function App() {

  const [productEditI, setProductEditI] = useState(null)
  const [pArr, setPArr] = useState([])

  return (
    <main>
      <DataForm formButtonFunc={(newProduct) => setPArr([...pArr, newProduct])}/>
      <Dashboard />
      <DataList productsArr={pArr} editFunction={(productI) => setProductEditI(productI)}/>

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
        }}/>
    </main>
  );
}

export default App;
