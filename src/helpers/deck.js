export function deckBuilder() {
  const CARDS = [
    "Ace",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Jack",
    "Queen",
    "King",
  ];
  const SUITS = ["Clubs", "Diamonds", "Hearts", "Spades"];

  let deck = [];
  // eslint-disable-next-line array-callback-return
  CARDS.map((card) => {
    for (let i = 0; i < SUITS.length; i++) {
      deck.push(card + SUITS[i]);
    }
  });

  return deck;
}

export function getRandomCardsFromDeck(
  cardsLeft,
  deck,
  selectedCards = [],
  selectedCardsIndex = []
) {
  deck = !deck ? deckBuilder() : deck;

  let randomCardIndex = Math.ceil(Math.random() * deck.length - 1);
  if (randomCardIndex === -0) randomCardIndex = 0;

  console.log(selectedCardsIndex);

  if (cardsLeft < 1) {
    console.log(selectedCards);
    return selectedCards;
  }

  selectedCards.push(deck[randomCardIndex]);
  selectedCardsIndex.push(randomCardIndex);
  deck.splice(randomCardIndex, 1);

  getRandomCardsFromDeck(
    cardsLeft - 1,
    deck,
    selectedCards,
    selectedCardsIndex
  );

  return selectedCards;
}

export function shuffleCards(cards) {
  var currentIndex = cards.length,
    temporaryValue,
    randomIndex;

  // While there are remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // Swap it with the current element.
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }

  return cards;
}
