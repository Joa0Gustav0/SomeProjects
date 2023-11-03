import Header from "./components/Header";
import Hero from "./components/Hero";
import Currencies from "./components/Currencies";
import Services from "./components/Services";
import styles from './App.module.css'

function App() {

  

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Currencies />
        <Services />
      </main>

      {/* <div className={styles.container}>
        <DataContainer initIndexPage={initPage}/>
        <DataContainerPageController setPageEvent={initPage => setInitPage(initPage)}/>
      </div> */}
    </>
  );
}

export default App;
