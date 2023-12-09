export default function Header({ lang, navbarActive, setNavbarActive }) {
  const content = [
    {
      lang: "pt-br",
      links: [
        { href: "#about", txt: "Sobre nós" },
        { href: "#reviews", txt: "Avaliações" },
        { href: "#contact", txt: "Contato" },
      ],
    },
    {
      lang: "en",
      links: [
        { href: "#about", txt: "About" },
        { href: "#reviews", txt: "Reviews" },
        { href: "#contact", txt: "Contact" },
      ],
    },
    {
      lang: "es",
      links: [
        { href: "#about", txt: "Sobre nosotros" },
        { href: "#reviews", txt: "Evaluaciones" },
        { href: "#contact", txt: "Contacto" },
      ],
    },
  ];

  return (
    <header
      id="header"
      className="fixed -top-[1px] left-1/2 -translate-x-1/2 w-full max-w-[1366px] z-50 transition-all duration-200"
    >
      <div className="relative flex justify-center lg:justify-between m-auto items-center w-full px-8 py-6">
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
                        ? "relative p-1 px-2 after:absolute after:w-3 after:border-b-2 after:border-main after:top-full after:left-1/2 after:-translate-x-1/2 hover:after:w-full after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-200"
                        : "relative p-1 px-2 after:absolute after:w-3 after:border-b-2 after:border-main after:top-full after:left-1/2 after:-translate-x-1/2 hover:after:w-full after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-200 before:w-1 before:h-1 before:rounded-full before:bg-subMain before:absolute before:-right-3 before:top-1/2 before:-translate-y-1/2"
                    }
                  >
                    <a
                      href={link.href}
                      className="font-DMSans font-medium text-xl text-txt hover:text-cyan-800"
                    >
                      {link.txt}
                    </a>
                  </li>
                ))
              : null
          )}
        </ul>
        <ion-icon name="menu" onClick={() => setNavbarActive()}></ion-icon>
        <ul
          className={
            navbarActive === true
              ? "absolute right-0 top-full p-[15px] shadow-sm bg-white w-full justify-center lg:hidden flex-col flex xxsm:flex-row items-center gap-5 transition-all duration-300"
              : "absolute right-full top-full p-[15px] shadow-sm bg-white w-full justify-center lg:hidden flex-col flex xxsm:flex-row items-center gap-5 transition-all duration-300"
          }
        >
          {content.map((elem) =>
            elem.lang === lang
              ? elem.links.map((link, i) => (
                  <li
                    key={link.href}
                    className={
                      i >= 2
                        ? "relative p-1 px-2 after:absolute after:w-3 after:border-b-2 after:border-main after:top-full after:left-1/2 after:-translate-x-1/2 hover:after:w-full after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-200 before:w-1 before:h-1 before:rounded-full before:bg-subMain before:absolute before:-right-3 before:top-1/2 before:-translate-y-1/2 xxsm:before:hidden"
                        : "relative p-1 px-2 after:absolute after:w-3 after:border-b-2 after:border-main after:top-full after:left-1/2 after:-translate-x-1/2 hover:after:w-full after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-200 before:w-1 before:h-1 before:rounded-full before:bg-subMain before:absolute before:-right-3 before:top-1/2 before:-translate-y-1/2"
                    }
                  >
                    <a
                      href={link.href}
                      className="font-DMSans font-medium text-xl text-txt hover:text-cyan-800"
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
