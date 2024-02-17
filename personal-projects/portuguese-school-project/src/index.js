function render(mode, target, innerValue) {
    if (mode === "modify") {
        target.innerHTML = innerValue.toString();
    }
    else {
        target.innerHTML += innerValue.toString();
    }
}
var PLAYERS_SCORES_TXTS = document.getElementsByClassName("pontuations-container__player-pontuation__text");
var CONTAINER_FOR_ALL_PLAYERS_SCORES = document.querySelector(".pontuations-container");
var PlayersScore = /** @class */ (function () {
    function PlayersScore(emoji, score, index) {
        if (score === void 0) { score = 0; }
        if (index === void 0) { index = PlayersScore.quantityOfPlayersInGame; }
        this.emoji = emoji;
        this.score = score;
        this.index = index;
        PlayersScore.createPlayerScoreContainer(emoji, score);
        render("modify", PLAYERS_SCORES_TXTS[index], score < 10 ? "0" + score.toString() : score);
        PlayersScore.players.push(this);
        PlayersScore.quantityOfPlayersInGame++;
    }
    PlayersScore.updateScore = function (action, targetPlayerEmoji, entryValue) {
        PlayersScore.players.map(function (player, index) {
            if (player.emoji === targetPlayerEmoji) {
                if (action === "decrease") {
                    player.score -= entryValue;
                }
                else {
                    player.score += entryValue;
                }
                render("modify", PLAYERS_SCORES_TXTS[player.index], player.score < 10 ? "0" + player.score : player.score);
            }
        });
    };
    PlayersScore.createPlayerScoreContainer = function (targetPlayerEmoji, targetPlayerScore) {
        render("keep", CONTAINER_FOR_ALL_PLAYERS_SCORES, "\n    <h1 class=\"pontuations-container__player-pontuation\">\n    ".concat(targetPlayerEmoji, "\n    <span class=\"pontuations-container__player-pontuation__text\"\n      >").concat(targetPlayerScore, "</span\n    >\n    <img src=\"../public/media/crown-icon.png\" alt=\"\u00EDcone de coroa\">\n  </h1>\n    "));
    };
    PlayersScore.setMajorScorePlayerCrown = function () {
        PlayersScore.winner = "";
        var lastMajorScorePlayer = {
            emoji: "",
            score: 0,
        };
        this.players.map(function (player) {
            if (player.score > lastMajorScorePlayer.score) {
                lastMajorScorePlayer.emoji = player.emoji;
                lastMajorScorePlayer.score = player.score;
            }
        });
        Array.from(PLAYERS_SCORES_TXTS).map(function (scoreElement) {
            if (scoreElement.innerHTML === lastMajorScorePlayer.score.toString()) {
                scoreElement.parentNode.classList.add("crown");
            }
            else {
                scoreElement.parentNode.classList.remove("crown");
            }
        });
        var playersWithCrown = document.getElementsByClassName("crown");
        Array.from(playersWithCrown).forEach(function (player, index) {
            var playerEmoji = Array.from(player.textContent)[5];
            var emojiUnicode = playerEmoji.codePointAt(0).toString(16);
            PlayersScore.winner +=
                emojiUnicode +
                    "".concat(index < Array.from(playersWithCrown).length - 1 ? "$" : "");
        });
        if (playersWithCrown.length > 1) {
            Array.from(playersWithCrown).forEach(function (player) {
                player.classList.remove("crown");
            });
        }
    };
    PlayersScore.quantityOfPlayersInGame = 0;
    PlayersScore.players = [];
    PlayersScore.winner = "";
    PlayersScore.winnerScore = "";
    return PlayersScore;
}());
var CONTAINER_FOR_TARGET_TEXT = document.querySelector(".game-target-text-container__target-text");
var EDITABLE_WORDS_ELEMENTS = document.getElementsByClassName("editable-char");
var TargetText = /** @class */ (function () {
    function TargetText() {
        this.getNewText();
        this.unaccentuateText();
        this.displayText();
    }
    TargetText.prototype.getNewText = function () {
        TargetText.content = "";
        var availableTexts = TargetText.TEXTS.filter(function (text) { return !text.alreadyUsed; });
        var reachedText = availableTexts[Math.floor(Math.random() * availableTexts.length)];
        TargetText.mutableWords = reachedText.multableKeywords;
        TargetText.TEXTS.forEach(function (element) {
            if (element.text === reachedText.text) {
                element.alreadyUsed = true;
            }
        });
        TargetText.content = reachedText.text;
    };
    TargetText.prototype.unaccentuateText = function () {
        var _this = this;
        var TEXT_WORDS = TargetText.content.split(" ");
        TargetText.formatedContent = "";
        TEXT_WORDS.forEach(function (word) {
            var _a;
            if ((_a = TargetText.mutableWords) === null || _a === void 0 ? void 0 : _a.includes(word)) {
                word = _this.unaccentuateWord(word);
            }
            TargetText.formatedContent += word + " ";
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
    TargetText.prototype.displayText = function () {
        var _this = this;
        render("modify", CONTAINER_FOR_TARGET_TEXT, "");
        var TEXT_WORDS = TargetText.formatedContent.split(" ");
        TEXT_WORDS.forEach(function (word) {
            var newWordElement = "<div class=\"full-word\">";
            var WORD_CHARS = Array.from(word);
            WORD_CHARS.forEach(function (char, index) {
                newWordElement += _this.createEditableCharElement(char);
            });
            newWordElement += "</div>";
            render("keep", CONTAINER_FOR_TARGET_TEXT, newWordElement);
        });
        this.setEditableElementsEventListeners();
    };
    TargetText.prototype.getCharPossibleAccentuations = function (entryChar) {
        var POSSIBLE_ACCENTUATIONS = "áâéêíîóôúû";
        var UNACCENTUATIONS = "aaeeiioouu";
        var CHAR_INDEX = POSSIBLE_ACCENTUATIONS.includes(entryChar.toLowerCase())
            ? POSSIBLE_ACCENTUATIONS.indexOf(entryChar.toLowerCase())
            : UNACCENTUATIONS.indexOf(entryChar.toLowerCase());
        var isCircumflex = CHAR_INDEX % 2 !== 0;
        return [
            UNACCENTUATIONS[CHAR_INDEX],
            isCircumflex
                ? POSSIBLE_ACCENTUATIONS[CHAR_INDEX - 1]
                : POSSIBLE_ACCENTUATIONS[CHAR_INDEX],
            isCircumflex
                ? entryChar.toLowerCase()
                : POSSIBLE_ACCENTUATIONS[CHAR_INDEX + 1],
        ];
    };
    TargetText.prototype.createEditableCharElement = function (char) {
        var VOWELS = "aeiouáâéêíóôúû";
        var CONTAINER_SIGNS_BUTTONS = "";
        this.getCharPossibleAccentuations(char).forEach(function (accentuatedChar) {
            CONTAINER_SIGNS_BUTTONS += "<button class=\"editable-char__edit-container__buttons\" onClick=\"TargetText.editAccentuation(this)\">".concat(accentuatedChar, "</button>");
        });
        if (" .,!".includes(char)) {
            return char;
        }
        return "<span class=\"editable-char\">".concat(char, "<span class=\"editable-char__edit-container\">\n      ").concat(VOWELS.includes(char.toLowerCase())
            ? CONTAINER_SIGNS_BUTTONS
            : "Acento aqui não! ❌", "<div class=\"editable-char__edit-container__index\"></div></span></span>");
    };
    TargetText.prototype.setEditableElementsEventListeners = function () {
        if (EDITABLE_WORDS_ELEMENTS) {
            Array.from(EDITABLE_WORDS_ELEMENTS).forEach(function (element) {
                element.addEventListener("click", function (event) {
                    TargetText.setWordEditableMode(event.target);
                });
            });
        }
    };
    TargetText.editAccentuation = function (selectedAccentuation) {
        var _a;
        var currentCharElement = (_a = selectedAccentuation.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode;
        currentCharElement.innerHTML = currentCharElement.innerHTML.replace(currentCharElement.innerHTML[0], selectedAccentuation.innerHTML);
    };
    TargetText.setWordEditableMode = function (targetWordElement) {
        if (targetWordElement.classList.contains("editing-char")) {
            targetWordElement.classList.remove("editing-char");
            return;
        }
        Array.from(EDITABLE_WORDS_ELEMENTS).forEach(function (element) {
            element.classList.remove("editing-char");
        });
        targetWordElement.classList.add("editing-char");
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
            multableKeywords: ["convém."],
            alreadyUsed: false,
        },
        {
            text: "Quando minhas histórias lhe convêm, elas lhe interessam.",
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
    TargetText.formatedContent = "";
    TargetText.mutableWords = [];
    return TargetText;
}());
var MainButton = /** @class */ (function () {
    function MainButton() {
        MainButton.setButtonListener("check");
    }
    MainButton.setButtonListener = function (action) {
        this.BUTTON_ELEMENT.removeEventListener("click", this.check);
        this.BUTTON_ELEMENT.removeEventListener("click", this.setNewRound);
        if (action === "check") {
            this.BUTTON_ELEMENT.addEventListener("click", this.check);
        }
        else {
            this.BUTTON_ELEMENT.addEventListener("click", this.setNewRound);
        }
    };
    MainButton.check = function () {
        MainButton.disableInteractableCharElements();
        MainButton.compareTexts(MainButton.getCorrectTextChars(), MainButton.getEditedTextChars());
        MainButton.setButtonListener("set-new-round");
        var decorativeEmojis = ["🚀", "🎠", "🎯", "🚴", "🚗"];
        if (GameRound.round === TargetText.TEXTS.length) {
            MainButton.BUTTON_ELEMENT.innerHTML = "Espiar Resultados \uD83C\uDFC6";
        }
        else {
            MainButton.BUTTON_ELEMENT.innerHTML =
                "Proxima Rodada " +
                    decorativeEmojis[Math.floor(Math.random() * decorativeEmojis.length)];
        }
    };
    MainButton.setNewRound = function () {
        PlayersScore.winnerScore = "";
        var PLAYERS_SCORES = "";
        PlayersScore.players.map(function (player, index) {
            return (PLAYERS_SCORES +=
                player.score +
                    "".concat(index < PlayersScore.players.length - 1 ? "$" : ""));
        });
        if (GameRound.round === TargetText.TEXTS.length) {
            open("/public/congratulations.html?scores=" +
                PLAYERS_SCORES +
                "winner=" +
                PlayersScore.winner, "_self");
            return;
        }
        new TargetText();
        new MainButton();
        GameRound.setRound();
        MainButton.setRoundResultText("clear", 0, 0);
        MainButton.BUTTON_ELEMENT.innerHTML = "Conferir Acentuação 🔎";
    };
    MainButton.disableInteractableCharElements = function () {
        Array.from(document.getElementsByClassName("editable-char")).map(function (element) { return element.classList.add("off"); });
    };
    MainButton.getCorrectTextChars = function () {
        return Array.from(TargetText.content.toLowerCase()).filter(function (char) { return !" .,!".includes(char); });
    };
    MainButton.getEditedTextChars = function () {
        return Array.from(document.getElementsByClassName("editable-char")).map(function (element) { return element.innerHTML[0].toLowerCase(); });
    };
    MainButton.compareTexts = function (modelText, analisedText) {
        var initalGain = 25;
        var errors = 0;
        modelText.forEach(function (char, index) {
            if (char !== analisedText[index]) {
                MainButton.setWordStatus(index, "error");
                errors++;
            }
            else {
                MainButton.setWordStatus(index, "correct");
            }
        });
        if (TargetText.mutableWords) {
            if (TargetText.mutableWords.length <= 0 && errors > 0) {
                initalGain -= 25;
            }
            if (TargetText.mutableWords.length > 0 &&
                errors >= TargetText.mutableWords.length) {
                initalGain -= 25;
            }
            else if (errors === 1 && TargetText.mutableWords.length > 1) {
                initalGain -= 10;
            }
        }
        else {
            if (errors > 0) {
                initalGain -= 25;
            }
        }
        PlayersScore.updateScore("increase", GameRound.playerInTurn, initalGain);
        MainButton.setRoundResultText("display", initalGain, errors);
        PlayersScore.setMajorScorePlayerCrown();
    };
    MainButton.setRoundResultText = function (action, roundScore, errors) {
        var _a, _b;
        var ROUND_RESULT_TEXT = document.querySelector(".game-target-text-container__result-text");
        if (action === "clear") {
            ROUND_RESULT_TEXT.innerHTML = "<span class=\"game-target-text-container__result-text__points\"></span>";
        }
        else {
            ROUND_RESULT_TEXT.innerHTML = "De ".concat(TargetText.mutableWords ? TargetText.mutableWords.length : 0, " erro").concat(((_a = TargetText.mutableWords) === null || _a === void 0 ? void 0 : _a.length) === 1 ? "" : "s", " inicia").concat(((_b = TargetText.mutableWords) === null || _b === void 0 ? void 0 : _b.length) === 1 ? "l" : "is", ", ").concat(errors === 0 ? "você corrigiu todos! 💪" : "agora, h\u00E1 ".concat(errors, ". \uD83E\uDD21"), "<br/><span class=\"game-target-text-container__result-text__points ").concat(roundScore <= 0 ? "no-gain" : "", "\">+").concat(roundScore, "</span>");
        }
    };
    MainButton.setWordStatus = function (index, status) {
        var _a, _b;
        var allChars = document.getElementsByClassName("editable-char");
        var targetChar = allChars[index];
        var targetCharEditContainer = targetChar.childNodes[1];
        if (status === "correct") {
            (_a = targetChar === null || targetChar === void 0 ? void 0 : targetChar.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add("correct-word");
        }
        else {
            targetChar.classList.add("error-char");
            MainButton.setEditContainerCorrection(targetCharEditContainer, index);
            (_b = targetChar === null || targetChar === void 0 ? void 0 : targetChar.parentElement) === null || _b === void 0 ? void 0 : _b.classList.add("error-word");
        }
    };
    MainButton.setEditContainerCorrection = function (charEditContainer, index) {
        var correctChar = MainButton.getCorrectTextChars()[index].toUpperCase();
        charEditContainer.innerHTML = "<p class=\"editable-char__edit-container__paragraph\">".concat(correctChar, " \uD83D\uDC48</p><div class=\"editable-char__edit-container__index\"></div>");
    };
    MainButton.BUTTON_ELEMENT = document.querySelector(".check-result-button");
    return MainButton;
}());
var ROUND_TEXT_ELEMENT = document.querySelector(".game-details-container__round-headline-text__number");
var PLAYER_TURN_TEXT_ELEMENT = document.querySelector(".game-details-container__round-subheadline-text__emoji");
var GameRound = /** @class */ (function () {
    function GameRound() {
        GameRound.setRound();
    }
    GameRound.setRound = function () {
        this.round++;
        render("modify", ROUND_TEXT_ELEMENT, this.round);
        this.setPlayerTurn();
    };
    GameRound.setPlayerTurn = function () {
        if (this.round % 2 !== 0) {
            this.playerInTurn = PlayersScore.players[0].emoji;
        }
        else {
            this.playerInTurn = PlayersScore.players[1].emoji;
        }
        render("modify", PLAYER_TURN_TEXT_ELEMENT, this.playerInTurn);
        this.setPlayerTurnIndexStyle(this.playerInTurn);
    };
    GameRound.setPlayerTurnIndexStyle = function (targetPlayer) {
        var allPlayersScoresContainer = document.getElementsByClassName("pontuations-container__player-pontuation");
        Array.from(allPlayersScoresContainer).forEach(function (playerScoreContainer) {
            if (playerScoreContainer.innerHTML.includes(targetPlayer)) {
                playerScoreContainer.classList.add("player-has-turn");
            }
            else {
                playerScoreContainer.classList.remove("player-has-turn");
            }
        });
    };
    GameRound.round = 0;
    return GameRound;
}());
function startGameSettings() {
    var LIST_FOR_PLAYERS_EMOJIS = document.querySelector(".game-settings-container__players-list");
    var AVAILABLE_PLAYERS_EMOJIS = "📚🧠🤓🤩😎👽🦉📐🧬";
    Array.from(AVAILABLE_PLAYERS_EMOJIS).forEach(function (emoji) {
        render("keep", LIST_FOR_PLAYERS_EMOJIS, createPlayerEmojiButton(emoji));
    });
}
function createPlayerEmojiButton(emoji) {
    return "<li class=\"game-settings-container__players-list__button\" onClick=\"selectPlayer(this)\" >".concat(emoji, "</li>");
}
function selectPlayer(player) {
    player.classList.toggle("selected");
}
var START_GAME_BUTTON = document.querySelector(".game-settings-container__button");
START_GAME_BUTTON.addEventListener("click", function (event) { return startGame(event.target); });
function startGame(buttonElement) {
    if (buttonElement.classList.contains("disabled")) {
        return;
    }
    setSelectedPlayersIntoGame();
    new TargetText();
    new MainButton();
    closeGameSettings();
    //Start your engines 🔥
    new GameRound();
}
function setSelectedPlayersIntoGame() {
    var SELECTED_PLAYERS = document.getElementsByClassName("game-settings-container__players-list__button");
    if (SELECTED_PLAYERS.length > 0) {
        Array.from(SELECTED_PLAYERS).forEach(function (player) {
            if (player.classList.contains("selected")) {
                new PlayersScore(player.innerHTML);
            }
        });
    }
}
function closeGameSettings() {
    var GAME_SCREEN_SAVER = document.querySelector(".screen-saver");
    GAME_SCREEN_SAVER.classList.remove("enabled");
}
function verifyPlayersSelection() {
    var SELECTED_PLAYERS = document.getElementsByClassName("game-settings-container__players-list__button selected");
    if (SELECTED_PLAYERS.length <= 0) {
        START_GAME_BUTTON.classList.add("disabled");
    }
    else {
        START_GAME_BUTTON.classList.remove("disabled");
    }
}
startGameSettings();
setInterval(function () {
    verifyPlayersSelection();
});
