import DataForm from "./components/DataForm";
import Dashboard from "./components/Dashboard";
import DataList from "./components/DataList";
import styles from './App.module.css'
import { useState } from "react";

function App() {

  const [pArr, setPArr] = useState([])

  return (
    <main>
      <DataForm formButtonFunc={(newProduct) => setPArr([...pArr, newProduct])}/>
      <Dashboard />
      <DataList productsArr={pArr}/>
    </main>
  );
}

export default App;
