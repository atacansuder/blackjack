import BlackjackCard from "./BlackjackCard";
import "./Deck.css";

interface Card {
  value: string;
  suit: string;
}

interface DeckProps {
  deck: Card[];
}

function Deck(props: DeckProps) {
  return (
    <div className="deck-container">
      {props.deck.map((card, index) => {
        return (
          <div
            key={index}
            className="card-in-deck"
            style={{ transform: `translateY(${index * -0.5}px)` }}
          >
            <BlackjackCard card={card} hidden />
          </div>
        );
      })}
    </div>
  );
}

export default Deck;
