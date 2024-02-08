const PLAYERS_SCORE_ELEMENTS = document.getElementsByClassName(
  "pontuations-container__player-pontuation__text"
);

function render(target: Element, innerValue: string | number) {
  target.innerHTML = innerValue.toString();
}

class PlayersScore {
  constructor(public score: number, public index: number) {
    render(PLAYERS_SCORE_ELEMENTS[index], score);
  }

  updateScore(newScore) {
    render(PLAYERS_SCORE_ELEMENTS[this.index], newScore);
  }

  private static getMajorScore(score1: number, score2: number) {
    if (score1 === score2) {
      return null;
    }

    if (score1 > score2) {
      return score1;
    } else {
      return score2;
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
