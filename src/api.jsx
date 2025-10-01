// import React, { useEffect, useState } from "react";

// // Composant principal pour gérer l'affichage des utilisateurs
// // - Récupère les utilisateurs depuis http://localhost:3000/api/users/allusers
// // - Affiche dans un tableau responsive
// // - Permet de rechercher et de rafraîchir

// export default function UsersAdmin() {
//   const API_URL = "http://localhost:3000/api/users/allusers?skip=0&take=2"; // modifiez si nécessaire

//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [query, setQuery] = useState("");

//   useEffect(() => {
//     fetchUsers();
//   }, []);



//   async function fetchUsers() {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(API_URL);
//       if (!res.ok) throw new Error(`Erreur ${res.status}`);
//       const data = await res.json();
//       // On s'assure que data est un tableau
//       setUsers(Array.isArray(data) ? data : []);
//     } catch (err) {
//       setError(err.message || "Erreur lors de la récupération");
//     } finally {
//       setLoading(false);
//     }
//   }

//   const filtered = users.filter((u) => {
//     if (!query) return true;
//     const q = query.toLowerCase();
//     return (
//       (u.nom && u.nom.toLowerCase().includes(q)) ||
//       (u.prenom && u.prenom.toLowerCase().includes(q)) ||
//       (u.email && u.email.toLowerCase().includes(q)) ||
//       (u.telephone && u.telephone.toLowerCase().includes(q))
//     );
//   });

//   return (
//     <div className="p-4 max-w-5xl mx-auto">
//         {Bonjour()}
//       <header className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-semibold">Gestion des utilisateurs</h1>
//         <div className="flex gap-2">
//           <button
//             onClick={fetchUsers}
//             className="px-3 py-1 rounded shadow-sm border hover:opacity-90"
//           >
//             Rafraîchir
//           </button>
//         </div>
//       </header>

//       <div className="mb-4 flex gap-2">
//         <input
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Rechercher par nom, email ou téléphone..."
//           className="flex-1 p-2 border rounded"
//         />
//       </div>

//       {loading && <p>Chargement des utilisateurs…</p>}
//       {error && (
//         <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700">
//           {error}
//         </div>
//       )}

//       {!loading && !error && (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border-collapse table-auto">
//             <thead>
//               <tr className="text-left bg-gray-100">
//                 <th className="px-3 py-2">#</th>
//                 <th className="px-3 py-2">Photo</th>
//                 <th className="px-3 py-2">Nom</th>
//                 <th className="px-3 py-2">Prénom</th>
//                 <th className="px-3 py-2">Email</th>
//                 <th className="px-3 py-2">Téléphone</th>
//                 <th className="px-3 py-2">NIN</th>
//                 <th className="px-3 py-2">Passeport</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.length === 0 && (
//                 <tr>
//                   <td colSpan={8} className="p-4 text-center text-gray-500">
//                     Aucun utilisateur trouvé.
//                   </td>
//                 </tr>
//               )}

//               {filtered.map((u, idx) => (
//                 <tr key={u.id || idx} className="border-t">
//                   <td className="px-3 py-2 align-middle">{idx + 1}</td>
//                   <td className="px-3 py-2 align-middle">
//                     {u.photo ? (
//                       // essayer d'afficher l'image si c'est un chemin accessible
//                       <img
//                         src={u.photo.startsWith("http") ? u.photo : `/uploads/${u.photo}`}
//                         alt="profil"
//                         className="w-12 h-12 rounded-full object-cover"
//                         onError={(e) => {
//                           // fallback si l'image n'est pas trouvée
//                           e.currentTarget.src = "/default-avatar.png";
//                         }}
//                       />
//                     ) : (
//                       <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-600">?
//                       </div>
//                     )}
//                   </td>
//                   <td className="px-3 py-2 align-middle">{u.nom || "-"}</td>
//                   <td className="px-3 py-2 align-middle">{u.prenom || "-"}</td>
//                   <td className="px-3 py-2 align-middle">{u.email || "-"}</td>
//                   <td className="px-3 py-2 align-middle">{u.telephone || "-"}</td>
//                   <td className="px-3 py-2 align-middle">{u.nin || "-"}</td>
//                   <td className="px-3 py-2 align-middle">{u.passeport || "-"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//     </div>
//   );
// }



// function Bonjour() {
//   return <h2>Salut, je suis un composant 👌</h2>;
// }




//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!nom || !prenom || !numero) {
//       alert("Veuillez remplir tous les champs !");
//       return;
//     }

//     const newUser = { id: Date.now(), nom, prenom, numero };
//     setListe([...liste, newUser]);

//     // Réinitialiser le formulaire
//     setNom("");
//     setPrenom("");
//     setNumero("");
//   };

//   return (
//     <div style={{ textAlign: "center",border:"solid",margin:"auto", width:"100vw" }}>
   
//       <div> 
//             <ThemeContext.Provider value="dark">
//       <Bouton1 />
//     </ThemeContext.Provider>
//         <Counter></Counter>
//         <CounterReducer></CounterReducer>
//       </div>
//       <h1>📋 Formulaire Utilisateur</h1>

//       <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="Nom"
//           value={nom}
//           onChange={(e) => setNom(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Prénom"
//           value={prenom}
//           onChange={(e) => setPrenom(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Numéro"
//           value={numero}
//           onChange={(e) => setNumero(e.target.value)}
//         />
//         <button type="submit">Ajouter</button>
//       </form>

