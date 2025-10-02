import React from "react";
import {
  Box,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function MenuLeft({ selectedMenu, setSelectedMenu, darkMode, setDarkMode }) {
  const menuItems = ["Utilisateurs", "Dépôt", "Annuler transaction", "Historique"];

  return (
    <Box
      sx={{
        width: 240,
        height: "100vh",
        bgcolor: "background.paper",
        p: 2,
        borderRight: "1px solid #ccc",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Avatar */}
      <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <Avatar
          alt="Profile"
          src="/w.jpg" // ⚡ si dans public/
          sx={{
            width: 100,
            height: 100,
            mb: 2,
            border: "2px solid #1976d2",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
          }}
        />
        <Typography variant="subtitle1" fontWeight="bold">
          SenBank
        </Typography>
      </Box>

      {/* Menu */}
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Menu
        </Typography>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton
                onClick={() => setSelectedMenu(item)}
                selected={selectedMenu === item}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  "&.Mui-selected": {
                    bgcolor: "primary.main",
                    color: "white",
                    "&:hover": { bgcolor: "primary.dark" },
                  },
                }}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Dark/Light toggle */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Clair" : "Sombre"}
        </Button>
      </Box>
    </Box>
  );
}
