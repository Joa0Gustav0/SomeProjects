import Header from "./components/Header.jsx"

import { useState } from "react"

export default function App() {

  const [userLanguage, setUserLanguage] = useState("pt-br")

  return (
    <Header lang={userLanguage}/>
  )
}