import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

export default function Deposit({ liste, setListe }) {
  const [numero, setNumero] = useState("");
  const [montant, setMontant] = useState("");

  const handleDeposit = () => {
    const index = liste.findIndex((u) => u.numero === numero);
    if (index !== -1) {
      const newList = [...liste];
      newList[index].solde = Number(newList[index].solde) + Number(montant);
      setListe(newList);
      alert(`Dépôt de ${montant} effectué pour ${newList[index].prenom} ${newList[index].nom}`);
    } else {
      alert("Utilisateur introuvable !");
    }
  };

  return (
    <Box sx={{ mt: 2, p: 2 }}>
      <TextField label="Numéro utilisateur" value={numero} onChange={(e) => setNumero(e.target.value)} fullWidth margin="normal" />
      <TextField label="Montant" type="number" value={montant} onChange={(e) => setMontant(e.target.value)} fullWidth margin="normal" />
      <Button variant="contained" onClick={handleDeposit}>
        Valider le dépôt
      </Button>
    </Box>
  );
}
