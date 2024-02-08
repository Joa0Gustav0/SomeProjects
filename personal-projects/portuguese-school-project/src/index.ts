const PLAYERS_SCORE_ELEMENTS = document.getElementsByClassName(
  "pontuations-container__player-pontuation__text"
);

function render(target: Element, innerValue: string | number) {
  target.innerHTML = innerValue.toString();
}

class PlayersScore {
  constructor(public score: number, public index: number) {
    render(
      PLAYERS_SCORE_ELEMENTS[index],
      score < 10 ? "0" + score.toString() : score
    );
  }

  updateScore(newScore) {
    render(
      PLAYERS_SCORE_ELEMENTS[this.index],
      newScore < 10 ? "0" + newScore.toString() : newScore
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

  static setMajorScorePlayerCrown(score1, score2) {
    var majorScore = this.getMajorScore(score1, score2);
    if (!majorScore) return;

    Array.from(PLAYERS_SCORE_ELEMENTS).map((scoreElement) => {
      if (scoreElement.innerHTML === majorScore?.toString()) {
        (scoreElement.parentNode! as Element).classList.add("crown");
      }
    });
  }
}

var playerScore1 = new PlayersScore(0, 0);
var playersScore2 = new PlayersScore(50, 1);
PlayersScore.setMajorScorePlayerCrown(playerScore1.score, playersScore2.score);
