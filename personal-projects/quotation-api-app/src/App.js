import DataContainer from "./components/DataContainer";
import DataContainerPageController from "./components/DataContainerPageController";
import { useState } from "react";
import styles from './App.module.css'

function App() {

  const [initPage, setInitPage] = useState(0)

  return (
    <div className={styles.container}>
      <DataContainer initIndexPage={initPage}/>
      <DataContainerPageController setPageEvent={initPage => setInitPage(initPage)}/>
    </div>
  );
}

export default App;
