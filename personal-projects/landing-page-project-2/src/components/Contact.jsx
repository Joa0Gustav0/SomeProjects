import brazilFlag from "../media/brazil-flag.png";
import argentinaFlag from "../media/argentina-flag.png";
import usaFlag from "../media/usa-flag.png";

export default function Contact({ lang }) {
  const content = [
    {
      lang: "pt-br",
      localization: [
        {
          address: "Washington, Estados Unidos",
          flag: usaFlag,
          contact: "1-202 123-456-789",
        },
        {
          address: "Buenos Aires, Argentina",
          flag: argentinaFlag,
          contact: "+54 9 123 456 789",
        },
        {
          address: "Brasília, Brasil",
          flag: brazilFlag,
          contact: "+55 61 9 1234-5678",
        },
      ],
      title: "Contato.",
      firstP: "Possuimos alguns pontos de produção e distribuição:",
      secondP: (
        <p key="paragraph" className="font-DMSans text-txt text-[4.5vw] xsm:text-[22px] text-center mb-[50px] w-fit m-auto">
          Deseja nos contatar? <br />
          Utilize o número com a localização mais próxima de seu país. <br />
          Ou entre em contato via email.
        </p>
      ),
    },
    {
      lang: "en",
      localization: [
        {
          address: "Washington, United States",
          flag: usaFlag,
          contact: "1-202 123-456-789",
        },
        {
          address: "Buenos Aires, Argentina",
          flag: argentinaFlag,
          contact: "+54 9 123 456 789",
        },
        {
          address: "Brasília, Brazil",
          flag: brazilFlag,
          contact: "+55 61 9 1234-5678",
        },
      ],
      title: "Contact.",
      firstP: "We own some production and distribution points:",
      secondP: (
        <p key="paragraph" className="font-DMSans text-txt text-[4.5vw] xsm:text-[22px] text-center mb-[50px] w-fit m-auto">
          Do you want to contact us? <br />
          Use the number closest to your country. <br />
          Or contact us via email.
        </p>
      ),
    },
    {
      lang: "es",
      localization: [
        {
          address: "Washington, Estados Unidos",
          flag: usaFlag,
          contact: "1-202 123-456-789",
        },
        {
          address: "Buenos Aires, Argentina",
          flag: argentinaFlag,
          contact: "+54 9 123 456 789",
        },
        {
          address: "Brasília, Brasil",
          flag: brazilFlag,
          contact: "+55 61 9 1234-5678",
        },
      ],
      title: "Contacto.",
      firstP: "Nosotros tenemos puntos de producción y distribución:",
      secondP: (
        <p key="paragraph" className="font-DMSans text-txt text-[4.5vw] xsm:text-[22px] text-center mb-[50px] w-fit m-auto">
          ¿Quieres contactar con nosotros? <br />
          Utilice el número más cercano a su país. <br />O contáctenos por
          correo electrónico.
        </p>
      ),
    },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-[679px] pt-[88px] overflow-hidden border-t-2 border-dashed border-main p-[20px] sm:px-[40px] text-center"
    >
      <h1 className="w-fit m-auto font-DMSerifDisplay text-main text-[15vw] xsm:text-[96px] uppercase">
        {content.map((elem) => (elem.lang === lang ? elem.title : ""))}
      </h1>
      <p className="font-DMSans text-txt text-[4.75vw] xsm:text-[24px] mt-[30px] w-fit m-auto px-[40px] text-center">
        {content.map((elem) => (elem.lang === lang ? elem.firstP : ""))}
      </p>
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-around w-full mt-[50px] sm:mt-[100px] mb-[50px] gap-[50px]">
        {content.map((elem) =>
          elem.lang === lang
            ? elem.localization.map((localiz, i) => (
                <div key={"localiz" + i} className="w-fit flex flex-col gap-[10px] items-center">
                  <p className="font-DMSans text-txt capitalize font-medium">
                    {localiz.address} 📍
                  </p>
                  <img
                    src={localiz.flag}
                    alt="localiz-flag"
                    className="w-[250px] sm:h-[175px]"
                  />
                  <p className="font-DMSans text-main font-medium">
                    📞 {localiz.contact}
                  </p>
                </div>
              ))
            : null
        )}
      </div>
      {content.map((elem) => (elem.lang === lang ? elem.secondP : null))}
      <p className="font-DMSans text-[20px] font-medium w-fit m-auto text-center text-main mb-[40px] break-all">
        ✉ <br /> vivance.example.ex@outlook.com
      </p>
      <h1 className="lg:absolute -bottom-[25px] right-[40px] m-auto w-fit font-Ephesis text-[36px] mb-[25px]">
        Vivence.
      </h1>
      <p className="font-DMSans text-[18px] w-fit m-auto p-[10px]">
        ©copyright, VIVENCE. All Rights Reserved.
      </p>
      <div className="absolute w-[450px] h-[450px] top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-main rotate-45 hidden mx:block"></div>
    </section>
  );
}
