import brazilFlag from "../media/brazil-flag.png"
import argentinaFlag from "../media/argentina-flag.png"
import usaFlag from "../media/usa-flag.png"

export default function Contact({ lang }) {
  const content = [
    {
      lang: "pt-br",
      localization: [
        {address: "Washington, Estados Unidos", flag: usaFlag, contact: "1-202 123-456-789"},
        {address: "Buenos Aires, Argentina", flag: argentinaFlag, contact: "+54 9 123 456 789"},
        {address: "Brasília, Brasil", flag: brazilFlag, contact: "+55 61 9 1234-5678"},
      ],
      title: "Contato.",
      firstP: "Possuimos alguns pontos de produção e distribuição:",
    },
    {
      lang: "en",
      localization: [
        {address: "Washington, United States", flag: usaFlag, contact: "1-202 123-456-789"},
        {address: "Buenos Aires, Argentina", flag: argentinaFlag, contact: "+54 9 123 456 789"},
        {address: "Brasília, Brazil", flag: brazilFlag, contact: "+55 61 9 1234-5678"},
      ],
      title: "Contact.",
      firstP: "We own some production and distribution points:",
    },
    {
      lang: "es",
      localization: [
        {address: "Washington, Estados Unidos", flag: usaFlag, contact: "1-202 123-456-789"},
        {address: "Buenos Aires, Argentina", flag: argentinaFlag, contact: "+54 9 123 456 789"},
        {address: "Brasília, Brasil", flag: brazilFlag, contact: "+55 61 9 1234-5678"},
      ],
      title: "Contacto.",
      firstP: "Nosotros tenemos puntos de producción y distribución:",
    },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-[679px] pt-[88px] overflow-hidden border-t-2 border-dashed border-main"
    >
      <h1 className="w-fit m-auto font-DMSerifDisplay text-main text-[96px] uppercase">
        {content.map((elem) => (elem.lang === lang ? elem.title : ""))}
      </h1>
      <p className="font-DMSans text-txt text-[24px] mt-[30px] w-fit m-auto">
        {content.map((elem) => (elem.lang === lang ? elem.firstP : ""))}
      </p>
      <div className="flex flex-row flex-wrap items-center justify-around w-full mt-[100px]">
        {
            content.map(elem => elem.lang === lang ? elem.localization.map(localiz => (
                <div className="w-fit flex flex-col gap-[10px] items-center mx-[50px] mb-[50px]">
                    <p className="font-DMSans text-txt capitalize font-medium">{localiz.address} 📍</p>
                    <img src={localiz.flag} alt="localiz-flag" className="w-[250px] h-[175px]"/>
                    <p className="font-DMSans text-main font-medium">📞 {localiz.contact}</p>
                </div>
            )):null)
        }
      </div>
      <div className="absolute w-[450px] h-[450px] top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-main rotate-45"></div>
    </section>
  );
}
