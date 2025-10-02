import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, MenuItem } from "@mui/material";
import { createUser } from "./api/api_createuser";
import { updateUser } from "./api/api_updateuser";

export default function UserModal({ open, onClose, editIndex, liste, setListe }) {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    nin: "",
    adresse: "",
    email: "",
    role: "client",
  });

  useEffect(() => {
    if (editIndex !== null && liste[editIndex]) {
      setForm(liste[editIndex]);
    } else {
      setForm({
        nom: "",
        prenom: "",
        telephone: "",
        nin: "",
        adresse: "",
        email: "",
        role: "client",
      });
    }
  }, [editIndex, liste]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const { _id, compte, ...userData } = form;

      if (editIndex !== null) {
        // ✅ Edition
        const userId = liste[editIndex]._id;
        await updateUser(userId, userData);

        const newList = [...liste];
        newList[editIndex] = { ...newList[editIndex], ...userData };
        setListe(newList);
      } else {
        // ✅ Création
        const res = await createUser(userData);
        setListe([
          ...liste,
          {
            ...userData,
            _id: res.id,
            compte: { numeroCompte: res.numeroCompte, solde: 0 },
          },
        ]);
      }

      onClose();
    } catch (err) {
      console.error("Erreur API :", err.response?.data || err.message);
      alert("Erreur lors de l'enregistrement de l’utilisateur");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 400,
          bgcolor: "background.paper",
          p: 3,
          mx: "auto",
          mt: 10,
          borderRadius: 2,
        }}
      >
        <TextField label="Nom" name="nom" value={form.nom} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Prénom" name="prenom" value={form.prenom} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Téléphone" name="telephone" value={form.telephone} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="NIN" name="nin" value={form.nin} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Adresse" name="adresse" value={form.adresse} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth margin="normal" />
        <TextField select label="Rôle" name="role" value={form.role} onChange={handleChange} fullWidth margin="normal">
          <MenuItem value="client">client</MenuItem>
          <MenuItem value="agent">agent</MenuItem>
          <MenuItem value="distributeur">distributeur</MenuItem>
        </TextField>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editIndex !== null ? "Modifier" : "Ajouter"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
