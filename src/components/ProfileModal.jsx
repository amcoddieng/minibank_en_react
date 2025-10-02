import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { updateUser } from "./api/api_updateuser";

export default function ProfileModal({ open, onClose, profile, setProfile, liste, setListe }) {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    photo: ""
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm({
        nom: profile.nom || "",
        prenom: profile.prenom || "",
        email: profile.email || "",
        photo: profile.photo || ""
      });
      setPreview(profile.photo || "");
      setPhotoFile(null);
      setError("");
    }
  }, [profile]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Seules les images sont autorisées.");
        e.target.value = null; // reset input
        setPhotoFile(null);
        setPreview(profile.photo || "");
        return;
      }
      setError("");
      setPhotoFile(file);
      setForm(prev => ({ ...prev, photo: file.name }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!form.nom || !form.prenom || !form.email) {
      setError("Tous les champs sont obligatoires");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("nom", form.nom);
      formData.append("prenom", form.prenom);
      formData.append("email", form.email);
      if (photoFile) formData.append("photo", photoFile);

      const data = await updateUser(profile._id, formData);
      if (data && data.user) {
        setProfile(prev => ({ ...prev, ...data.user }));
        setListe(prev => prev.map(u => u._id === profile._id ? { ...u, ...data.user } : u));
        onClose();
      } else {
        setError("Erreur : données utilisateur non reçues");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la mise à jour du profil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: 400, bgcolor: "background.paper", p: 3, mx: "auto", mt: 10, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Modifier le profil</Typography>

        {error && <Typography sx={{ color: "red", mb: 1 }}>{error}</Typography>}

        <TextField label="Nom" name="nom" value={form.nom} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Prénom" name="prenom" value={form.prenom} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth margin="normal" />

        <Box sx={{ mt: 2, mb: 2 }}>
          {preview && (
            <img
              src={preview}
              alt="aperçu"
              style={{ width: 80, height: 80, borderRadius: "50%", marginBottom: 10 }}
            />
          )}
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button variant="outlined" onClick={onClose} disabled={loading}>Annuler</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            {loading ? "Sauvegarde..." : "Sauvegarder"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
