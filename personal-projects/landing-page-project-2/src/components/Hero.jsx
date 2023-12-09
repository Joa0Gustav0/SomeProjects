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
        <p className="font-DMSerifDisplay text-7xl text-subMain m-auto w-fit">
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
        <p className="font-DMSerifDisplay text-7xl text-subMain m-auto w-fit">
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
        <p className="font-DMSerifDisplay text-7xl text-subMain m-auto w-fit">
          Sabor, <br />
          Sutileza, <br />& Pasión.
        </p>
      ),
    },
  ];

  return (
    <section className="relative w-full h-fit min-h-[679px] grid grid-cols-3 items-center">
      <aside>
        {content.map((elem) =>
          elem.lang === selectedLang ? elem.leftAside : null
        )}
      </aside>
      <img src={heroPicture} alt="hero" className="relative" />
      <aside>
        <h1 className="w-fit m-auto font-DMSerifDisplay text-8xl text-main">
          Vivence.
        </h1>
      </aside>
      {content.map((elem) =>
        elem.lang === selectedLang ? (
          <button
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
