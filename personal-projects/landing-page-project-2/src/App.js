import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Reviews from "./components/Reviews.jsx";
import Contact from "./components/Contact.jsx";

import { useState } from "react";

export default function App() {
  const [userLanguage, setUserLanguage] = useState("pt-br");

  const sectionsAnimationFunc = () => {
    const sections = document.getElementsByTagName("section");
    var sectionsPos = [];
    for (var i = 0; i < sections?.length; i++) {
      i === 0
        ? (sectionsPos = [sections[i]?.clientHeight])
        : sectionsPos.push(
            sections[i]?.clientHeight + sections[i - 1]?.clientHeight
          );
    }

    const setSectionsState = (
      asides,
      paragraphs,
      titles,
      images,
      currentSec
    ) => {
      var condition = 400;
      if (currentSec === sections.length - 1) {
        condition = -300;
      }

      if (window.scrollY >= sectionsPos[currentSec - 1] - condition) {
        for (var i = 0; i < asides.length; i++) {
          asides[i].classList.remove("opacity-0");
          asides[i].classList.remove("-translate-x-[100px]");
        }
        for (var pi = 0; pi < paragraphs.length; pi++) {
          paragraphs[pi].classList.remove("opacity-0");
          paragraphs[pi].classList.remove("-translate-x-[100px]");
        }
        for (var ti = 0; ti < titles.length; ti++) {
          titles[ti].classList.remove("opacity-0");
          titles[ti].classList.remove("-translate-x-[100px]");
        }
        for (var ii = 0; ii < images.length; ii++) {
          images[ii].classList.remove("opacity-0");
          images[ii].classList.remove("-translate-x-[100px]");
        }
      } else {
        for (var ei = 0; ei < asides.length; ei++) {
          asides[ei].classList.add("opacity-0");
          asides[ei].classList.add("-translate-x-[100px]");
          asides[ei].classList.add("transition-all");
          asides[ei].classList.add("duration-[.75s]");
        }
        for (var epi = 0; epi < paragraphs.length; epi++) {
          paragraphs[epi].classList.add("opacity-0");
          paragraphs[epi].classList.add("-translate-x-[100px]");
          paragraphs[epi].classList.add("transition-all");
          paragraphs[epi].classList.add("duration-[.75s]");
        }
        for (var eti = 0; eti < titles.length; eti++) {
          titles[eti].classList.add("opacity-0");
          titles[eti].classList.add("-translate-x-[100px]");
          titles[eti].classList.add("transition-all");
          titles[eti].classList.add("duration-[.75s]");
        }
        for (var eii = 0; eii < titles.length; eii++) {
          images[eii].classList.add("opacity-0");
          images[eii].classList.add("-translate-x-[100px]");
          images[eii].classList.add("transition-all");
          images[eii].classList.add("duration-[.75s]");
        }
      }
    };

    if (window.innerWidth <= 1366) {
      for (var sec = 1; sec < sections.length; sec++) {
        var titles = sections[sec].getElementsByTagName("h1");
        var asides = sections[sec].getElementsByTagName("aside");
        var paragraphs = sections[sec].getElementsByTagName("p");
        var images = sections[sec].getElementsByTagName("img");
        setSectionsState(asides, paragraphs, titles, images, sec);
      }
    }
  };

  window.onscroll = () => {
    sectionsAnimationFunc();

    setNavbarActive(false)

    const header = document.getElementById("header");
    if (
      window.scrollY >= 30 &&
      header?.classList.contains("bg-white") === false
    ) {
      header?.classList.add("bg-white");
      header?.classList.add("shadow-sm");
    } else if (window.scrollY < 100 && header?.classList.contains("bg-white")) {
      header?.classList.remove("bg-white");
      header?.classList.remove("shadow-sm");
    }
  };

  const [navbarActive, setNavbarActive] = useState(false)

  return (
    <main className="relative w-full m-auto max-w-[1366px] h-fit bg-white">
      <Header lang={userLanguage} navbarActive={navbarActive} setNavbarActive={() => setNavbarActive(!navbarActive)}/>
      <Hero
        selectedLang={userLanguage}
        setLang={(selectedLang) => setUserLanguage(selectedLang)}
      />
      <About lang={userLanguage} />
      <Reviews lang={userLanguage} />
      <Contact lang={userLanguage} />
    </main>
  );
}
