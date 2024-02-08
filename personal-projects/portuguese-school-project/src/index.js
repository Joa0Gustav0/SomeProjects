var PLAYERS_SCORE_ELEMENTS = document.getElementsByClassName("pontuations-container__player-pontuation__text");
function render(target, innerValue) {
    target.innerHTML = innerValue.toString();
}
var PlayersScore = /** @class */ (function () {
    function PlayersScore(score, index) {
        this.score = score;
        this.index = index;
        render(PLAYERS_SCORE_ELEMENTS[index], score < 10 ? "0" + score.toString() : score);
    }
    PlayersScore.prototype.updateScore = function (newScore) {
        render(PLAYERS_SCORE_ELEMENTS[this.index], newScore < 10 ? "0" + newScore.toString() : newScore);
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
    PlayersScore.setMajorScorePlayerCrown = function (score1, score2) {
        var majorScore = this.getMajorScore(score1, score2);
        if (!majorScore)
            return;
        Array.from(PLAYERS_SCORE_ELEMENTS).map(function (scoreElement) {
            if (scoreElement.innerHTML === (majorScore === null || majorScore === void 0 ? void 0 : majorScore.toString())) {
                scoreElement.parentNode.classList.add("crown");
            }
        });
    };
    return PlayersScore;
}());
var playerScore1 = new PlayersScore(0, 0);
var playersScore2 = new PlayersScore(50, 1);
PlayersScore.setMajorScorePlayerCrown(playerScore1.score, playersScore2.score);