//       <h2>👥 Liste des utilisateurs</h2>
//       <ul>
//         {liste.map((user) => (
//           <li key={user.id}>
//             {user.nom} {user.prenom} - {user.numero}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }









// // --- Contexte pour le thème ---
// // const ThemeContext = createContext();

// // function App() {
// //   const [count, setCount] = useState(0);

// //   // Effet qui s'exécute à chaque changement de count
//   // useEffect(() => {
//   //   console.log(`Le compteur est maintenant : ${count}`);
//   // }, [count]);

// //   return (
// //     <ThemeContext.Provider value="light">
// //       <div style={{ textAlign: "center", marginTop: "50px" }}>
// //         <h1>🚀 Démo React</h1>
// //         <h2>Compteur : {count}</h2>
// //         <button onClick={() => setCount(count + 1)}>+1</button>
// //         <button onClick={() => setCount(count - 1)}>-1</button>

// //         <ThemeSwitcher />
// //         <CounterReducer />
// //       </div>
// //     </ThemeContext.Provider>
// //   );
// // }

// // --- Exemple de useContext ---
// function ThemeSwitcher() {
//   const theme = useContext(ThemeContext);
//   return <p> Thème actuel : {theme}</p>;
// }

// // --- Exemple de useReducer ---
// function CounterReducer() {
//   const initialState = { count: 0 };
//   function reducer(state, action) {
//     switch (action.type) {
//       case "increment":
//         return { count: state.count + 1 };
//       case "decrement":
//         return { count: state.count - 1 };
//       case "reset":
//         return { count: 0 };
//       default:
//         return state;
//     }
//   }

//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <div style={{ marginTop: "20px" }}>
//       <h3>⚡ Compteur avec useReducer : {state.count}</h3>
//       <button onClick={() => dispatch({ type: "increment" })}>+1</button>
//       <button onClick={() => dispatch({ type: "decrement" })}>-1</button>
//       <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
//     </div>
//   );
// }


// // function Counter() {
// //   const [count, setCount] = useState(0);
// //   return <button onClick={() => setCount(count + 1)}>{count}</button>;
// // }


// // class Counter extends React.Component {
// //   state = { count: 0 };
// //   render() {
// //     return <button onClick={() => this.setState({ count: this.state.count + 1 })}>{this.state.count}</button>;
// //   }
// // }

// function Counter() {
//   const [count, setCount] = useState(0);
// useEffect(()=>{
//  alert('amadou dieng')
// },[count])
//   return (
//     <>
//       <p>Compteur : {count}</p>
//       <button onClick={() => setCount(count + 1)}>+1</button>
//     </>
//   );
// }


// // function Bonjour(props) {
// //   return <h2>Bonjour {props.nom}</h2>;
// // }

// // function App() {
// //   return <Bonjour nom="Fatou" />;
// // }
// // import React, { createContext, useContext } from "react";

// // 1. Création d’un contexte
// const ThemeContext = createContext("light");

// function Bouton1() {
//   // 2. Utilisation du contexte avec useContext
//   const theme = useContext(ThemeContext);
//   return <button
  
  
// className={`btn-${theme}`}>Je suis {theme}</button>;
// }



    //   case "Dépôt":
    //     return (
    //       <Box sx={{ mt: 2, width: 400 }}>
    //         <Typography variant="h6">Effectuer un Dépôt</Typography>
    //         <TextField fullWidth label="Numéro du compte" sx={{ my: 1 }} />
    //         <TextField fullWidth label="Montant à déposer" sx={{ my: 1 }} />
    //         <Button variant="contained" color="primary">
    //           Déposer
    //         </Button>
    //       </Box>
    //     );

    //   case "Annuler transaction":
    //     return (
    //       <Box sx={{ mt: 2, width: 400 }}>
    //         <Typography variant="h6">Annuler une Transaction</Typography>
    //         <TextField fullWidth label="Numéro de transaction" sx={{ my: 1 }} />
    //         <Button variant="contained" color="primary">
    //           Annuler
    //         </Button>
    //       </Box>
    //     );

    //   case "Historique":
    //     const historique = Array.from({ length: 20 }, (_, i) => ({
    //       compte: `77${1000 + i}`,
    //       type: i % 2 === 0 ? "Dépôt" : "Retrait",
    //       montant: `${1000 + i * 10} FCFA`,
    //     }));

    //     return (
    //       <Box sx={{ mt: 2 }}>
    //         <Typography variant="h6">Historique des Transactions</Typography>
    //         <Table>
    //           <TableHead>
    //             <TableRow>
    //               <TableCell>Compte</TableCell>
    //               <TableCell>Type</TableCell>
    //               <TableCell>Montant</TableCell>
    //             </TableRow>
    //           </TableHead>
    //           <TableBody>
    //             {historique
    //               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    //               .map((item, index) => (
    //                 <TableRow key={index}>
    //                   <TableCell>{item.compte}</TableCell>
    //                   <TableCell>{item.type}</TableCell>
    //                   <TableCell>{item.montant}</TableCell>
    //                 </TableRow>
    //               ))}
    //           </TableBody>
    //         </Table>

    //         <TablePagination
    //           component="div"
    //           count={historique.length}
    //           page={page}
    //           onPageChange={handleChangePage}
    //           rowsPerPage={rowsPerPage}
    //           rowsPerPageOptions={[rowsPerPage]}
    //         />
    //       </Box>
    //     );

    //   default:
    //     return <Typography variant="h6">Sélectionnez une option dans le menu</Typography>;
    // }