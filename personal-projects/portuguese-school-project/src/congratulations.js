var windowLocation = new URL(window.location.href);
var CURRENT_URL = windowLocation.href;
var firstEmojiIndex = windowLocation.href.indexOf("winner=") + 7;
var encodedEmojis = "";
for (var index = firstEmojiIndex; index < CURRENT_URL.length; index++) {
    if (CURRENT_URL[index] !== "$") {
        encodedEmojis += CURRENT_URL[index];
    }
    else {
        encodedEmojis += " ";
    }
}
encodedEmojis = encodedEmojis.split(" ");
encodedEmojis = encodedEmojis.filter(function (element) { return element !== " "; }).map(function (unicode, index) { return index < encodedEmojis.length ? String.fromCodePoint(parseInt(unicode, 16)) : ""; });
console.log(encodedEmojis);
