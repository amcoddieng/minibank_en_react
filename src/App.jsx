// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   CssBaseline,
//   IconButton,
//   Typography,
//   Avatar,
//   Menu,
//   MenuItem,
//   Paper,
//   Grid,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Modal,
//   TextField,
//   Select,
//   MenuItem as SelectItem,
//   InputLabel,
//   FormControl,
//   createTheme,
//   ThemeProvider,
//   List,
//   ListItem,
//   ListItemText,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";

// function App() {
//   // ------------------ Utilisateurs ------------------
//   const [nom, setNom] = useState("");
//   const [prenom, setPrenom] = useState("");
//   const [numero, setNumero] = useState("");
//   const [nin, setNin] = useState("");
//   const [adresse, setAdresse] = useState("");
//   const [email, setEmail] = useState("");
//   const [type, setType] = useState("Agent");
//   const [solde, setSolde] = useState("");
//   const [status, setStatus] = useState("Actif");

//   const [liste, setListe] = useState(
//     Array.from({ length: 10 }, (_, i) => ({
//       nom: `Nom${i + 1}`,
//       prenom: `Prenom${i + 1}`,
//       numero: `77${1000 + i}`,
//       nin: `NIN000${i + 1}`,
//       adresse: `Adresse ${i + 1}`,
//       email: `email${i + 1}@domaine.com`,
//       type: i % 3 === 0 ? "Agent" : i % 3 === 1 ? "Distributeur" : "Client",
//       solde: `${1000 * (i + 1)} FCFA`,
//       status: i % 2 === 0 ? "Actif" : "Bloqué",
//     }))
//   );

//   const [editIndex, setEditIndex] = useState(null);

//   // ------------------ Menu & Pagination ------------------
//   const [selectedMenu, setSelectedMenu] = useState("Utilisateurs");
//   const [menuOpen, setMenuOpen] = useState(true);
//   const [page, setPage] = useState(0);
//   const rowsPerPage = 5;

//   // ------------------ Mode sombre / clair ------------------
//   const [darkMode, setDarkMode] = useState(false);
//   const theme = createTheme({
//     palette: {
//       mode: darkMode ? "dark" : "light",
//       primary: { main: "#1976d2" },
//     },
//   });

//   // ------------------ Modal Utilisateur ------------------
//   const [openModal, setOpenModal] = useState(false);
//   const handleOpenModal = (index = null) => {
//     if (index !== null) {
//       const user = liste[index];
//       setNom(user.nom);
//       setPrenom(user.prenom);
//       setNumero(user.numero);
//       setNin(user.nin);
//       setAdresse(user.adresse);
//       setEmail(user.email);
//       setType(user.type);
//       setSolde(user.solde);
//       setStatus(user.status);
//       setEditIndex(index);
//     } else {
//       setNom("");
//       setPrenom("");
//       setNumero("");
//       setNin("");
//       setAdresse("");
//       setEmail("");
//       setType("Agent");
//       setSolde("");
//       setStatus("Actif");
//       setEditIndex(null);
//     }
//     setOpenModal(true);
//   };
//   const handleCloseModal = () => setOpenModal(false);

//   const handleAddUser = () => {
//     if (nom && prenom && numero && nin && email) {
//       const newUser = { nom, prenom, numero, nin, adresse, email, type, solde, status };
//       if (editIndex !== null) {
//         const updatedList = [...liste];
//         updatedList[editIndex] = newUser;
//         setListe(updatedList);
//       } else {
//         setListe([...liste, newUser]);
//       }
//       handleCloseModal();
//     }
//   };

//   const handleDeleteUser = (index) => {
//     const newList = [...liste];
//     newList.splice(index, 1);
//     setListe(newList);
//   };

//   const handleChangePage = (event, newPage) => setPage(newPage);

//   // ------------------ Recherche ------------------
//   const [search, setSearch] = useState("");
//   const filteredList = liste.filter(
//     (item) =>
//       item.nom.toLowerCase().includes(search.toLowerCase()) ||
//       item.prenom.toLowerCase().includes(search.toLowerCase()) ||
//       item.numero.includes(search) ||
//       item.email.toLowerCase().includes(search.toLowerCase())
//   );

//   // ------------------ Modal Profil ------------------
//   const [openProfileModal, setOpenProfileModal] = useState(false);
//   const [profile, setProfile] = useState({
//     nom: "Amadou",
//     prenom: "Dieng",
//     email: "amadou.dieng@example.com",
//     numero: "771234567",
//     adresse: "Dakar, Sénégal",
//   });

