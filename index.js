// takes a number between 1 and 100. if the number passed is greater than the random number, returns true.
const percentRoll = percent => {
  const randomNumber = Math.floor(Math.random() * 100);
  return percent > randomNumber;
};

// CARD
class Card {
  constructor(suit, rank) {
    this._suit = suit;
    this._rank = rank;
  }

  get suit() {
    return this._suit;
  }

  get rank() {
    return this._rank;
  }
}

// DECK
class Deck {
  constructor(cards) {
    this._cards = cards;
  }

  get cards() {
    return this._cards;
  }

  set cards(cards) {
    this._cards = cards;
  }

  // random numbers decide what order the cards are shuffled into
  randomShuffle() {
    const shuffled = [];
    const unshuffled = this.cards.slice();

    while (unshuffled.length > 0) {
      const randomCard = Math.floor(Math.random() * unshuffled.length);
      shuffled.push(unshuffled.splice(randomCard, 1)[0]);
    }

    this.cards = shuffled;
  }

  // randomly choose an index near the middle
  halveDeck() {
    const trueMidpoint = Math.floor(this.cards.length / 2);
    const actualMidpoint = Math.floor(Math.random() * 10) + (trueMidpoint - 5);

    return {
      half1: this.cards.slice(0, actualMidpoint),
      half2: this.cards.slice(actualMidpoint)
    }
  }

  // a model of a reallife shuffle. split the deck in half(ish) then thread the cards one(ish) at a time
  realShuffle() {
    const shuffled = [];

    const {half1, half2} = this.halveDeck();

    let onHalf1 = true;
    let counter = 0;
    
    while (half1.length > 0 || half2.length > 0) {

      if (onHalf1) {

        if (!half1.length) {
          onHalf1 = !onHalf1;
          counter = 0;
          continue;
        }

        shuffled.unshift(half1.pop());
        counter++;

        if (counter >= 4 || !percentRoll(80)) {
          onHalf1 = !onHalf1;
          counter = 0;
          continue;
        }

      } else {

        if (!half2.length) {
          onHalf1 = !onHalf1;
          counter = 0;
          continue;
        }

        shuffled.unshift(half2.pop());
        counter++;

        if (counter >= 4 || !percentRoll(80)) {
          onHalf1 = !onHalf1;
          counter = 0;
          continue;
        }

      }

    }

    this.cards = shuffled;
  }

  static generateStandardDeck() {
    const suits = ['♣️', '♦️', '♥️', '♠️'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    const newDeck = [];

    for (const suit of suits) {
      for (const rank of ranks) {
        newDeck.push(new Card(suit, rank));
      }
    }

    return new Deck(newDeck);
  }
}





const standardDeck = Deck.generateStandardDeck();
//console.log(standardDeck.cards);

//standardDeck.randomShuffle();
//console.log(standardDeck.cards);
standardDeck.realShuffle();
standardDeck.realShuffle();
standardDeck.realShuffle();
standardDeck.realShuffle();
standardDeck.realShuffle();
console.log(standardDeck.cards);