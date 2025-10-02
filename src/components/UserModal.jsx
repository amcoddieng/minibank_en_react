import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, MenuItem, Typography } from "@mui/material";
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
    photo: null,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (editIndex !== null && liste[editIndex]) {
      setForm({ ...liste[editIndex], photo: null });
    } else {
      setForm({
        nom: "",
        prenom: "",
        telephone: "",
        nin: "",
        adresse: "",
        email: "",
        role: "client",
        photo: null,
      });
    }
    setError("");
  }, [editIndex, liste, open]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Seules les images sont autorisées.");
        e.target.value = null; // reset file input
        setForm({ ...form, photo: null });
      } else {
        setError("");
        setForm({ ...form, photo: file });
      }
    }
  };

  const handleSubmit = async () => {
    if (!form.nom || !form.prenom || !form.telephone || !form.nin || !form.adresse || !form.email || !form.role) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      if (editIndex !== null) {
        const userId = liste[editIndex]._id;
        const updatedUser = await updateUser(userId, formData);
        const newList = [...liste];
        newList[editIndex] = updatedUser;
        setListe(newList);
      } else {
        const newUser = await createUser(formData);
        setListe([...liste, newUser]);
      }

      onClose();
    } catch (err) {
      console.error("Erreur API :", err.response?.data || err.message);
      setError("Erreur lors de l'enregistrement de l’utilisateur.");
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
        {error && (
          <Typography color="error" sx={{ mb: 1 }}>
            {error}
          </Typography>
        )}

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

        <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginTop: "15px" }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="outlined" onClick={onClose}>Annuler</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editIndex !== null ? "Modifier" : "Ajouter"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
