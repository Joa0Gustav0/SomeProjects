import aboutSectionPicture from "../media/about-section-picture.png";

export default function About() {
  return (
    <section
      id="about"
      className=" relative w-full min-h-[679px] flex justify-between items-center overflow-hidden"
    >
      <aside className="w-1/2">
        <div className="max-w-[450px] m-auto">
          <h1 className="w-fit font-DMSerifDisplay text-[80px] text-main">
            É amor.
          </h1>
          <h2 className="font-DMSerifDisplay text-[32px] text-subMain w-fit">
            É mais que uma empresa...
          </h2>
          <p className="font-DMSans text-txt text-[22px] text-justify">
            Desde 1997, A <span className="font-bold">Vivence</span> desenvolve
            diariamente preparando diferentes
            <span className="font-bold">obras gastronômicas</span> pensando no
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
        className="relative h-screen max-h-[679px] z-10"
      />
      <div className="w-[850px] h-[850px] bg-main absolute translate-x-1/2  translate-y-1/2 right-0 bottom-0 rotate-45"></div>
    </section>
  );
}
