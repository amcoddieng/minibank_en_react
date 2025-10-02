import React, { useState } from "react";
import { Box, Typography, Avatar, Button, Menu, MenuItem, Grid, Paper } from "@mui/material";

export default function NavBar({ profile, handleOpenProfileModal, stats }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    console.log("Déconnexion");
    handleClose();
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", p: 3, borderBottom: "1px solid", borderColor: "divider" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h5" fontWeight="bold">Dashboard</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar 
            alt="Profile" 
            src={profile.photo ? profile.photo : "/w.jpg"} 
            sx={{ width: 45, height: 45, border: "2px solid", borderColor: "primary.main" }}
          />
          <Button variant="contained" color="primary" onClick={handleClick}>
            {profile.nom} {profile.prenom}
          </Button>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={() => { handleOpenProfileModal(); handleClose(); }}>Modifier Profil</MenuItem>
            <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
          </Menu>
        </Box>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {stats && Object.keys(stats).length > 0 ? (
          Object.entries(stats).map(([key, value]) => (
            <Grid item xs={12} sm={3} key={key}>
              <Paper
                elevation={3}
                sx={{
                  width: 130,
                  height: 130,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "auto",
                  textAlign: "center",
                }}
              >
                <Box>
                  <Typography variant="h6" fontWeight="bold">{value}</Typography>
                  <Typography variant="body2">{key}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography variant="body2">Chargement des stats...</Typography>
        )}
      </Grid>
    </Box>
  );
}
