import { useState, useEffect } from "react";
import getDeck from "../../utils/DeckGenerator";
import BlackjackCard from "../BlackjackCard";
import "./Game.css";
import { Container, Box, Stack, Typography } from "@mui/material";
import GameTable from "../GameTable";

interface Card {
  value: string;
  suit: string;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function calculateHand(hand: Card[]) {
  if (!hand || hand.length < 1) return 0;

  const royal = ["J", "Q", "K"];
  let total = 0;
  let hasAce = false;

  hand.forEach((card) => {
    // Ace counts as 11 if the total does not exceed 21, or as 1 if it does.
    // At first we add 1, since we don't know the total hand size yet.
    if (card.value === "A") {
      total += 1;
      hasAce = true;
    } else if (royal.includes(card.value)) {
      total += 10;
    } else {
      total += +card.value;
    }
  });

  if (hasAce && total + 10 < 22) {
    total += 10;
  }

  return total;
}

function Game() {
  const [money, setMoney] = useState<number>(1000);
  const [gameState, setGameState] = useState<string>("betting");
  const [deck, setDeck] = useState<Card[]>(getDeck(2));
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [firstTurn, setFirstTurn] = useState<boolean>(true);

  async function dealCards(newDeck: Card[]) {
    const dealerCard1 = newDeck.pop();
    const dealerCard2 = newDeck.pop();
    const playerCard1 = newDeck.pop();
    const playerCard2 = newDeck.pop();
    setDeck(newDeck);

    let tempDealerHand: Card[] = [];
    let tempPlayerHand: Card[] = [];

    await delay(500);

    if (dealerCard1) {
      tempDealerHand.push(dealerCard1);
      setDealerHand([...tempDealerHand]);
    }
    await delay(500);

    if (playerCard1) {
      tempPlayerHand.push(playerCard1);
      setPlayerHand([...tempPlayerHand]);
    }
    await delay(500);

    if (dealerCard2) {
      tempDealerHand.push(dealerCard2);
      setDealerHand([...tempDealerHand]);
    }
    await delay(500);

    if (playerCard2) {
      tempPlayerHand.push(playerCard2);
      setPlayerHand([...tempPlayerHand]);
    }
    await delay(500);

    setFirstTurn(true);
    setDeck(newDeck);
    setGameState("playerTurn");
  }

  function hit() {
    if (!deck || deck.length < 1) return;

    const newDeck = [...deck];
    const card = newDeck.pop();

    if (card) {
      const newPlayerHand = [...playerHand, card];
      setFirstTurn(false);
      setDeck(newDeck);
      setPlayerHand(newPlayerHand);
    }
  }

  useEffect(() => {
    switch (gameState) {
      // During setup, a deck is created, shuffled, and the cards are dealt
      // Also checked if the dealer has a blackjack already
      case "setup":
        const newDeck: Card[] = getDeck(2);
        dealCards(newDeck);
        break;

      default:
        break;
    }
  }, [gameState]);

  // if (dealerHand.length === 0 && playerHand.length === 0) {
  //   return <b>Preparing table</b>;
  // }

  return (
    <Container sx={{ width: "100vw" }}>
      <Stack direction="column" spacing={6} width="100%">
        <Container maxWidth={"xl"}>
          <b>Dealer hand</b>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Stack direction="row" spacing={1}>
              {dealerHand.length > 0 &&
                dealerHand.map((card, index) => (
                  <BlackjackCard key={index} card={card} hidden={index === 0} />
                ))}
            </Stack>
          </Box>
        </Container>
        <GameTable
          deck={deck}
          gameState={gameState}
          firstTurn={firstTurn}
          playerTurn={gameState === "playerTurn"}
          onHit={hit}
          money={money}
        />
        <Container>
          <Typography variant="h4">
            Your hand (total: {calculateHand(playerHand)}), Money: ${money}
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Stack direction="row" spacing={1}>
              {playerHand.length > 0 &&
                playerHand.map((card, index) => (
                  <BlackjackCard key={index} card={card} />
                ))}
            </Stack>
          </Box>
        </Container>
      </Stack>
    </Container>
  );
}

export default Game;
