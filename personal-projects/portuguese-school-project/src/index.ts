const PLAYERS_SCORE_ELEMENTS = document.getElementsByClassName(
  "pontuations-container__player-pontuation__text"
);

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

class PlayersScore {
  static quantityOfPlayersInGame = 0;
  static players: Array<PlayersScore> = [];

  constructor(
    public emoji: string,
    public name: string,
    public score: number,
    public index = PlayersScore.quantityOfPlayersInGame
  ) {
    PlayersScore.createPlayerScoreContainer(emoji, score);
    render(
      "modify",
      PLAYERS_SCORE_ELEMENTS[index],
      score < 10 ? "0" + score.toString() : score
    );
    PlayersScore.players.push(this);
    PlayersScore.quantityOfPlayersInGame++;
  }

  updateScore(action: "increase" | "decrease",additionalValue: number) {
    if (action === "increase") {
      this.score += additionalValue;
    } else {
      this.score -= additionalValue;
    }
    render(
      "modify",
      PLAYERS_SCORE_ELEMENTS[this.index], this.score
    );
  }

  private static createPlayerScoreContainer(
    targetPlayerEmoji: string,
    targetPlayerScore: number
  ) {
    render(
      "keep",
      document.querySelector(".pontuations-container")!,
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
      name: "",
      score: 0,
    };

    this.players.map((player, index) => {
      if (player.score > lastMajorScorePlayer.score) {
        lastMajorScorePlayer.name = player.name;
        lastMajorScorePlayer.score = player.score;
      }
    })

    Array.from(PLAYERS_SCORE_ELEMENTS).map((scoreElement) => {
      if (scoreElement.innerHTML === lastMajorScorePlayer.score.toString()) {
        (scoreElement.parentNode! as Element).classList.add("crown");
      }
    });


  }
}

var playerScore1 = new PlayersScore("📚", "Letícia", 0);
var playersScore2 = new PlayersScore("🧠", "Joinha", 50);
playerScore1.updateScore("increase", 50);
playersScore2.updateScore("decrease", 10);
PlayersScore.setMajorScorePlayerCrown();
