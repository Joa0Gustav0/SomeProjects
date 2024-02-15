var PLAYERS_SCORE_ELEMENTS = document.getElementsByClassName("pontuations-container__player-pontuation__text");
function render(mode, target, innerValue) {
    if (mode === "modify") {
        target.innerHTML = innerValue.toString();
    }
    else {
        target.innerHTML += innerValue.toString();
    }
}
var PlayersScore = /** @class */ (function () {
    function PlayersScore(emoji, name, score, index) {
        if (index === void 0) { index = PlayersScore.quantityOfPlayersInGame; }
        this.emoji = emoji;
        this.name = name;
        this.score = score;
        this.index = index;
        PlayersScore.createPlayerScoreContainer(emoji, score);
        render("modify", PLAYERS_SCORE_ELEMENTS[index], score < 10 ? "0" + score.toString() : score);
        PlayersScore.players.push(this);
        PlayersScore.quantityOfPlayersInGame++;
    }
    PlayersScore.prototype.updateScore = function (action, additionalValue) {
        if (action === "increase") {
            this.score += additionalValue;
        }
        else {
            this.score -= additionalValue;
        }
        render("modify", PLAYERS_SCORE_ELEMENTS[this.index], this.score);
    };
    PlayersScore.createPlayerScoreContainer = function (targetPlayerEmoji, targetPlayerScore) {
        render("keep", document.querySelector(".pontuations-container"), "\n    <h1 class=\"pontuations-container__player-pontuation\">\n    ".concat(targetPlayerEmoji, "\n    <span class=\"pontuations-container__player-pontuation__text\"\n      >").concat(targetPlayerScore, "</span\n    >\n    <img src=\"../public/media/crown-icon.png\" alt=\"\u00EDcone de coroa\">\n  </h1>\n    "));
    };
    PlayersScore.getMajorScore = function (entryScore1, entryScore2) {
        if (entryScore1 === entryScore2) {
            return null;
        }
        if (entryScore1 > entryScore2) {
            return entryScore1;
        }
        else {
            return entryScore2;
        }
    };
    PlayersScore.setMajorScorePlayerCrown = function () {
        var lastMajorScorePlayer = {
            name: "",
            score: 0,
        };
        this.players.map(function (player, index) {
            if (player.score > lastMajorScorePlayer.score) {
                lastMajorScorePlayer.name = player.name;
                lastMajorScorePlayer.score = player.score;
            }
        });
        Array.from(PLAYERS_SCORE_ELEMENTS).map(function (scoreElement) {
            if (scoreElement.innerHTML === lastMajorScorePlayer.score.toString()) {
                scoreElement.parentNode.classList.add("crown");
            }
        });
    };
    PlayersScore.quantityOfPlayersInGame = 0;
    PlayersScore.players = [];
    return PlayersScore;
}());
var playerScore1 = new PlayersScore("📚", "Letícia", 0);
var playersScore2 = new PlayersScore("🧠", "Joinha", 50);
playerScore1.updateScore("increase", 50);
playersScore2.updateScore("decrease", 10);
PlayersScore.setMajorScorePlayerCrown();
