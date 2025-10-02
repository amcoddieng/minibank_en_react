import React, { useEffect, useState } from "react";
import { Box, CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import NavBar from "./components/NavBar";
import MenuLeft from "./components/MenuLeft";
import UserTable from "./components/UserTable";
import Deposit from "./components/Deposit";
import CancelTransaction from "./components/CancelTransaction";
import History from "./components/History";
import ProfileModal from "./components/ProfileModal";
import UserModal from "./components/UserModal";
import { api_stat } from "./components/api/api_stat";
import { api_getusers } from "./components/api/api_getusers";
import { getUserName } from "./components/api/api_lofin";

export default function App() {
  const [selectedMenu, setSelectedMenu] = useState("Utilisateurs");
  const [darkMode, setDarkMode] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({ _id: "", nom: "", prenom: "", email: "", photo: "" });

  useEffect(() => {
    const { _id, nom, prenom, email, photo } = getUserName();
    setProfile({ _id, nom, prenom, email, photo });
  }, []);

  const theme = createTheme({ palette: { mode: darkMode ? "dark" : "light" } });

  const [liste, setListe] = useState([]);
  const loadUsers = async () => {
    try {
      const dataUser = await api_getusers();
      setListe(dataUser);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => { loadUsers(); }, []);

  const [stat, setStat] = useState({});
  const loadStat = async () => {
    try {
      const data = await api_stat();
      setStat(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { loadStat(); }, []);

  useEffect(() => {
    const statsCalc = {
      total: liste.length,
      clients: liste.filter(u => u.role === "client").length,
      agents: liste.filter(u => u.role === "agent").length,
      distributeurs: liste.filter(u => u.role === "distributeur").length,
    };
    setStat(statsCalc);
  }, [liste]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <MenuLeft 
          selectedMenu={selectedMenu} 
          setSelectedMenu={setSelectedMenu} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
        />
        <Box sx={{ flexGrow: 1, width: "", display: "flex", margin: "auto", flexDirection: "column" }}>
          <NavBar profile={profile} handleOpenProfileModal={() => setOpenProfileModal(true)} stats={stat} />
          <Box sx={{ p: 3 }}>
            {selectedMenu === "Utilisateurs" && 
              <UserTable 
                liste={liste} 
                setListe={setListe} 
                handleOpenUserModal={(index = null) => { setEditIndex(index); setOpenUserModal(true); }}
              />
            }
            {selectedMenu === "Dépôt" && <Deposit liste={liste} setListe={setListe} />}
            {selectedMenu === "Annuler transaction" && <CancelTransaction />}
            {selectedMenu === "Historique" && <History />}
          </Box>
        </Box>
      </Box>

<ProfileModal 
  open={openProfileModal} 
  onClose={() => setOpenProfileModal(false)} 
  profile={profile} 
  setProfile={setProfile} 
  liste={liste} 
  setListe={setListe} 
/>


      <UserModal 
        open={openUserModal} 
        onClose={() => setOpenUserModal(false)} 
        editIndex={editIndex} 
        liste={liste} 
        setListe={setListe} 
      />
    </ThemeProvider>
  );
}
