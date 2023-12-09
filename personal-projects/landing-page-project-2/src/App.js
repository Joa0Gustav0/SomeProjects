import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Reviews from "./components/Reviews.jsx";

import { useState } from "react";

export default function App() {
  const [userLanguage, setUserLanguage] = useState("pt-br");

  return (
    <main className="relative w-full m-auto max-w-[1366px] h-fit bg-white">
      <Header lang={userLanguage} />
      <Hero
        selectedLang={userLanguage}
        setLang={(selectedLang) => setUserLanguage(selectedLang)}
      />
      <About />
      <Reviews lang={userLanguage}/>
    </main>
  );
}
