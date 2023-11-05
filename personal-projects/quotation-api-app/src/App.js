import Header from "./components/Header";
import Hero from "./components/Hero";
import Currencies from "./components/Currencies";
import Services from "./components/Services";
import styles from './App.module.css'
import goTopButtonPic from './components/media/go-top-button.png'
import { useState } from "react";

function App() {

  const [goTopButton, setGoTopButton] = useState(styles.goTopButton)

  window.onscroll = () => window.scrollY < 100 ? setGoTopButton(styles.goTopButton) : setGoTopButton(`${styles.goTopButton} ${styles.active}`)

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Currencies />
        <Services />
      </main>
      <a className={goTopButton} href="#home">
        <img src={goTopButtonPic} alt="go-top-button"/>
      </a>
    </>
  );
}

export default App;
