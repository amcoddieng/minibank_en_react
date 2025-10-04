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

  const [errors, setErrors] = useState({});

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
    setErrors({});
  }, [editIndex, liste, open]);

  const validateForm = () => {
    const newErrors = {};

    if (!form.nom.trim()) newErrors.nom = "Le nom est obligatoire.";
    if (!form.prenom.trim()) newErrors.prenom = "Le prénom est obligatoire.";

    const phoneRegex = /^[0-9]{8,15}$/;
    if (!form.telephone.trim()) newErrors.telephone = "Le téléphone est obligatoire.";
    else if (!phoneRegex.test(form.telephone)) newErrors.telephone = "Téléphone invalide (8 à 15 chiffres).";

    const ninRegex = /^[A-Z0-9]{5,20}$/i;
    if (!form.nin.trim()) newErrors.nin = "Le NIN est obligatoire.";
    else if (!ninRegex.test(form.nin)) newErrors.nin = "NIN invalide.";

    if (!form.adresse.trim()) newErrors.adresse = "L'adresse est obligatoire.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) newErrors.email = "L'email est obligatoire.";
    else if (!emailRegex.test(form.email)) newErrors.email = "Email invalide.";

    if (!["client", "agent", "distributeur"].includes(form.role))
      newErrors.role = "Rôle invalide.";

    if (form.photo && !form.photo.type.startsWith("image/"))
      newErrors.photo = "Seules les images sont autorisées.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // true si pas d'erreurs
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, photo: file });
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      if (editIndex !== null) {
        const userId = liste[editIndex]._id;
        const updatedUser = await updateUser(userId, formData);
        setListe((prev) =>
          prev.map((u) => (u._id === updatedUser._id ? updatedUser : u))
        );
      } else {
        const newUser = await createUser(formData);
        setListe((prev) => [...prev, newUser]);
      }

      onClose();
    } catch (err) {
      console.error("Erreur API :", err.response?.data || err.message);
      setErrors({ api: "Erreur lors de l'enregistrement de l’utilisateur." });
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
        {errors.api && (
          <Typography color="error" sx={{ mb: 1 }}>
            {errors.api}
          </Typography>
        )}

        <TextField
          label="Nom"
          name="nom"
          value={form.nom}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.nom}
          helperText={errors.nom}
        />
        <TextField
          label="Prénom"
          name="prenom"
          value={form.prenom}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.prenom}
          helperText={errors.prenom}
        />
        <TextField
          label="Téléphone"
          name="telephone"
          value={form.telephone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.telephone}
          helperText={errors.telephone}
        />
        <TextField
          label="NIN"
          name="nin"
          value={form.nin}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.nin}
          helperText={errors.nin}
        />
        <TextField
          label="Adresse"
          name="adresse"
          value={form.adresse}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.adresse}
          helperText={errors.adresse}
        />
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          select
          label="Rôle"
          name="role"
          value={form.role}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.role}
          helperText={errors.role}
        >
          <MenuItem value="client">client</MenuItem>
          <MenuItem value="agent">agent</MenuItem>
          <MenuItem value="distributeur">distributeur</MenuItem>
        </TextField>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginTop: "15px" }}
        />
        {errors.photo && (
          <Typography color="error" variant="body2">
            {errors.photo}
          </Typography>
        )}

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
