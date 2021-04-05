var Handler = /** @class */ (function () {
    function Handler() {
    }
    Handler.prototype.onClickBad = function (e) {
        this.info = e.message;
    };
    return Handler;
}());
var h = new Handler();
UIElement.addClickListener(h.onClickBad.call(Handler));
