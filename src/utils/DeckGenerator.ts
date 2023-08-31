type Card = {
  value: string;
  suit: string;
};

const suits = ["♥", "♦", "♣", "♠"];
const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

/**
 * Creates an unshuffled deck of cards for the specified number of decks.
 *
 * @param {number} [deckAmount=1] - The number of decks to create (default: 1)
 * @returns {Card[]} - An array of cards representing the created deck(s).
 */
function createDeck(deckAmount: number = 1): Card[] {
  let deck: Card[] = [];

  for (let i = 0; i < deckAmount; i++) {
    for (let suit of suits) {
      for (let value of values) {
        deck.push({ value, suit });
      }
    }
  }

  return deck;
}

/**
 * Fisher-Yates algorithm to shuffle a deck.
 * This method modifies the original deck array.
 * See https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 *
 * @param {Card[]} deck - The deck to shuffle.
 * @returns {Card[]} - The shuffled deck.
 */
function shuffleDeck(deck: Card[]): Card[] {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

/**
 * Returns a shuffled deck with the specified number of decks.
 *
 * @param {number} [deckAmount=1] - The number of decks the main deck should consist of (default: 1)
 * @returns {Card[]} - An array of cards representing the created deck(s).
 */
export default function getDeck(deckAmount: number = 1): Card[] {
  return shuffleDeck(createDeck(deckAmount));
}