//   const handleOpenProfileModal = () => setOpenProfileModal(true);
//   const handleCloseProfileModal = () => setOpenProfileModal(false);
//   const handleSaveProfile = () => {
//     console.log("Profil sauvegardé :", profile);
//     handleCloseProfileModal();
//   };

//   // ------------------ Nav Bar ------------------
//   const Nav = () => {
//     const [anchorEl, setAnchorEl] = useState(null);
//     const open = Boolean(anchorEl);
//     const handleClick = (event) => setAnchorEl(event.currentTarget);
//     const handleClose = () => setAnchorEl(null);
//     const handleLogout = () => {
//       console.log("Déconnexion");
//       handleClose();
//     };

//     const stats = [
//       { label: "Distributeurs", value: "4958", color: "primary.light" },
//       { label: "Clients", value: "9746308", color: "success.light" },
//       { label: "Agents", value: "280", color: "info.light" },
//     ];

//     return (
//       <Box sx={{ width: "100%", bgcolor: "background.paper", p: 3, borderBottom: "1px solid", borderColor: "divider" }}>
//         {/* Titre + Profil */}
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
//           <Typography variant="h5" fontWeight="bold">
//             Dashboard de l'agent
//           </Typography>

//           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//             <Avatar
//               alt="Profile"
//               src="w.jpg"
//               sx={{
//                 width: 45,
//                 height: 45,
//                 border: "2px solid",
//                 borderColor: "primary.main",
//                 animation: "spin 5s linear infinite",
//                 "@keyframes spin": { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } },
//               }}
//             />
//             <Button variant="contained" color="primary" onClick={handleClick}>
//               {profile.nom} {profile.prenom}
//             </Button>
//             <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
//               <MenuItem
//                 onClick={() => {
//                   handleOpenProfileModal();
//                   handleClose();
//                 }}
//               >
//                 Modifier Profil
//               </MenuItem>
//               <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
//             </Menu>
//           </Box>
//         </Box>

//         {/* Stats */}
//         <Grid container spacing={3} justifyContent="center" alignItems="center">
//           {stats.map((stat, i) => (
//             <Grid item xs={12} sm={4} key={i}>
//               <Paper
//                 elevation={3}
//                 sx={{
//                   width: 130,
//                   height: 130,
//                   borderRadius: "50%",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   margin: "auto",
//                   bgcolor: stat.color,
//                   color: "text.primary",
//                   textAlign: "center",
//                 }}
//               >
//                 <Box>
//                   <Typography variant="h6" fontWeight="bold">
//                     {stat.value}
//                   </Typography>
//                   <Typography variant="body2">{stat.label}</Typography>
//                 </Box>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     );
//   };

//   // ------------------ Menu Latéral ------------------
//   const MenuLeft = () => {
//     const menuItems = ["Utilisateurs", "Dépôt", "Annuler transaction", "Historique"];
//     return (
//       <Box
//         sx={{
//           width: 240,
//           height: "100%",
//           bgcolor: "background.paper",
//           p: 2,
//           borderRight: "1px solid #ccc",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
//           <Avatar
//             alt="Profile"
//             src="w.jpg"
//             sx={{
//               width: 100,
//               height: 100,
//               mb: 2,
//               animation: "spin 4s linear infinite",
//               "@keyframes spin": { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } },
//             }}
//           />
//         </Box>

//         <Box>
//           <Typography variant="h6" sx={{ mb: 2 }}>
//             Menu
//           </Typography>
//           <List>
//             {menuItems.map((item) => (
//               <ListItem
//                 button
//                 key={item}
//                 onClick={() => setSelectedMenu(item)}
//                 sx={{
//                   borderRadius: 2,
//                   mb: 1,
//                   bgcolor: selectedMenu === item ? "primary.light" : "transparent",
//                   "&:hover": { bgcolor: selectedMenu === item ? "primary.main" : "grey.300" },
//                 }}
//               >
//                 <ListItemText primary={item} />
//               </ListItem>
//             ))}
//           </List>
//         </Box>

//         <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
//           <Button
//             variant="outlined"
//             startIcon={darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
//             onClick={() => setDarkMode(!darkMode)}
//           >
//             {darkMode ? "Clair" : "Sombre"}
//           </Button>
//         </Box>
//       </Box>
//     );
//   };

//   // ------------------ Contenu principal ------------------
//   const renderMainContent = () => {
//     switch (selectedMenu) {
//       case "Utilisateurs":
//         return (
//           <Box sx={{ mt: 2 }}>
//             <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//               <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
//                 Ajouter
//               </Button>
//               <TextField
//                 label="Rechercher..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//             </Box>

