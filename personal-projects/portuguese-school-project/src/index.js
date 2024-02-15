var PLAYERS_SCORES_TXTS = document.getElementsByClassName("pontuations-container__player-pontuation__text");
var CONTAINER_FOR_ALL_PLAYERS_SCORES = document.querySelector(".pontuations-container");
function render(mode, target, innerValue) {
    if (mode === "modify") {
        target.innerHTML = innerValue.toString();
    }
    else {
        target.innerHTML += innerValue.toString();
    }
}
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
                console.log(player.score);
                if (action === "decrease") {
                    player.score -= entryValue;
                }
                else {
                    player.score += entryValue;
                }
                console.log(player.score);
                render("modify", PLAYERS_SCORES_TXTS[player.index], player.score < 10 ? "0" + player.score : player.score);
            }
        });
    };
    PlayersScore.createPlayerScoreContainer = function (targetPlayerEmoji, targetPlayerScore) {
        render("keep", CONTAINER_FOR_ALL_PLAYERS_SCORES, "\n    <h1 class=\"pontuations-container__player-pontuation\">\n    ".concat(targetPlayerEmoji, "\n    <span class=\"pontuations-container__player-pontuation__text\"\n      >").concat(targetPlayerScore, "</span\n    >\n    <img src=\"../public/media/crown-icon.png\" alt=\"\u00EDcone de coroa\">\n  </h1>\n    "));
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
            emoji: "",
            score: 0,
        };
        this.players.map(function (player, index) {
            if (player.score > lastMajorScorePlayer.score) {
                lastMajorScorePlayer.emoji = player.emoji;
                lastMajorScorePlayer.score = player.score;
            }
        });
        Array.from(PLAYERS_SCORES_TXTS).map(function (scoreElement) {
            if (scoreElement.innerHTML === lastMajorScorePlayer.score.toString()) {
                scoreElement.parentNode.classList.add("crown");
            }
        });
    };
    PlayersScore.quantityOfPlayersInGame = 0;
    PlayersScore.players = [];
    return PlayersScore;
}());
new PlayersScore("🤩");
new PlayersScore("😀", 10);
PlayersScore.updateScore("increase", "😀", 2);
PlayersScore.setMajorScorePlayerCrown();
