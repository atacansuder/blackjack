import { Box, Button, Stack, Typography } from "@mui/material";
import Deck from "./Deck";
import BetSection from "./BetSection";

interface Card {
  value: string;
  suit: string;
}

interface TableProps {
  deck: Card[];
  gameState: string;
  firstTurn: boolean;
  playerTurn: boolean;
  money: number;
  onHit: () => void;
  onStand: () => void;
  continueGame: () => void;
  placeBet: (bet: number) => void;
  resetMoney: () => void;
}

const buttonStyle = {
  textTransform: "capitalize",
};

const stateMessages: { [key: string]: string } = {
  betting: "Place your bet",
  playerTurn: "Your turn",
  dealerTurn: "Dealer's turn",
  playerLose: "You lost",
  playerWin: "You won",
  playerBlackjack: "Blackjack! You won",
  tie: "It's a tie",
  noMoney: "Out of money",
  setup: "Dealing cards",
};

function GameTable(props: TableProps) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Stack direction="row" spacing={16} alignItems="center">
        <Deck deck={props.deck} />
        {props.gameState === "betting" ? (
          <BetSection money={props.money} placeBet={props.placeBet} />
        ) : (
          <Stack direction="column" spacing={1}>
            <Typography
              variant="body1"
              style={{
                width: "200px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {stateMessages[props.gameState]}
            </Typography>
            {props.gameState === "playerLose" ||
            props.gameState === "playerWin" ||
            props.gameState === "playerBlackjack" ||
            props.gameState === "tie" ? (
              <Button
                variant="contained"
                sx={buttonStyle}
                title="Request another card"
                onClick={props.continueGame}
              >
                Continue
              </Button>
            ) : null}
            {props.gameState === "noMoney" ? (
              <Button
                variant="contained"
                sx={buttonStyle}
                title="Request another card"
                onClick={() => {
                  props.resetMoney();
                  props.continueGame();
                }}
              >
                Reset money & continue
              </Button>
            ) : null}
          </Stack>
        )}
        <Stack direction="column" spacing={1}>
          <Button
            variant="contained"
            sx={buttonStyle}
            disabled={!props.playerTurn}
            onClick={props.onHit}
            title="Request another card"
          >
            Hit
          </Button>
          <Button
            variant="contained"
            sx={buttonStyle}
            disabled={!props.playerTurn}
            onClick={props.onStand}
            title="Keep current hand"
          >
            Stand
          </Button>
          <Button
            variant="contained"
            sx={buttonStyle}
            // disabled={!props.playerTurn || !props.firstTurn}
            disabled
          >
            Double down
          </Button>
          <Button
            variant="contained"
            sx={buttonStyle}
            title="Reset your money to $1000"
            onClick={props.resetMoney}
            // disabled={!props.playerTurn || !props.firstTurn}
          >
            Reset money
          </Button>
          {/* <Button
            variant="contained"
            color="error"
            sx={buttonStyle}
            disabled={!props.playerTurn}
            title="Give up"
          >
            Fold
          </Button> */}
        </Stack>
      </Stack>
    </Box>
  );
}

export default GameTable;
