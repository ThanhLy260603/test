const express = require('express');
const router = express.Router();
const studentDashboardController = require('../controllers/studentDashboardController');

// Đúng: Cung cấp hàm callback cho route GET
router.get('/', studentDashboardController.getDashboard);
router.post('/:id/register', studentDashboardController.registerToTopic);

module.exports = router;
