import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";

interface BetSectionProps {
  money: number;
  previousBet?: number;
  placeBet: (bet: number) => void;
}

function BetSection(props: BetSectionProps) {
  const [currentBet, setCurrentBet] = useState<number>(
    props.money < 100 ? props.money : 100
  );

  function increaseBet(unit: number = 50) {
    const newBet = currentBet + unit;
    if (newBet > props.money) return;
    setCurrentBet(newBet);
  }

  function decreaseBet(unit: number = 50) {
    const newBet = currentBet - unit;
    if (newBet <= 0) return;
    setCurrentBet(newBet);
  }

  function allIn() {
    setCurrentBet(props.money);
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
      bgcolor="rgb(0,0,0,0.25)"
      padding={2}
      borderRadius={5}
    >
      <Stack direction="column">
        <Typography variant="h5">Enter bet amount</Typography>
        <Typography variant="subtitle1" marginTop={0}>
          You have ${props.money}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <IconButton sx={{ color: "white" }} onClick={() => decreaseBet()}>
          <KeyboardArrowDown />
        </IconButton>
        {/* <Input
          value={currentBet}
          type="number"
          sx={{ color: "white", borderColor: "white" }}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        /> */}
        <Typography variant="h5" sx={{ userSelect: "none" }}>
          {"$" + currentBet}
        </Typography>
        <IconButton sx={{ color: "white" }} onClick={() => increaseBet()}>
          <KeyboardArrowUp />
        </IconButton>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          sx={{ textTransform: "capitalize" }}
          onClick={allIn}
          // disabled={!props.playerTurn || !props.firstTurn}
        >
          All in
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{ textTransform: "capitalize" }}
          onClick={() => props.placeBet(currentBet)}
          // disabled={!props.playerTurn || !props.firstTurn}
        >
          Confirm
        </Button>
      </Stack>
    </Box>
  );
}

export default BetSection;
