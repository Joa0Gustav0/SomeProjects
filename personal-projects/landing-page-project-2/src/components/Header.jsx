import logo from "../media/logo.png";
import usaIcon from "../media/usa.png";
import brazilIcon from "../media/brazil.png";
import argentinaIcon from "../media/argentina.png";

export default function Header({ lang, setLang }) {
  const header = document.getElementById("header");

  window.onscroll = () =>
    window.scrollY > 100
      ? header?.classList.add("bg-white")
      : header?.classList.remove("bg-white");

  const content = [
    {
      lang: "pt-br",
      langIcon: brazilIcon,
      links: [
        { href: "#about", txt: "Sobre nós" },
        { href: "#reviews", txt: "Avaliações" },
        { href: "#contact", txt: "Contato" },
      ],
    },
    {
      lang: "en",
      langIcon: usaIcon,
      links: [
        { href: "#about", txt: "About" },
        { href: "#reviews", txt: "Reviews" },
        { href: "#contact", txt: "Contact" },
      ],
    },
    {
      lang: "es",
      langIcon: argentinaIcon,
      links: [
        { href: "#about", txt: "Sobre nosotros" },
        { href: "#reviews", txt: "Evaluaciones" },
        { href: "#contact", txt: "Contacto" },
      ],
    },
  ];

  return (
    <header id="header" className="fixed top-0 left-0 w-full transition-all duration-300">
      <div className="relative flex justify-center lg:justify-between m-auto items-center w-full px-10 py-8">
        <a href="/" className="flex items-center gap-3">
          <h1 className=" font-DMSerifDisplay capitalize font-normal text-main text-4xl">
            Vivence.
          </h1>
        </a>
        <ul className="hidden lg:flex items-center gap-5">
          {content.map((elem) =>
            elem.lang === lang
              ? elem.links.map((link, i) => (
                  <li
                    key={link.href}
                    className={
                      i >= 2
                        ? "group relative p-1 px-2 after:absolute after:w-3 after:border-b-2 after:border-main after:top-full after:left-1/2 after:-translate-x-1/2 hover:after:w-full after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-200"
                        : "group relative p-1 px-2 after:absolute after:w-3 after:border-b-2 after:border-main after:top-full after:left-1/2 after:-translate-x-1/2 hover:after:w-full after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-200 before:w-1 before:h-1 before:rounded-full before:bg-subMain before:absolute before:-right-3 before:top-1/2 before:-translate-y-1/2"
                    }
                  >
                    <a
                      href={link.href}
                      className="font-DMSans font-medium text-xl text-txt group-hover:text-cyan-800"
                    >
                      {link.txt}
                    </a>
                  </li>
                ))
              : null
          )}
        </ul>
      </div>
    </header>
  );
}
