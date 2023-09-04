import { Card as MUICard, CardContent, Typography } from "@mui/material";
import "./BlackjackCard.css";
import { Card } from "../utils/types";

interface BlackjackCardProps {
  card?: Card;
  hidden?: boolean;
  placeholder?: boolean;
}

const royal: Record<string, string> = { J: "🧝", Q: "👸", K: "🤴" };

function BlackjackCard(props: BlackjackCardProps) {
  if (props.placeholder || !props.card) {
    return (
      <MUICard
        variant="outlined"
        sx={{
          width: 80,
          height: 120,
          cursor: "default",
          userSelect: "none",
          visibility: "hidden", // this hides the card but it still occupies space
        }}
      >
        <CardContent></CardContent>
      </MUICard>
    );
  }

  const { value, suit } = props.card;
  let displayValue = value;
  let displaySuit = suit;
  let color = "black";

  if (royal[value]) {
    displaySuit = royal[value];
    displayValue = value + " " + suit;
  }

  if (suit === "♥" || suit === "♦") {
    color = "red";
  }

  return (
    <MUICard
      variant="outlined"
      sx={{
        width: 80,
        height: 120,
        cursor: "default",
        userSelect: "none",
      }}
    >
      <CardContent
        sx={{
          padding: 0,
          paddingX: 1,
          color: color,
        }}
      >
        <Typography align="left" variant="subtitle1" fontWeight="bold">
          {props.hidden ? "\u00A0" : displayValue}
        </Typography>
        <Typography variant="h3" height={64}>
          {props.hidden ? "🥷" : displaySuit}
        </Typography>
        <Typography
          align="left"
          variant="subtitle1"
          fontWeight="bold"
          sx={{ transform: "rotate(180deg)" }}
        >
          {props.hidden ? "\u00A0" : displayValue}
        </Typography>
      </CardContent>
    </MUICard>
  );
}

export default BlackjackCard;
