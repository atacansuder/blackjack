import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";

interface BetSectionProps {
  money: number;
}

function BetSection(props: BetSectionProps) {
  const [currentBet, setCurrentBet] = useState<number>(50);

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
      <Typography variant="h4">Enter bet amount</Typography>
      <Stack direction="row">
        <IconButton sx={{ color: "white" }}>
          <KeyboardArrowDown />
        </IconButton>
        <Typography variant="h4">{"$" + currentBet}</Typography>
        <IconButton sx={{ color: "white" }}>
          <KeyboardArrowUp />
        </IconButton>
      </Stack>
      {/* <FormControl variant="outlined">
        <InputLabel htmlFor="bet-input">Enter a bet amount</InputLabel>
        <Input
          id="bet-input"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl> */}
    </Box>
  );
}

export default BetSection;
