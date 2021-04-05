var deck = {
    suits: ['hearts', 'spades', 'clubs', 'diamonds'],
    cards: Array(52),
    createCardPicker: function () {
        return function () {
            var pickedCard = Math.floor(Math.random() * 52);
            var pickedSuit = Math.floor(pickedCard / 13);
            return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
        };
    }
};
var cardPicker = deck.createCardPicker();
// let pickedCard = cardPicker() // this 指向全局对象
var pickedCard = cardPicker.call(deck);
console.log('card: ' + pickedCard.card + ' of ' + pickedCard.suit);
