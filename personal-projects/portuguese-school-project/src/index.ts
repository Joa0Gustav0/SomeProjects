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

const PLAYERS_SCORES_TXTS = document.getElementsByClassName(
  "pontuations-container__player-pontuation__text"
);

const CONTAINER_FOR_ALL_PLAYERS_SCORES = document.querySelector(".pontuations-container")!;

class PlayersScore {
  static quantityOfPlayersInGame = 0;
  static players: Array<PlayersScore> = [];

  constructor(
    public emoji: string,
    public score: number = 0,
    private index = PlayersScore.quantityOfPlayersInGame
  ) {
    PlayersScore.createPlayerScoreContainer(emoji, score);
    render(
      "modify",
      PLAYERS_SCORES_TXTS[index],
      score < 10 ? "0" + score.toString() : score
    );
    PlayersScore.players.push(this);
    PlayersScore.quantityOfPlayersInGame++;
  }

  static updateScore(
    action: "increase" | "decrease",
    targetPlayerEmoji: string,
    entryValue: number
  ) {
    PlayersScore.players.map((player, index) => {
      if (player.emoji === targetPlayerEmoji) {
        if (action === "decrease") {
          player.score -= entryValue;
        } else {
          player.score += entryValue;
        }
        render("modify", PLAYERS_SCORES_TXTS[player.index], player.score < 10 ? "0" + player.score : player.score);
      }
    });
  }

  private static createPlayerScoreContainer(
    targetPlayerEmoji: string,
    targetPlayerScore: number
  ) {
    render(
      "keep",
      CONTAINER_FOR_ALL_PLAYERS_SCORES,
      `
    <h1 class="pontuations-container__player-pontuation">
    ${targetPlayerEmoji}
    <span class="pontuations-container__player-pontuation__text"
      >${targetPlayerScore}</span
    >
    <img src="../public/media/crown-icon.png" alt="ícone de coroa">
  </h1>
    `
    );
  }

  private static getMajorScore(entryScore1: number, entryScore2: number) {
    if (entryScore1 === entryScore2) {
      return null;
    }

    if (entryScore1 > entryScore2) {
      return entryScore1;
    } else {
      return entryScore2;
    }
  }

  static setMajorScorePlayerCrown() {
    var lastMajorScorePlayer = {
      emoji: "",
      score: 0,
    };

    this.players.map((player, index) => {
      if (player.score > lastMajorScorePlayer.score) {
        lastMajorScorePlayer.emoji = player.emoji;
        lastMajorScorePlayer.score = player.score;
      }
    });

    Array.from(PLAYERS_SCORES_TXTS).map((scoreElement) => {
      if (scoreElement.innerHTML === lastMajorScorePlayer.score.toString()) {
        (scoreElement.parentNode! as Element).classList.add("crown");
      }
    });
  }
}


