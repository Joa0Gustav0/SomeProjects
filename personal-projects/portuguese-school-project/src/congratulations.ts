var windowLocation = new URL(window.location.href);
const CURRENT_URL = windowLocation.href;
var firstEmojiIndex = windowLocation.href.indexOf("winner=") + 7;

var encodedEmojis: string[] | string = "";
for (var index = firstEmojiIndex; index < CURRENT_URL.length; index++) {
  if (CURRENT_URL[index] !== "$") {
    encodedEmojis += CURRENT_URL[index];
  } else {
    encodedEmojis += " ";
  }
}
encodedEmojis = encodedEmojis.split(" ");
encodedEmojis = encodedEmojis.filter((element) => element !== " ").map((unicode, index) => index < encodedEmojis.length ? String.fromCodePoint(parseInt(unicode, 16)) : "")

console.log(encodedEmojis);