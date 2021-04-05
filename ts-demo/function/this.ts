let deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function () {
    return function () {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 }
    }
  }
}

let cardPicker = deck.createCardPicker()
// let pickedCard = cardPicker() // this 指向全局对象
let pickedCard = cardPicker.call(deck)

console.log('card: ' + pickedCard.card + ' of ' + pickedCard.suit)
