import React from "react";
import { Box, Avatar, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function MenuLeft({ selectedMenu, setSelectedMenu, darkMode, setDarkMode }) {
  const menuItems = ["Utilisateurs", "Dépôt", "Annuler transaction", "Historique"];

  return (
    <Box
      sx={{
        width: 240,
        height: "100%",
        bgcolor: "background.paper",
        p: 2,
        borderRight: "1px solid #ccc",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <Avatar
          alt="Profile"
          src="w.jpg"
          sx={{
            width: 100,
            height: 100,
            mb: 2,
            animation: "spin 4s linear infinite",
            "@keyframes spin": { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } },
          }}
        />
      </Box>

      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Menu
        </Typography>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item}
              onClick={() => setSelectedMenu(item)}
              sx={{
                borderRadius: 2,
                mb: 1,
                bgcolor: selectedMenu === item ? "primary.light" : "transparent",
                "&:hover": { bgcolor: selectedMenu === item ? "primary.main" : "grey.300" },
              }}
            >
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>

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
