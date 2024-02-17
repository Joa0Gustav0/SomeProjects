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

const TRY_AGAIN_BUTTON = document.querySelector(".play-again-button")!;

(TRY_AGAIN_BUTTON as HTMLElement).addEventListener("click", () => window.open("/public/", "_self"));

var windowLocation = new URL(window.location.href);
const CURRENT_URL = windowLocation.href;

const PAGE_DATA = getWinnersInformation(CURRENT_URL);

function getWinnersInformation(entryUrl: string) {
  return {
    winners: decodeAndGetEmojisInURL(entryUrl),
    scores: getScoresInURL(entryUrl),
  };
}
function decodeAndGetEmojisInURL(url: string) {
  var firstEmojiIndex = url.indexOf("winner=") + 7;

  var encodedEmojis: string[] | string = "";
  for (var index = firstEmojiIndex; index < url.length; index++) {
    if (url[index] !== "$") {
      encodedEmojis += url[index];
    } else {
      encodedEmojis += " ";
    }
  }
  encodedEmojis = encodedEmojis.split(" ");
  encodedEmojis = encodedEmojis
    .filter((element) => element !== " ")
    .map((unicode, index) =>
      index < encodedEmojis.length
        ? String.fromCodePoint(parseInt(unicode, 16))
        : ""
    );

  return encodedEmojis;
}
function getScoresInURL(url: string) {
  var firstScoreIndex = url.indexOf("scores=") + 7;

  var scores: string[] | string = "";

  let blockMapping = false;
  for (var index = firstScoreIndex; index < url.length; index++) {
    if (!blockMapping) {
      if (url[index] === "w") {
        blockMapping = true;
      } else {
        if (url[index] !== "$") {
          scores += url[index];
        } else {
          scores += " ";
        }
      }
    }
  }
  scores = scores.split(" ");

  return scores;
}

function createWinnerElement(emoji: string, score: string) {
  return `<li class="winners-list-container__list__winner-container">
  ${emoji}<br/>${score}
  <img class="crown" src="../public/media/crown-icon.png" alt="ícone de coroa">
</li>`;
}
function renderPageData() {
  let allWinners = PAGE_DATA.winners;
  const WINNERS_LIST = document.querySelector(".winners-list-container__list")!;
  const WINNERS_LIST_TITLE = document.querySelector(
    ".winners-list-container__headline"
  )!;

  render(
    "modify",
    WINNERS_LIST_TITLE,
    PAGE_DATA.winners.length === 1 ? "Ganhador:" : "Ganhadores:"
  );

  allWinners.forEach((winner, index) => {
    render(
      "keep",
      WINNERS_LIST,
      createWinnerElement(winner, PAGE_DATA.scores[index])
    );
  });
}

renderPageData()


