import DataForm from "./components/DataForm";
import Dashboard from "./components/Dashboard";
import DataList from "./components/DataList";
import EditTab from "./components/EditTab";
import styles from './App.module.css'
import { useState } from "react";

function App() {

  const [pArr, setPArr] = useState([])

  return (
    <main>
      <DataForm formButtonFunc={(newProduct) => setPArr([...pArr, newProduct])}/>
      <Dashboard />
      <DataList productsArr={pArr}/>

      <EditTab />
    </main>
  );
}

export default App;
