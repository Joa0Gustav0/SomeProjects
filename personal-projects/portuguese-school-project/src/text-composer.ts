class TargetText {
  static TEXTS = [
    {
      text: "1O sabiá disse que sabia assoviar, mas quando o sabiá viu o sábio, o sábio disse que o sabiá não sabia assoviar.",
      alreadyUsed: false,
    },
    {
      text: "2O sabiá disse que sabia assoviar, mas quando o sabiá viu o sábio, o sábio disse que o sabiá não sabia assoviar.",
      alreadyUsed: false,
    },
    {
      text: "3O sabiá disse que sabia assoviar, mas quando o sabiá viu o sábio, o sábio disse que o sabiá não sabia assoviar.",
      alreadyUsed: false,
    },
    {
      text: "4O sabiá disse que sabia assoviar, mas quando o sabiá viu o sábio, o sábio disse que o sabiá não sabia assoviar.",
      alreadyUsed: false,
    },
  ];

  public content;

  constructor() {
    this.content = this.getText();
  }

  private getText() {
    let availableTexts = TargetText.TEXTS.filter((text) => !text.alreadyUsed);

    let reachedText = availableTexts[Math.floor(Math.random() * availableTexts.length)].text;

    TargetText.TEXTS.forEach((element) => {
      if (element.text === reachedText) {
        element.alreadyUsed = true;
      }
    })

    return reachedText;
  }
}
