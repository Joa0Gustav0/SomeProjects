import mosaicFirst from "../media/reviews-section-picture-1.jpg";
import mosaicSecond from "../media/reviews-section-picture-2.jpg";
import mosaicThird from "../media/reviews-section-picture-3.jpg";
import mosaicForth from "../media/reviews-section-picture-4.jpg";

export default function Reviews({ lang }) {
  const mosaicPics = [
    { img: mosaicFirst, rows: 2, cols: 1 },
    { img: mosaicSecond, rows: 1, cols: 2 },
    { img: mosaicThird, rows: 1, cols: 1 },
    { img: mosaicForth, rows: 1, cols: 1 },
  ];

  const content = [
    {
      lang: "pt-br",
      subtitle: "também é",
      title: "Confiança.",
      reviews: [
        {
          txt: "“Foi o melhor bolo que podiamos ter em nosso casamento...”",
          author: "Sheyla Cristina",
        },
        {
          txt: "“O casamento foi incrível! Mas esse bolo... Esse bolo estava perfeito!”",
          author: "Carlos Souza",
        },
        {
          txt: "“Eu não esquecerei nunca da sensação de degustar esse bolo...”",
          author: "Manuela Paz",
        },
      ],
    },
    {
      lang: "en",
      subtitle: "is also",
      title: "Trust.",
      reviews: [
        {
          txt: "“Was the best cake we could have in our wedding...”",
          author: "Sheyla Cristina",
        },
        {
          txt: "“The wedding was incredible! But this cake... This cake was perfect!”",
          author: "Carlos Souza",
        },
        {
          txt: "“I will never forget the sensation of enjoying this cake...”",
          author: "Manuela Paz",
        },
      ],
    },
    {
      lang: "es",
      subtitle: "también es",
      title: "Confianza.",
      reviews: [
        {
          txt: "“Fue el mejor pastel que pudimos tener em nuestra boda...”",
          author: "Sheyla Cristina",
        },
        {
          txt: "“¡La boda fue increible! Pero este pastel... ¡Este pastel estava perfecto!”",
          author: "Carlos Souza",
        },
        {
          txt: "“Yo non olvidaré la sensación de desgutar este pastel...”",
          author: "Manuela Paz",
        },
      ],
    },
  ];

  return (
    <section
      id="reviews"
      className="relative min-h-[679px] pt-[88px] pb-[80px] flex flex-col items-center gap-[35px] px-[20px] sm:px-[40px] overflow-hidden"
    >
      <aside className="w-fit flex flex-col items-center">
        <h2 className="w-fit mt-[30px] font-DMSerifDisplay text-subMain text-[10vw] xsm:text-[56px]">
          <span className="text-main">Vivence</span>{" "}
          {content.map((elem) => (elem.lang === lang ? elem.subtitle : ""))}
        </h2>
        <h1 className="w-fit font-DMSerifDisplay text-main text-[15vw] xsm:text-[96px] uppercase">
          {content.map((elem) => (elem.lang === lang ? elem.title : ""))}
        </h1>
      </aside>
      <aside className="grid grid-cols-2 grid-rows-3  xxsm:grid-rows-2 xxsm:grid-cols-3 max-w-[650px] m-auto gap-[20px]">
        {mosaicPics.map((elem, i) => (
          <img
            key={"mosaic-pic" + i}
            src={elem.img}
            alt="mosaic-pic"
            className={
              i === 0
                ? ` self-stretch row-span-2 rounded-sm hover:scale-105 transition-all duration-[.4s]`
                : i === 1
                  ? `col-span-2 rounded-sm hover:scale-105 transition-all order-1 xxsm:order-[none] duration-[.4s]`
                  : "rounded-sm self-stretch hover:scale-105 transition-all duration-[.4s]"
            }
          />
        ))}
      </aside>
      <aside className="flex flex-col items-center gap-[60px] md:gap-[30px]">
        {content.map((elem) =>
          elem.lang === lang
            ? elem.reviews.map((review, i) => (
                <div key={"review" + i} className="flex flex-col items-center md:items-end max-w-[650px] relative after:absolute after:-bottom-[30px] after:w-1/4 after:border-dotted after:h-1 after:border-b-2 after:border-subMain md:after:hidden last-of-type:after:hidden">
                  <p className="text-[20px] text-txtLessOpacity font-DMSerifDisplay italic text-center">
                    {review.txt}
                  </p>
                  <h3 className="text-[20px] text-txt font-DMSerifDisplay">
                    {review.author}
                  </h3>
                </div>
              ))
            : null
        )}
      </aside>
      <div className="w-[450px] h-[450px] bg-main hidden mx:block absolute left-0 bottom-0 -translate-x-1/2 translate-y-1/2 rotate-45"></div>
    </section>
  );
}
