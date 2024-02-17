function render(mode, target, innerValue) {
    if (mode === "modify") {
        target.innerHTML = innerValue.toString();
    }
    else {
        target.innerHTML += innerValue.toString();
    }
}
var TRY_AGAIN_BUTTON = document.querySelector(".play-again-button");
TRY_AGAIN_BUTTON.addEventListener("click", function () { return window.open("/public/", "_self"); });
var windowLocation = new URL(window.location.href);
var CURRENT_URL = windowLocation.href;
var PAGE_DATA = getWinnersInformation(CURRENT_URL);
function getWinnersInformation(entryUrl) {
    return {
        winners: decodeAndGetEmojisInURL(entryUrl),
        scores: getScoresInURL(entryUrl),
    };
}
function decodeAndGetEmojisInURL(url) {
    var firstEmojiIndex = url.indexOf("winner=") + 7;
    var encodedEmojis = "";
    for (var index = firstEmojiIndex; index < url.length; index++) {
        if (url[index] !== "$") {
            encodedEmojis += url[index];
        }
        else {
            encodedEmojis += " ";
        }
    }
    encodedEmojis = encodedEmojis.split(" ");
    encodedEmojis = encodedEmojis
        .filter(function (element) { return element !== " "; })
        .map(function (unicode, index) {
        return index < encodedEmojis.length
            ? String.fromCodePoint(parseInt(unicode, 16))
            : "";
    });
    return encodedEmojis;
}
function getScoresInURL(url) {
    var firstScoreIndex = url.indexOf("scores=") + 7;
    var scores = "";
    var blockMapping = false;
    for (var index = firstScoreIndex; index < url.length; index++) {
        if (!blockMapping) {
            if (url[index] === "w") {
                blockMapping = true;
            }
            else {
                if (url[index] !== "$") {
                    scores += url[index];
                }
                else {
                    scores += " ";
                }
            }
        }
    }
    scores = scores.split(" ");
    return scores;
}
function createWinnerElement(emoji, score) {
    return "<li class=\"winners-list-container__list__winner-container\">\n  ".concat(emoji, "<br/>").concat(score, "\n  <img class=\"crown\" src=\"../public/media/crown-icon.png\" alt=\"\u00EDcone de coroa\">\n</li>");
}
function renderPageData() {
    var allWinners = PAGE_DATA.winners;
    var WINNERS_LIST = document.querySelector(".winners-list-container__list");
    var WINNERS_LIST_TITLE = document.querySelector(".winners-list-container__headline");
    render("modify", WINNERS_LIST_TITLE, PAGE_DATA.winners.length === 1 ? "Ganhador:" : "Ganhadores:");
    allWinners.forEach(function (winner, index) {
        render("keep", WINNERS_LIST, createWinnerElement(winner, PAGE_DATA.scores[index]));
    });
}
renderPageData();
