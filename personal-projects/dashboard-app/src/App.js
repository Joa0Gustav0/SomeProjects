import DataForm from "./components/DataForm";
import Dashboard from "./components/Dashboard";
import DataList from "./components/DataList";
import EditTab from "./components/EditTab";
import styles from './App.module.css'
import { useState } from "react";

function App() {

  const [productEdit, setProductEdit] = useState(null)
  const [pArr, setPArr] = useState([])

  return (
    <main>
      <DataForm formButtonFunc={(newProduct) => setPArr([...pArr, newProduct])}/>
      <Dashboard />
      <DataList productsArr={pArr}/>

      <EditTab editableProduct={productEdit}/>
    </main>
  );
}

export default App;
