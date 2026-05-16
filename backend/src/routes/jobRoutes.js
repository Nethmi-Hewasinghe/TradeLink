const express = require('express');
const router = express.Router();
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJobStatus,
  deleteJob,
} = require('../controllers/jobController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getAllJobs);
router.get('/:id', getJobById);

// Protected routes (require authentication)
router.post('/', protect, createJob);
router.patch('/:id', protect, updateJobStatus);
router.delete('/:id', protect, deleteJob);

module.exports = router;
