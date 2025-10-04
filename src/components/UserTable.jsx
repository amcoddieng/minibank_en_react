import React, { useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Checkbox,
  IconButton,
  Tooltip,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UserModal from "./UserModal";
import { deleteUsers } from "./api/api_deleteuser";
import { blockUsers } from "./api/api_blockusers";
import { getId } from "./api/api_lofin"; // ✅ récupération de l’ID user connecté

export default function UserTable({ liste, setListe }) {
  const [openModal, setOpenModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const [selectedIds, setSelectedIds] = useState(new Set());

  // filtres
  const [searchText, setSearchText] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [minSolde, setMinSolde] = useState("");
  const [maxSolde, setMaxSolde] = useState("");

  // modal confirmation
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);

  // ✅ ID du user connecté
  const currentUserId = getId();

  // Modal utilisateur
  const handleOpenModal = (index = null) => {
    setEditIndex(index);
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);

  // Sélection
  const toggleSelect = (id) => {
    const next = new Set(selectedIds);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelectedIds(next);
  };

  const toggleSelectAll = (checked, visibleRows) => {
    const next = new Set(selectedIds);
    visibleRows.forEach((r) => (checked ? next.add(r._id) : next.delete(r._id)));
    setSelectedIds(next);
  };

  // Ouvrir la modal de confirmation
  const openConfirmModal = (message, action) => {
    setConfirmMessage(message);
    setConfirmAction(() => action);
    setConfirmOpen(true);
  };
  const handleConfirmClose = () => setConfirmOpen(false);
  const handleConfirm = async () => {
    if (confirmAction) await confirmAction();
    setConfirmOpen(false);
  };

  // Suppression
  const handleDelete = async (ids) => {
    if (!ids.length) return;
    try {
      await deleteUsers(ids);
      setListe((prev) => prev.filter((u) => !ids.includes(u._id)));
      const next = new Set(selectedIds);
      ids.forEach((id) => next.delete(id));
      setSelectedIds(next);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression");
    }
  };

  // Blocage / Déblocage
  const handleBlock = async (block) => {
    if (!selectedIds.size) return;
    try {
      await blockUsers({ ids: Array.from(selectedIds), block });
      setListe((prev) =>
        prev.map((u) => (selectedIds.has(u._id) ? { ...u, block } : u))
      );
      setSelectedIds(new Set());
    } catch (err) {
      console.error(err);
      alert("Erreur lors du blocage/déblocage");
    }
  };

  // Filtrage multi-critères + exclusion du user connecté
  const filteredListe = liste
    .filter((item) => item._id !== currentUserId) // 🚀 exclusion
    .filter((item) => {
      const textMatch =
        item.nom?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.prenom?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.compte?.numeroCompte?.includes(searchText);

      const roleMatch = filterRole ? item.role === filterRole : true;
      const minMatch = minSolde
        ? (item.compte?.solde || 0) >= parseFloat(minSolde)
        : true;
      const maxMatch = maxSolde
        ? (item.compte?.solde || 0) <= parseFloat(maxSolde)
        : true;

      return textMatch && roleMatch && minMatch && maxMatch;
    });

  const visibleRows = filteredListe.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const allVisibleSelected = visibleRows.every((r) => selectedIds.has(r._id));

  return (
    <Box sx={{ mt: 2, width: "100%" }}>
      {/* Filtres */}
      <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
        <TextField
          label="Nom, Prénom, Email ou Numéro Compte"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setPage(0);
          }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Rôle</InputLabel>
          <Select
            value={filterRole}
            label="Rôle"
            onChange={(e) => {
              setFilterRole(e.target.value);
              setPage(0);
            }}
          >
            <MenuItem value="">Tous</MenuItem>
            <MenuItem value="agent">Agent</MenuItem>
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="distributeur">Distributeur</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Solde min"
          variant="outlined"
          size="small"
          type="number"
          value={minSolde}
          onChange={(e) => {
            setMinSolde(e.target.value);
            setPage(0);
          }}
        />
        <TextField
          label="Solde max"
          variant="outlined"
          size="small"
          type="number"
          value={maxSolde}
          onChange={(e) => {
            setMaxSolde(e.target.value);
            setPage(0);
          }}
        />
      </Box>

      {/* Actions */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
          Ajouter
        </Button>
        <Box>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() =>
              openConfirmModal(
                `Voulez-vous supprimer ${selectedIds.size} utilisateur(s) ?`,
                () => handleDelete(Array.from(selectedIds))
              )
            }
            disabled={selectedIds.size === 0}
            sx={{ mr: 1 }}
          >
            Supprimer ({selectedIds.size})
          </Button>
          <Button
            variant="outlined"
            color="warning"
            onClick={() =>
              openConfirmModal(
                `Voulez-vous bloquer ${selectedIds.size} utilisateur(s) ?`,
                () => handleBlock(true)
              )
            }
            disabled={selectedIds.size === 0}
            sx={{ mr: 1 }}
          >
            Bloquer
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={() =>
              openConfirmModal(
                `Voulez-vous débloquer ${selectedIds.size} utilisateur(s) ?`,
                () => handleBlock(false)
              )
            }
            disabled={selectedIds.size === 0}
          >
            Débloquer
          </Button>
        </Box>
      </Box>

      {/* Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                checked={allVisibleSelected}
                onChange={(e) => toggleSelectAll(e.target.checked, visibleRows)}
              />
            </TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Prénom</TableCell>
            <TableCell>Solde</TableCell>
            <TableCell>Numéro Compte</TableCell>
            <TableCell>Nin ou Passport</TableCell>
            <TableCell>Adresse</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Statut</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visibleRows.map((item, idx) => (
            <TableRow key={item._id} sx={{ bgcolor: item.block ? "#fdd" : "inherit" }}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedIds.has(item._id)}
                  onChange={() => toggleSelect(item._id)}
                />
              </TableCell>
              <TableCell>{item.nom || "-"}</TableCell>
              <TableCell>{item.prenom || "-"}</TableCell>
              <TableCell>{item.compte?.solde?.toFixed(0) || "0.00"} fcfa</TableCell>
              <TableCell>{item.compte?.numeroCompte || "-"}</TableCell>
              <TableCell>{item.nin || item.passport || "-"}</TableCell>
              <TableCell>{item.adresse || "-"}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.role || "-"}</TableCell>
              <TableCell>{item.block ? "Bloqué" : "Actif"}</TableCell>
              <TableCell>
                <Tooltip title="Modifier">
                  <IconButton onClick={() => handleOpenModal(page * rowsPerPage + idx)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Supprimer">
                  <IconButton
                    onClick={() =>
                      openConfirmModal(
                        `Voulez-vous supprimer cet utilisateur ?`,
                        () => handleDelete([item._id])
                      )
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={filteredListe.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
      />

      {/* Modals */}
      <UserModal
        open={openModal}
        onClose={handleCloseModal}
        editIndex={editIndex}
        liste={liste}
        setListe={setListe}
      />

      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>{confirmMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="inherit">
            Annuler
          </Button>
          <Button onClick={handleConfirm} color="error" variant="contained">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
