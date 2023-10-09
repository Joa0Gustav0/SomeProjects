import Home from "./components/Home";
import Finder from "./components/Finder";
import { useState } from "react";

function App() {

  const [homeSection, setHomeSection] = useState("")
  const [finderSection, setFinderSection] = useState("")

  const changeTabsState = () => {
    if (homeSection !== "Home_deactivatedTab__nzD1A"){
      setHomeSection("Home_deactivatedTab__nzD1A")
      setFinderSection("Finder_activeTab__O5JDr")
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
