import { useState, useEffect } from "react";
import getDeck from "../../utils/DeckGenerator";
import BlackjackCard from "../BlackjackCard";
import "./Game.css";
import { Container, Box, Stack, Typography } from "@mui/material";
import GameTable from "../GameTable";
import { Card } from "../../utils/types";

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
  const [money, setMoney] = useState<number>(() => {
    const savedMoney = localStorage.getItem("userMoney");
    return savedMoney ? Number(savedMoney) : 1000;
  });

  const [bet, setBet] = useState<number>(0);
  const [gameState, setGameState] = useState<string>("betting");
  const [deck, setDeck] = useState<Card[]>(getDeck(2));
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [firstTurn, setFirstTurn] = useState<boolean>(true);

  // Get money from browser if it exists
  useEffect(() => {
    const savedMoney = localStorage.getItem("userMoney");
    if (savedMoney) {
      setMoney(Number(savedMoney));
    }
  }, []);

  function updatedMoney(value: number) {
    setMoney(value);
    localStorage.setItem("userMoney", value.toString());
  }

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

    const dealerTotal = calculateHand(tempDealerHand);
    const playerTotal = calculateHand(tempPlayerHand);

    // Check if there is a winner right at the beginning
    if (playerTotal === 21 && dealerTotal !== 21) {
      setGameState("playerBlackjack");
      return;
    } else if (dealerTotal === 21 && playerTotal !== 21) {
      setGameState("playerLose");
      return;
    } else if (dealerTotal === 21 && playerTotal === 21) {
      setGameState("tie");
      updatedMoney(money + bet);
      return;
    }

    setFirstTurn(true);
    setDeck(newDeck);
    setGameState("playerTurn");
  }

  async function dealToDealer() {
    let tempDealerHand = [...dealerHand];
    while (calculateHand(tempDealerHand) < 17 && deck.length > 0) {
      await delay(500);
      const card = deck.pop();
      if (card) {
        tempDealerHand.push(card);
        setDealerHand([...tempDealerHand]);
      }
    }

    const dealerTotal = calculateHand(tempDealerHand);
    const playerTotal = calculateHand(playerHand);
    if (dealerTotal <= 21 && dealerTotal > playerTotal) {
      setGameState("playerLose");
    } else if (dealerTotal === playerTotal) {
      setGameState("tie");
    } else {
      setGameState("playerWin");
    }
  }

  function resetMoney() {
    updatedMoney(1000);
  }

  function placeBet(bet: number) {
    setBet(bet);
    updatedMoney(money - bet);
    setGameState("setup");
  }

  function continueGame() {
    setDealerHand([]);
    setPlayerHand([]);
    setBet(0);
    setGameState("betting");
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

  function stand() {
    setGameState("dealerTurn");
  }

  useEffect(() => {
    switch (gameState) {
      // During setup, a deck is created, shuffled, and the cards are dealt
      // Also checked if the dealer has a blackjack already
      case "setup":
        const newDeck: Card[] = getDeck(2);
        dealCards(newDeck);
        break;
      case "dealerTurn":
        dealToDealer();
        break;
      case "playerWin":
        updatedMoney(money + bet * 2);
        break;
      case "playerBlackjack":
        updatedMoney(money + bet + bet * 1.5);
        break;
      case "tie":
        updatedMoney(money + bet);
        break;
      case "playerLose":
        if (money === 0) {
          setGameState("noMoney");
        }
        break;
      default:
        break;
    }
  }, [gameState]);

  // Code to run after the player's hand changes
  useEffect(() => {
    const playerTotal = calculateHand(playerHand);
    if (playerTotal > 21) {
      setGameState("playerLose");
    } else if (playerTotal === 21 && playerHand.length > 2) {
      setGameState("dealerTurn");
    }
  }, [playerHand]);

  return (
    <Container sx={{ width: "100vw" }}>
      <Stack direction="column" spacing={6} width="100%">
        <Stack
          direction="column"
          spacing={2}
          sx={{ visibility: gameState === "betting" ? "hidden" : "visible" }}
        >
          <Typography variant="h5">
            Dealer's hand{" "}
            {gameState !== "playerTurn" && gameState !== "setup"
              ? "(total: " + calculateHand(dealerHand) + ")"
              : null}
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Stack direction="row" spacing={1}>
              {dealerHand.length === 0 ? (
                <BlackjackCard placeholder />
              ) : (
                dealerHand.map((card, index) => (
                  <BlackjackCard
                    key={index}
                    card={card}
                    hidden={
                      index === 0 &&
                      (gameState === "playerTurn" || gameState === "setup")
                    }
                  />
                ))
              )}
            </Stack>
          </Box>
        </Stack>
        <GameTable
          deck={deck}
          gameState={gameState}
          firstTurn={firstTurn}
          playerTurn={gameState === "playerTurn"}
          money={money}
          onHit={hit}
          onStand={stand}
          continueGame={continueGame}
          placeBet={placeBet}
          resetMoney={resetMoney}
        />
        <Stack
          direction="column"
          spacing={2}
          sx={{ visibility: gameState === "betting" ? "hidden" : "visible" }}
        >
          <Typography variant="h5">
            Your hand (total: {calculateHand(playerHand)}), Money:{" "}
            {money !== null ? `$${money}` : "..."}
          </Typography>

          <Box display="flex" justifyContent="center" alignItems="center">
            <Stack direction="row" spacing={1}>
              {playerHand.length === 0 ? (
                <BlackjackCard placeholder />
              ) : (
                playerHand.map((card, index) => (
                  <BlackjackCard key={index} card={card} />
                ))
              )}
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}

export default Game;
