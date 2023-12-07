import Header from "./components/Header.jsx";

import { useState } from "react";

export default function App() {
  const [userLanguage, setUserLanguage] = useState("pt-br");

  return (
    <main className="relative w-full m-auto max-w-[1366px] h-fit min-h-[2000px] bg-white">
      <Header
        lang={userLanguage}
        setLang={(selectedLang) => setUserLanguage(selectedLang)}
      />
    </main>
  );
}
