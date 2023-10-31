import DataContainer from "./components/DataContainer";
import DataContainerPageController from "./components/DataContainerPageController";
import { useState } from "react";
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.container}>
      <DataContainer />
      <DataContainerPageController />
    </div>
  );
}

export default App;
