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
}

const buttonStyle = {
  textTransform: "capitalize",
};

const stateMessages = {
  playerTurn: "Your turn",
  setup: "Setup phase",
};

function GameTable(props: TableProps) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Stack direction="row" spacing={16} alignItems="center">
        <Deck deck={props.deck} />
        {props.gameState === "betting" ? (
          <BetSection money={props.money} />
        ) : (
          <Typography
            variant="h4"
            style={{
              width: "200px", // <-- Fixed width for the Typography element. Adjust as needed.
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {props.gameState}
          </Typography>
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
            color="error"
            sx={buttonStyle}
            disabled={!props.playerTurn}
            title="Give up"
          >
            Fold
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default GameTable;
