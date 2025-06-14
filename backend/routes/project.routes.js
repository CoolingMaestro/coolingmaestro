import express from 'express';
import { 
  saveProject,
  getProjects,
  getProjectById,
  deleteProject 
} from '../controllers/project.controller.js';

const router = express.Router();

// Proje kaydet
router.post('/', saveProject);

// Tüm projeleri getir
router.get('/', getProjects);

// Belirli bir projeyi getir
router.get('/:id', getProjectById);

// Projeyi sil
router.delete('/:id', deleteProject);

export default router;