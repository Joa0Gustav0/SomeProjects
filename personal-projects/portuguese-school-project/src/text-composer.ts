const CONTAINER_FOR_TARGET_TEXT = document.querySelector(
  ".game-target-text-container__target-text"
)!;

function render(
  mode: "modify" | "keep",
  target: Element,
  innerValue: string | number
) {
  if (mode === "modify") {
    target.innerHTML = innerValue.toString();
  } else {
    target.innerHTML += innerValue.toString();
  }
}

class TargetText {
  static TEXTS = [
    {
      text: "O sabiá disse que sabia assoviar, mas quando o sabiá viu o sábio, o sábio disse que o sabiá não sabia assoviar.",
      alreadyUsed: false,
    },
    {
      text: "Alicia tem um tênis caríssimo!",
      alreadyUsed: false,
    },
    {
      text: "Os Flintstones têm um carro de pedra.",
      alreadyUsed: false,
    },
    {
      text: "A mensagem vem de muito longe...",
      alreadyUsed: false,
    },
    {
      text: "Os tripulantes vêm de lugares distantes!",
      alreadyUsed: false,
    },
    {
      text: "Minha família me mantém até eu arranjar um emprego.",
      alreadyUsed: false,
    },
    {
      text: "Aquelas senhoras mantêm segredos abomináveis!",
      alreadyUsed: false,
    },
    {
      text: "Ele só colabora quando o convém.",
      alreadyUsed: false,
    },
    {
      text: "Quando lhe convêm, você se interessa por minhas histórias.",
      alreadyUsed: false,
    },
    {
      text: "Hoje, ele não nos detém, uma vez que, ontem, já não pôde.",
      alreadyUsed: false,
    },
    {
      text: "Nesse momento, os policiais não nos detêm em casa, pois não têm um mandado.",
      alreadyUsed: false,
    },
  ];

  public content;

  constructor() {
    this.content = this.getText();
  }

  private getText() {
    let availableTexts = TargetText.TEXTS.filter((text) => !text.alreadyUsed);

    let reachedText =
      availableTexts[Math.floor(Math.random() * availableTexts.length)].text;

    TargetText.TEXTS.forEach((element) => {
      if (element.text === reachedText) {
        element.alreadyUsed = true;
      }
    });

    render("modify", CONTAINER_FOR_TARGET_TEXT, reachedText);
    return reachedText;
  }
}

new TargetText();
