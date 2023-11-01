import Header from "./components/Header";
import Hero from "./components/Hero";
import DataContainer from "./components/DataContainer";
import DataContainerPageController from "./components/DataContainerPageController";
import { useState } from "react";
import styles from './App.module.css'

function App() {

  const [initPage, setInitPage] = useState(0)

  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>

      {/* <div className={styles.container}>
        <DataContainer initIndexPage={initPage}/>
        <DataContainerPageController setPageEvent={initPage => setInitPage(initPage)}/>
      </div> */}
    </>
  );
}

export default App;
