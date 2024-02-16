const CONTAINER_FOR_TARGET_TEXT = document.querySelector(
  ".game-target-text-container__target-text"
)!;
const EDITABLE_WORDS_ELEMENTS =
  document.getElementsByClassName("editable-char");

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
      text: "Alicia tem um tênis caríssimo!",
      alreadyUsed: false,
    },
    {
      text: "Os Flintstones têm um carro de pedra.",
      multableKeywords: ["têm"],
      alreadyUsed: false,
    },
    {
      text: "A mensagem vem de muito longe...",
      multableKeywords: [],
      alreadyUsed: false,
    },
    {
      text: "Os tripulantes vêm de lugares distantes!",
      multableKeywords: ["vêm"],
      alreadyUsed: false,
    },
    {
      text: "Minha família me mantém até eu arranjar um emprego.",
      multableKeywords: ["mantém"],
      alreadyUsed: false,
    },
    {
      text: "Aquelas senhoras mantêm segredos abomináveis!",
      multableKeywords: ["mantêm"],
      alreadyUsed: false,
    },
    {
      text: "Ele só colabora quando o convém.",
      multableKeywords: ["convém"],
      alreadyUsed: false,
    },
    {
      text: "Quando lhe convêm, você se interessa por minhas histórias.",
      multableKeywords: ["convêm,"],
      alreadyUsed: false,
    },
    {
      text: "Hoje, ele não nos detém, uma vez que, ontem, já não pôde.",
      multableKeywords: ["detém,", "pôde."],
      alreadyUsed: false,
    },
    {
      text: "Nesse momento, os policiais não nos detêm em casa, pois não têm um mandado.",
      multableKeywords: ["detêm", "têm"],
      alreadyUsed: false,
    },
  ];

  public content: string;
  public formatedContent: string = "";
  private mutableWords: Array<string> | undefined = [];

  constructor() {
    this.getNewText();
    this.unaccentuateText();
    this.displayText();
  }

  private getNewText() {
    let availableTexts = TargetText.TEXTS.filter((text) => !text.alreadyUsed);

    let reachedText =
      availableTexts[Math.floor(Math.random() * availableTexts.length)];
    this.mutableWords = reachedText.multableKeywords;

    TargetText.TEXTS.forEach((element) => {
      if (element.text === reachedText.text) {
        element.alreadyUsed = true;
      }
    });

    this.content = reachedText.text;
  }

  private unaccentuateText() {
    const TEXT_WORDS: string[] = this.content.split(" ");

    TEXT_WORDS.forEach((word) => {
      if (this.mutableWords?.includes(word)) {
        word = this.unaccentuateWord(word);
      }
      this.formatedContent += word + " ";
    });
  }

  private unaccentuateWord(word: string) {
    const POSSIBLE_ACCENTUATIONS = "áâéêíóôúû";
    const UNACCENTUATIONS = "aaeeioouu";

    const WORD_CHARS = Array.from(word);

    word = "";
    WORD_CHARS.forEach((char) => {
      if (POSSIBLE_ACCENTUATIONS.indexOf(char) > -1) {
        char = UNACCENTUATIONS[POSSIBLE_ACCENTUATIONS.indexOf(char)];
      }
      word += char;
    });

    return word;
  }

  private displayText() {
    render("modify", CONTAINER_FOR_TARGET_TEXT, "");
    const TEXT_WORDS = this.formatedContent.split(" ");

    TEXT_WORDS.forEach((word) => {
      let newWordElement = `<div class="full-word">`;

      let WORD_CHARS = Array.from(word);
      WORD_CHARS.forEach((char, index) => {
        newWordElement += this.createEditableCharElement(char);
      });

      newWordElement += `</div>`;

      render("keep", CONTAINER_FOR_TARGET_TEXT, newWordElement);
    });

    this.setEditableElementsEventListeners();
  }

  private createEditableCharElement(char: string) {
    const VOWELS = "aeiouáâéêíóôúû";

    if (" .,!".includes(char)) {
      return char;
    } else {
      return `<span class="editable-char">${char}<span class="editable-char__edit-container">
      ${
        VOWELS.includes(char.toLowerCase())
          ? "Hora de acentuar ✅"
          : "Acento aqui não! ❌"
      }</span></span>`;
    }
  }

  private setEditableElementsEventListeners() {
    if (EDITABLE_WORDS_ELEMENTS) {
      Array.from(EDITABLE_WORDS_ELEMENTS).forEach((element) => {
        (element as HTMLSpanElement).addEventListener(
          "click",
          function (event) {
            setWordEditableMode(event.target as HTMLSpanElement);
          }
        );
      });
    }
  }
}
new TargetText();

function setWordEditableMode(targetWordElement: HTMLSpanElement) {
  if (targetWordElement.classList.contains("editing-char")) {
    targetWordElement.classList.remove("editing-char");
    return;
  }

  Array.from(EDITABLE_WORDS_ELEMENTS).forEach((element) => {
    (element as HTMLSpanElement).classList.remove("editing-char");
  });

  targetWordElement.classList.add("editing-char");
}
