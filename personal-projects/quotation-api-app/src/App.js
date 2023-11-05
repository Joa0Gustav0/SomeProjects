import Header from "./components/Header";
import Hero from "./components/Hero";
import Currencies from "./components/Currencies";
import Services from "./components/Services";
import Footer from "./components/Footer";
import styles from './App.module.css'
import goTopButtonPic from './components/media/go-top-button.png'
import { useState } from "react";

function App() {

  const [goTopButton, setGoTopButton] = useState(styles.goTopButton)

  return (
    <>
      <Header gtButtonFunction={() => {
        if (window.scrollY > 100){
          setGoTopButton(`${styles.goTopButton} ${styles.active}`)
        }else{
          setGoTopButton(styles.goTopButton)
        }
      }}/>
      <main>
        <Hero />
        <Currencies />
        <Services />
        <Footer />
      </main>
      <a className={goTopButton} href="#home">
        <img src={goTopButtonPic} alt="go-top-button"/>
      </a>
    </>
  );
}

export default App;
