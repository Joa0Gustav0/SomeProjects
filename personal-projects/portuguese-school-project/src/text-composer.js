var TargetText = /** @class */ (function () {
    function TargetText() {
        this.content = this.getText();
    }
    TargetText.prototype.getText = function () {
        var availableTexts = TargetText.TEXTS.filter(function (text) { return !text.alreadyUsed; });
        var reachedText = availableTexts[Math.floor(Math.random() * availableTexts.length)].text;
        TargetText.TEXTS.forEach(function (element) {
            if (element.text === reachedText) {
                element.alreadyUsed = true;
            }
        });
        return reachedText;
    };
    TargetText.TEXTS = [
        {
            text: "1O sabiá disse que sabia assoviar, mas quando o sabiá viu o sábio, o sábio disse que o sabiá não sabia assoviar.",
            alreadyUsed: false,
        },
        {
            text: "2O sabiá disse que sabia assoviar, mas quando o sabiá viu o sábio, o sábio disse que o sabiá não sabia assoviar.",
            alreadyUsed: false,
        },
        {
            text: "3O sabiá disse que sabia assoviar, mas quando o sabiá viu o sábio, o sábio disse que o sabiá não sabia assoviar.",
            alreadyUsed: false,
        },
        {
            text: "4O sabiá disse que sabia assoviar, mas quando o sabiá viu o sábio, o sábio disse que o sabiá não sabia assoviar.",
            alreadyUsed: false,
        },
    ];
    return TargetText;
}());
