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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UserModal from "./UserModal";
import { deleteUsers } from "./api/api_deleteuser"; // ton endpoint suppression

export default function UserTable({ liste, setListe }) {
  const [openModal, setOpenModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const [selectedIds, setSelectedIds] = useState(new Set());

  const handleOpenModal = (index = null) => {
    setEditIndex(index);
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);

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

  const handleDelete = async (ids) => {
    if (!ids.length) return;
    if (!window.confirm(`Voulez-vous supprimer ${ids.length} utilisateur(s) ?`)) return;

    try {
      await deleteUsers(ids); // appel API
      setListe((prev) => prev.filter((u) => !ids.includes(u._id)));
      const next = new Set(selectedIds);
      ids.forEach((id) => next.delete(id));
      setSelectedIds(next);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression");
    }
  };

  const visibleRows = liste.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const allVisibleSelected = visibleRows.every((r) => selectedIds.has(r._id));

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
          Ajouter
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => handleDelete(Array.from(selectedIds))}
          disabled={selectedIds.size === 0}
        >
          Supprimer sélection ({selectedIds.size})
        </Button>
      </Box>

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
            <TableCell>Numéro Compte</TableCell>
            <TableCell>Nin ou Passport</TableCell>
            <TableCell>Adresse</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visibleRows.map((item, idx) => (
            <TableRow key={item._id}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedIds.has(item._id)}
                  onChange={() => toggleSelect(item._id)}
                />
              </TableCell>
              <TableCell>{item.nom || "-"}</TableCell>
              <TableCell>{item.prenom || "-"}</TableCell>
              <TableCell>{item.compte?.numeroCompte || "-"}</TableCell>
              <TableCell>{item.nin || item.passport || "-"}</TableCell>
              <TableCell>{item.adresse || "-"}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.role || "-"}</TableCell>
              <TableCell>
                <Tooltip title="Modifier">
                  <IconButton onClick={() => handleOpenModal(page * rowsPerPage + idx)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Supprimer">
                  <IconButton onClick={() => handleDelete([item._id])}>
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
        count={liste.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
      />

      <UserModal open={openModal} onClose={handleCloseModal} editIndex={editIndex} liste={liste} setListe={setListe} />
    </Box>
  );
}
