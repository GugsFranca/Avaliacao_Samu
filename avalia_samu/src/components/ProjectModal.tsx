// src/components/ProjectModal.tsx
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from '@mui/material';
import { useProjects } from '../context/ProjectContext';
import styles from "./styles/Modal.module.css"


export default function ProjectModal({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [projectName, setProjectName] = useState('');
  const [month, setMonth] = useState('');
  const { projects, actions: { createProject } } = useProjects();

  const handleSubmit = () => {
    if (projectName && month) {
      const exists = projects.some(p => p.name.toLowerCase() === projectName.toLowerCase());
      if (exists) {
        alert('Já existe um projeto com esse nome!');
        return;
      }

      createProject({
        name: projectName,
        month: month,
        parameters: {
          removidos: 0,
          pontosRemovidos: 0,
          tempoRegulacao: 0,
          pausasMensal: 0,
          tempoSaidaVTR: 0,
          tempoRegulacaoFrota: 0,
          tempoRegulacaoMedica: 0,
          tempoRegulacaoLider: 0
        },
      });
      onClose();
      setProjectName('');
      setMonth('');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Criar Novo Projeto</DialogTitle>
      <DialogContent className={styles.modalContent}>
        <TextField
          autoFocus
          margin="dense"
          label="Nome do Projeto"
          fullWidth
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label="Mês/Período"
          fullWidth
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          placeholder="Ex: Janeiro 2024"
        />
      </DialogContent>
      <DialogActions className={styles.modalActions}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!projectName || !month}
        >
          Criar Projeto
        </Button>
      </DialogActions>
    </Dialog>
  );
}