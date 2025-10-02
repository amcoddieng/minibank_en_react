import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

export default function History() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  // Charger la liste depuis l'API avec axios
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/getAlltransactions");
        setTransactions(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des transactions:", err);
      }
    };
    fetchTransactions();
  }, []);

  // Filtrage en fonction de la recherche
  useEffect(() => {
    if (!search) {
      setFiltered(transactions);
    } else {
      const lower = search.toLowerCase();
      setFiltered(
        transactions.filter(
          (t) =>
            t.type.toLowerCase().includes(lower) ||
            String(t.montant).includes(lower) ||
            String(t.frais).includes(lower) ||
            t.idCompteSource?.toLowerCase().includes(lower) ||
            t.idCompteDestinataire?.toLowerCase().includes(lower) ||
            t.etat.toLowerCase().includes(lower)
        )
      );
    }
  }, [search, transactions]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Historique des transactions
      </Typography>

      {/* Barre de recherche */}
      <TextField
        label="Rechercher (type, montant, compte, état...)"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ mb: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Aucun historique trouvé.
        </Typography>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Montant</TableCell>
                <TableCell>Frais</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Destinataire</TableCell>
                <TableCell>État</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((t) => (
                <TableRow key={t._id}>
                  <TableCell>{t._id}</TableCell>
                  <TableCell>{t.type}</TableCell>
                  <TableCell>{t.montant}</TableCell>
                  <TableCell>{t.frais}</TableCell>
                  <TableCell>{t.idCompteSource}</TableCell>
                  <TableCell>{t.idCompteDestinataire}</TableCell>
                  <TableCell>{t.etat}</TableCell>
                  <TableCell>
                    {new Date(t.dateTransaction).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
}
