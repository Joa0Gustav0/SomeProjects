import Home from "./components/Home";
import Finder from "./components/Finder";
import { useState } from "react";
import styles from './components/styles/Home.module.css'
import finderStyles from './components/styles/Finder.module.css'

function App() {

  const [homeSection, setHomeSection] = useState("")
  const [finderSection, setFinderSection] = useState("")

  const changeTabsState = () => {
    if (homeSection !== styles.deactivatedTab){
      setHomeSection(styles.deactivatedTab)
      setFinderSection(finderStyles.activeTab)
    }else{
      setHomeSection("")
      setFinderSection("")
    }
  }

  return (
    <div className="Container">
      <Home sectionState={homeSection} event={changeTabsState}/>
      <Finder mainState={finderSection} event={changeTabsState}/>
    </div>
  );
}

export default App;
