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
  if (cardsLeft < 1) {
    return selectedCards;
  }

  function buildDeck() {
    let deck = [];
    for (let i = 0; i <= 51; i++) {
      deck.push(i);
    }
    return deck;
  }

  /* deck = !deck ? deckBuilder() : deck; */
  deck = !deck ? buildDeck() : deck;

  let randomCardIndex = Math.ceil(Math.random() * deck.length - 1);

  if (randomCardIndex === -0) {
    randomCardIndex = 0;
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

  //return selectedCards;
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

// If the deck is not loaded should redirect client to the main page
export function isDeckLoaded() {
  const DECK = window.DECK || null;
  if (DECK) {
    if (!DECK.front || !DECK.back) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

export function redirectUserToMainPage() {
  window.location.href = "/";
}
