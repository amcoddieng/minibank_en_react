import React from "react";
import { Box, Typography } from "@mui/material";

export default function History() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Historique des transactions</Typography>
      <Typography variant="body2" color="text.secondary">
        Aucun historique pour le moment.
      </Typography>
    </Box>
  );
}
