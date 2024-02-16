var CONTAINER_FOR_TARGET_TEXT = document.querySelector(".game-target-text-container__target-text");
function render(mode, target, innerValue) {
    if (mode === "modify") {
        target.innerHTML = innerValue.toString();
    }
    else {
        target.innerHTML += innerValue.toString();
    }
}
var TargetText = /** @class */ (function () {
    function TargetText() {
        this.formatContent = "";
        this.mutableWords = [];
        this.getNewText();
        this.unaccentuateText();
        render("modify", CONTAINER_FOR_TARGET_TEXT, this.formatContent);
    }
    TargetText.prototype.getNewText = function () {
        var availableTexts = TargetText.TEXTS.filter(function (text) { return !text.alreadyUsed; });
        var reachedText = availableTexts[Math.floor(Math.random() * availableTexts.length)];
        this.mutableWords = reachedText.multableKeywords;
        TargetText.TEXTS.forEach(function (element) {
            if (element.text === reachedText.text) {
                element.alreadyUsed = true;
            }
        });
        this.content = reachedText.text;
    };
    TargetText.prototype.unaccentuateText = function () {
        var _this = this;
        var TEXT_WORDS = this.content.split(" ");
        TEXT_WORDS.forEach(function (word) {
            var _a;
            if ((_a = _this.mutableWords) === null || _a === void 0 ? void 0 : _a.includes(word)) {
                word = _this.unaccentuateWord(word);
            }
            _this.formatContent += word + " ";
        });
    };
    TargetText.prototype.unaccentuateWord = function (word) {
        var POSSIBLE_ACCENTUATIONS = "áâéêíóôúû";
        var UNACCENTUATIONS = "aaeeioouu";
        var WORD_CHARS = Array.from(word);
        word = "";
        WORD_CHARS.forEach(function (char) {
            if (POSSIBLE_ACCENTUATIONS.indexOf(char) > -1) {
                char = UNACCENTUATIONS[POSSIBLE_ACCENTUATIONS.indexOf(char)];
            }
            word += char;
        });
        return word;
    };
    TargetText.TEXTS = [
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
    return TargetText;
}());
new TargetText();
