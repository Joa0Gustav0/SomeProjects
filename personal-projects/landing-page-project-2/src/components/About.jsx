import aboutSectionPicture from "../media/about-section-picture.png";
import altAboutSectionPicture from "../media/alt-about-section-picture.png"

export default function About() {
  return (
    <section
      id="about"
      className=" relative w-full mlg:min-h-[679px] flex justify-between items-center overflow-hidden px-[40px] mlg:pr-[0px] flex-col mlg:flex-row xl:pl-0 border-b-2 border-dashed border-main"
    >
      <aside className="mlg:w-1/2 pt-[30px]">
        <div className="max-w-[680px] mlg:max-w-[450px] m-auto text-center mlg:text-left">
          <h1 className="font-DMSerifDisplay text-[18vw] xsm:text-[82px] text-main">
            É amor.
          </h1>
          <h2 className="font-DMSerifDisplay text-[5.5vw] xsm:text-[34px] text-subMain mb-[20px]">
            É mais que uma empresa...
          </h2>
          <p className="font-DMSans text-txt text-[4.5vw] xsm:text-[24px] text-justify">
            Desde 1997, A <span className="font-bold">Vivence</span> desenvolve
            diariamente preparando diferentes
            <span className="font-bold"> obras gastronômicas</span> pensando no
            melhor para nossos clientes. Buscamos sempre, contando com uma
            equipe de{" "}
            <span className="font-bold">colaboradores apaixonados</span> pelo
            que fazem, entregar as{" "}
            <span className="font-bold">
              {" "}
              melhores e mais sinestésicas experiências
            </span>
            . Da <span className="font-bold">Vivence</span>, você pode sempre
            esperar por <span className="font-bold">sabor</span>,{" "}
            <span className="font-bold">sutileza</span> e{" "}
            <span className="font-bold">paixão</span>.
          </p>
        </div>
      </aside>
      <img
        src={aboutSectionPicture}
        alt="about"
        className="relative mlg:h-full max-w-[550px] mlg:max-w-[none] pt-[50px] mlg:pt-[88px] mlg:max-h-[679px] z-10 hidden mlg:block"
      />
      <img
        src={altAboutSectionPicture}
        alt="about"
        className="relative w-full max-w-[550px] pt-[50px] pb-[40px] z-10 block mlg:hidden"
      />
      <div className="w-[47vw] h-[20vw] block mlg:hidden rounded-[100%]  shadow-xl absolute bottom-[90px] left-1/2 -translate-x-1/2"></div>
      <div className="w-[700px] h-[700px] xl:w-[850px] xl:h-[850px] bg-main absolute translate-x-1/2 hidden mlg:block  translate-y-1/2 right-0 bottom-0 rotate-45"></div>
    </section>
  );
}