//             <Table sx={{ mt: 2 }}>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Nom</TableCell>
//                   <TableCell>Prénom</TableCell>
//                   <TableCell>Numéro</TableCell>
//                   <TableCell>NIN</TableCell>
//                   <TableCell>Adresse</TableCell>
//                   <TableCell>Email</TableCell>
//                   <TableCell>Type</TableCell>
//                   <TableCell>Solde</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredList
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((item, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{item.nom}</TableCell>
//                       <TableCell>{item.prenom}</TableCell>
//                       <TableCell>{item.numero}</TableCell>
//                       <TableCell>{item.nin}</TableCell>
//                       <TableCell>{item.adresse}</TableCell>
//                       <TableCell>{item.email}</TableCell>
//                       <TableCell>{item.type}</TableCell>
//                       <TableCell>{item.solde}</TableCell>
//                       <TableCell>{item.status}</TableCell>
//                       <TableCell>
//                         <Button color="primary" onClick={() => handleOpenModal(page * rowsPerPage + index)}>
//                           Modifier
//                         </Button>
//                         <Button color="secondary" onClick={() => handleDeleteUser(page * rowsPerPage + index)}>
//                           Supprimer
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//               </TableBody>
//             </Table>

//             <TablePagination
//               component="div"
//               count={filteredList.length}
//               page={page}
//               onPageChange={handleChangePage}
//               rowsPerPage={rowsPerPage}
//               rowsPerPageOptions={[rowsPerPage]}
//             />

//             {/* Modal Formulaire Utilisateur */}
//             <Modal open={openModal} onClose={handleCloseModal}>
//               <Paper
//                 sx={{
//                   position: "absolute",
//                   top: "50%",
//                   left: "50%",
//                   transform: "translate(-50%, -50%)",
//                   width: 450,
//                   maxHeight: "90vh",
//                   overflowY: "auto",
//                   p: 4,
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 2,
//                 }}
//               >
//                 <Typography variant="h6">{editIndex !== null ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}</Typography>
//                 <TextField label="Nom" value={nom} onChange={(e) => setNom(e.target.value)} fullWidth />
//                 <TextField label="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} fullWidth />
//                 <TextField label="Numéro" value={numero} onChange={(e) => setNumero(e.target.value)} fullWidth />
//                 <TextField label="NIN" value={nin} onChange={(e) => setNin(e.target.value)} fullWidth />
//                 <TextField label="Adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} fullWidth />
//                 <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
//                 <FormControl fullWidth>
//                   <InputLabel>Type</InputLabel>
//                   <Select value={type} onChange={(e) => setType(e.target.value)}>
//                     <SelectItem value="Agent">Agent</SelectItem>
//                     <SelectItem value="Distributeur">Distributeur</SelectItem>
//                     <SelectItem value="Client">Client</SelectItem>
//                   </Select>
//                 </FormControl>
//                 <TextField label="Solde" value={solde} onChange={(e) => setSolde(e.target.value)} fullWidth />
//                 <FormControl fullWidth>
//                   <InputLabel>Status</InputLabel>
//                   <Select value={status} onChange={(e) => setStatus(e.target.value)}>
//                     <SelectItem value="Actif">Actif</SelectItem>
//                     <SelectItem value="Bloqué">Bloqué</SelectItem>
//                   </Select>
//                 </FormControl>
//                 <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
//                   <Button onClick={handleCloseModal}>Annuler</Button>
//                   <Button variant="contained" color="primary" onClick={handleAddUser}>
//                     {editIndex !== null ? "Modifier" : "Ajouter"}
//                   </Button>
//                 </Box>
//               </Paper>
//             </Modal>

//             {/* Modal Formulaire Profil */}
//             <Modal open={openProfileModal} onClose={handleCloseProfileModal}>
//               <Paper
//                 sx={{
//                   position: "absolute",
//                   top: "50%",
//                   left: "50%",
//                   transform: "translate(-50%, -50%)",
//                   width: 400,
//                   p: 4,
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 2,
//                 }}
//               >
//                 <Typography variant="h6">Modifier Profil</Typography>
//                 <TextField
//                   label="Nom"
//                   value={profile.nom}
//                   onChange={(e) => setProfile({ ...profile, nom: e.target.value })}
//                   fullWidth
//                 />
//                 <TextField
//                   label="Prénom"
//                   value={profile.prenom}
//                   onChange={(e) => setProfile({ ...profile, prenom: e.target.value })}
//                   fullWidth
//                 />
//                 <TextField
//                   label="Email"
//                   value={profile.email}
//                   onChange={(e) => setProfile({ ...profile, email: e.target.value })}
//                   fullWidth
//                 />
//                 <TextField
//                   label="Numéro"
//                   value={profile.numero}
//                   onChange={(e) => setProfile({ ...profile, numero: e.target.value })}
//                   fullWidth
//                 />
//                 <TextField
//                   label="Adresse"
//                   value={profile.adresse}
//                   onChange={(e) => setProfile({ ...profile, adresse: e.target.value })}
//                   fullWidth
//                 />
//                 <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
//                   <Button onClick={handleCloseProfileModal}>Annuler</Button>
//                   <Button variant="contained" color="primary" onClick={handleSaveProfile}>
//                     Enregistrer
//                   </Button>
//                 </Box>
//               </Paper>
//             </Modal>
//           </Box>
//         );
//       case "Dépôt":
//         return (
//           <Box sx={{ mt: 2, width: 400 }}>
//             <Typography variant="h6">Effectuer un Dépôt</Typography>
//             <TextField fullWidth label="Numéro du compte" sx={{ my: 1 }} />
//             <TextField fullWidth label="Montant à déposer" sx={{ my: 1 }} />
//             <Button variant="contained" color="primary">
//               Déposer
//             </Button>
//           </Box>
//         );

//       case "Annuler transaction":
//         return (
//           <Box sx={{ mt: 2, width: 400 }}>
//             <Typography variant="h6">Annuler une Transaction</Typography>
//             <TextField fullWidth label="Numéro de transaction" sx={{ my: 1 }} />
//             <Button variant="contained" color="secondary">
//               Annuler
//             </Button>
//           </Box>
//         );

//       case "Historique":
//         return (
//           <Box sx={{ mt: 2 }}>
//             <Typography variant="h6">Historique des transactions</Typography>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Date</TableCell>
//                   <TableCell>Type</TableCell>
//                   <TableCell>Montant</TableCell>
//                   <TableCell>Numéro</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <TableRow key={i}>
//                     <TableCell>2025-09-{10 + i}</TableCell>
//                     <TableCell>Dépôt</TableCell>
//                     <TableCell>{(i + 1) * 1000} FCFA</TableCell>
//                     <TableCell>77{1000 + i}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Box>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box sx={{ display: "flex", height: "100vh" }}>
//         <MenuLeft />
//         <Box sx={{ flex: 1, overflowY: "auto" }}>
//           <Nav />
//           <Box sx={{ p: 3 }}>{renderMainContent()}</Box>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default App;









import React, { useEffect, useState } from "react";
import { Box, CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import NavBar from "./components/NavBar";
import MenuLeft from "./components/MenuLeft";
import UserTable from "./components/UserTable";
import Deposit from "./components/Deposit";
import CancelTransaction from "./components/CancelTransaction";
import History from "./components/History";
import ProfileModal from "./components/ProfileModal";
import { api_stat } from "./components/api/api_stat";
import { api_getusers } from "./components/api/api_getusers";

export default function App() {
  const [selectedMenu, setSelectedMenu] = useState("Utilisateurs");
  const [darkMode, setDarkMode] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    nom: "Ndiaye",
    prenom: "Fatou",
    email: "fatou@example.com",
  });


  const theme = createTheme({ palette: { mode: darkMode ? "dark" : "light" } });

  


// remplissage du tableau users via l'api
const [liste, setListe] = useState([]);
const loadUsers = async() => {
  try {
    const dataUser = await api_getusers()
    setListe(dataUser)
    console.error(dataUser);

  } catch (error) {
    console.error(error);
  }
}
useEffect(()=>{
  loadUsers()
},[])



// les stats dans la navbar
const [stat, setStat] = useState({});
const loadStat = async () => {
  try {
    const data = await api_stat();
    // console.log("Données reçues :", data); // données direct de l'API
    setStat(data); // mise à jour de l'état
  } catch (err) {
    // console.error(err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  loadStat();
}, []);

// useEffect(() => {
//   console.log("Stat mis à jour :", stat); // ici tu verras stat après mise à jour
// }, [stat]);







// rendu de la page principal
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <MenuLeft selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} darkMode={darkMode} setDarkMode={setDarkMode} />
        <Box sx={{ flexGrow: 1 }}>
          <NavBar profile={profile} handleOpenProfileModal={() => setOpenProfileModal(true)} stats = {stat}/>

          <Box sx={{ p: 3 }}>
            {selectedMenu === "Utilisateurs" && <UserTable liste={liste} setListe={setListe} />}
            {selectedMenu === "Dépôt" && <Deposit liste={liste} setListe={setListe} />}
            {selectedMenu === "Annuler transaction" && <CancelTransaction />}
            {selectedMenu === "Historique" && <History />}
          </Box>
        </Box>
      </Box>

      <ProfileModal open={openProfileModal} onClose={() => setOpenProfileModal(false)} profile={profile} setProfile={setProfile} />
    </ThemeProvider>
  );
}