const CONTAINER_FOR_TARGET_TEXT = document.querySelector(
  ".game-target-text-container__target-text"
)!;
const EDITABLE_WORDS_ELEMENTS =
  document.getElementsByClassName("editable-char");

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
      multableKeywords: ["convém."],
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

  static content: string;
  static formatedContent: string = "";
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

    TargetText.content = reachedText.text;
  }

  private unaccentuateText() {
    const TEXT_WORDS: string[] = TargetText.content.split(" ");

    TEXT_WORDS.forEach((word) => {
      if (this.mutableWords?.includes(word)) {
        word = this.unaccentuateWord(word);
      }
      TargetText.formatedContent += word + " ";
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
    const TEXT_WORDS = TargetText.formatedContent.split(" ");

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

  private getCharPossibleAccentuations(entryChar: string) {
    const POSSIBLE_ACCENTUATIONS = "áâéêíîóôúû";
    const UNACCENTUATIONS = "aaeeiioouu";

    const CHAR_INDEX = POSSIBLE_ACCENTUATIONS.includes(entryChar.toLowerCase())
      ? POSSIBLE_ACCENTUATIONS.indexOf(entryChar.toLowerCase())
      : UNACCENTUATIONS.indexOf(entryChar.toLowerCase());

    const isCircumflex = CHAR_INDEX % 2 !== 0;

    return [
      UNACCENTUATIONS[CHAR_INDEX],
      isCircumflex
        ? POSSIBLE_ACCENTUATIONS[CHAR_INDEX - 1]
        : POSSIBLE_ACCENTUATIONS[CHAR_INDEX],
      isCircumflex
        ? entryChar.toLowerCase()
        : POSSIBLE_ACCENTUATIONS[CHAR_INDEX + 1],
    ];
  }

  private createEditableCharElement(char: string) {
    const VOWELS = "aeiouáâéêíóôúû";
    let CONTAINER_SIGNS_BUTTONS = "";

    this.getCharPossibleAccentuations(char).forEach((accentuatedChar) => {
      CONTAINER_SIGNS_BUTTONS += `<button class="editable-char__edit-container__buttons" onClick="TargetText.editAccentuation(this)">${accentuatedChar}</button>`;
    });

    if (" .,!".includes(char)) {
      return char;
    }

    return `<span class="editable-char">${char}<span class="editable-char__edit-container">
      ${
        VOWELS.includes(char.toLowerCase())
          ? CONTAINER_SIGNS_BUTTONS
          : "Acento aqui não! ❌"
      }<div class="editable-char__edit-container__index"></div></span></span>`;
  }

  private setEditableElementsEventListeners() {
    if (EDITABLE_WORDS_ELEMENTS) {
      Array.from(EDITABLE_WORDS_ELEMENTS).forEach((element) => {
        (element as HTMLSpanElement).addEventListener(
          "click",
          function (event) {
            TargetText.setWordEditableMode(event.target as HTMLSpanElement);
          }
        );
      });
    }
  }

  static editAccentuation(selectedAccentuation: HTMLElement) {
    let currentCharElement = selectedAccentuation.parentNode?.parentNode;
    (currentCharElement as HTMLElement).innerHTML = (
      currentCharElement as HTMLElement
    ).innerHTML.replace(
      (currentCharElement as HTMLElement).innerHTML[0],
      selectedAccentuation.innerHTML
    );
  }

  static setWordEditableMode(targetWordElement: HTMLSpanElement) {
    if (targetWordElement.classList.contains("editing-char")) {
      targetWordElement.classList.remove("editing-char");
      return;
    }
  
    Array.from(EDITABLE_WORDS_ELEMENTS).forEach((element) => {
      (element as HTMLSpanElement).classList.remove("editing-char");
    });
  
    targetWordElement.classList.add("editing-char");
  }
}

new TargetText();

class MainButton {
  static readonly BUTTON_ELEMENT: HTMLElement = document.querySelector(
    ".check-result-button"
  )!

  constructor() {
    MainButton.setButtonListener()
  }

  static setButtonListener() {
    this.BUTTON_ELEMENT.addEventListener("click", function () {
      MainButton.disableInteractableCharElements();
    
      MainButton.compareTexts(MainButton.getCorrectTextChars(), MainButton.getEditedTextChars());
    });
  }

  static disableInteractableCharElements() {
    Array.from(document.getElementsByClassName("editable-char")).map((element) =>
      element.classList.add("off")
    );
  }
  
  static getCorrectTextChars() {
    return Array.from(TargetText.content.toLowerCase()).filter(
      (char) => !" .,!".includes(char)
    );
  }
  static getEditedTextChars() {
    return Array.from(document.getElementsByClassName("editable-char")).map(
      (element) => element.innerHTML[0].toLowerCase()
    );
  }
  
  static compareTexts(modelText: string[], analisedText: string[]) {
    modelText.forEach((char: string, index: number) => {
      if (char !== analisedText[index]) {
        MainButton.setWordStatus(index, "error");
      } else {
        MainButton.setWordStatus(index, "correct");
      }
    });
  }
  static setWordStatus(index: number, status: "error" | "correct") {
    let allChars = document.getElementsByClassName("editable-char");
  
    let targetChar = allChars[index]
    let targetCharEditContainer = (targetChar.childNodes[1] as HTMLElement);
  
    if (status === "correct") {
      targetChar?.parentElement?.classList.add("correct-word");
    } else {
      targetChar.classList.add("error-char");
      MainButton.setEditContainerCorrection(targetCharEditContainer, index);
    
      targetChar?.parentElement?.classList.add("error-word");
    }
  } 
  
  static setEditContainerCorrection(charEditContainer: HTMLElement, index: number) {
    let correctChar = MainButton.getCorrectTextChars()[index].toUpperCase();
  
    charEditContainer.innerHTML = 
    `<p class="editable-char__edit-container__paragraph">${correctChar} 👈</p><div class="editable-char__edit-container__index"></div>`
  }
}
new MainButton();



