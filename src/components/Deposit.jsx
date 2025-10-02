// import React, { useState } from "react";
// import { Box, TextField, Button } from "@mui/material";

// export default function Deposit({ liste, setListe }) {
//   const [numero, setNumero] = useState("");
//   const [montant, setMontant] = useState("");

//   const handleDeposit = () => {
//     const index = liste.findIndex((u) => u.numero === numero);
//     if (index !== -1) {
//       const newList = [...liste];
//       newList[index].solde = Number(newList[index].solde) + Number(montant);
//       setListe(newList);
//       alert(`Dépôt de ${montant} effectué pour ${newList[index].prenom} ${newList[index].nom}`);
//     } else {
//       alert("Utilisateur introuvable !");
//     }
//   };

//   return (
//     <Box sx={{ mt: 2, p: 2 }}>
//       <TextField label="Numéro utilisateur" value={numero} onChange={(e) => setNumero(e.target.value)} fullWidth margin="normal" />
//       <TextField label="Montant" type="number" value={montant} onChange={(e) => setMontant(e.target.value)} fullWidth margin="normal" />
//       <Button variant="contained" onClick={handleDeposit}>
//         Valider le dépôt
//       </Button>
//     </Box>
//   );
// }
import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { makeDepot } from "./api/api_depot";
import { getId } from "./api/api_lofin";

export default function Deposit() {
  const [compteDestinataire, setCompteDestinataire] = useState("");
  const [montant, setMontant] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const idCompteSource = getId(); // id de l'admin qui fait le depot

  const handleDeposit = async () => {
    setMessage("");
    setError("");

    if (!compteDestinataire || !montant) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    if (Number(montant) <= 0) {
      setError("Le montant doit être supérieur à zéro.");
      return;
    }

    try {
      const res = await makeDepot({ compteDestinataire, montant: Number(montant), idCompteSource });
      setMessage(`Dépôt effectué avec succès : montant ${res.montantTransfere} €, frais ${res.frais} €, débité ${res.montantDebite} €`);
      setCompteDestinataire("");
      setMontant("");
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors du dépôt");
    }
  };

  return (
    <Box sx={{ mt: 2, p: 2, maxWidth: 400 }}>
      <TextField
        label="Compte destinataire"
        value={compteDestinataire}
        onChange={(e) => setCompteDestinataire(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Montant"
        type="number"
        value={montant}
        onChange={(e) => setMontant(e.target.value)}
        fullWidth
        margin="normal"
      />
      {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
      {message && <Typography color="primary" sx={{ mt: 1 }}>{message}</Typography>}
      <Button variant="contained" onClick={handleDeposit} sx={{ mt: 2 }}>
        Valider le dépôt
      </Button>
    </Box>
  );
}






