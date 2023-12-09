import usaIcon from "../media/usa-flag.png";
import brazilIcon from "../media/brazil-flag.png";
import argentinaIcon from "../media/argentina-flag.png";

import heroPicture from "../media/hero-section-picture.png";

export default function Hero({ selectedLang, setLang }) {
  const content = [
    {
      lang: "pt-br",
      next: "en",
      langIcon: brazilIcon,
      leftAside: (
        <p key="left-aside" className="font-DMSerifDisplay text-[12vw] leading-[1] xsm:text-7xl text-subMain m-auto w-fit text-center lg:text-left">
          Sabor, <br />
          Sutileza, <br />& Paixão.
        </p>
      ),
    },
    {
      lang: "en",
      next: "es",
      langIcon: usaIcon,
      leftAside: (
        <p key="left-aside" className="font-DMSerifDisplay text-[12vw] leading-[1] xsm:text-7xl text-subMain m-auto w-fit text-center lg:text-left">
          Flavor, <br />
          Finesse, <br />& Passion.
        </p>
      ),
    },
    {
      lang: "es",
      next: "pt-br",
      langIcon: argentinaIcon,
      leftAside: (
        <p key="left-aside" className="font-DMSerifDisplay text-[12vw] leading-[1] xsm:text-7xl text-subMain m-auto w-fit text-center lg:text-left">
          Sabor, <br />
          Sutileza, <br />& Pasión.
        </p>
      ),
    },
  ];

  return (
    <section className="relative w-full h-fit min-h-[679px] grid grid-cols-1 lg:grid-rows-1 lg:grid-cols-2 mx:grid-cols-3 items-center pt-[118px] lg:pt-[0] pb-[88px] lg:pb-0">
      <aside className="pb-[30px] lg:pb-0">
        {content.map((elem) =>
          elem.lang === selectedLang ? elem.leftAside : null
        )}
      </aside>
      <img src={heroPicture} alt="hero" className="relative m-auto w-full max-w-[350px] lg:max-w-[400px]" />
      <aside>
        <h1 className="w-fit m-auto font-DMSerifDisplay text-[94px] text-main hidden mx:block">
          Vivence.
        </h1>
      </aside>
      {content.map((elem) =>
        elem.lang === selectedLang ? (
          <button
            key="language-button"
            className="absolute bottom-8 right-10 w-10 h-6 transition-all duration-300 hover:scale-110 active:scale-95"
            onClick={() => setLang(elem.next)}
          >
            <img src={elem.langIcon} alt={elem.lang + "-icon"} />
          </button>
        ) : null
      )}
    </section>
  );
}
