// authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const topicRoutes = require('./topicRoutes');
const Topic = require('../models/topic');
const studentDashboardRoute = require('./studentDashboardRoutes'); // Import studentDashboardRoute

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', authController.login);

router.get('/register/user', (req, res) => {
  res.render('register');
});
// Định nghĩa route GET /topics để lấy danh sách các đề tài
router.get('/topics', async (req, res) => {
  try {
    const topics = await Topic.find();
    res.render('topics', { topics: topics });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
// Sử dụng route từ thư mục topicRoutes để quản lý đề tài
router.use('/topics', topicRoutes);
// Sử dụng route từ thư mục studentDashboardRoute để quản lý dashboard của sinh viên
router.use('/student-dashboard', studentDashboardRoute); // Sử dụng route studentDashboardRoute với đường dẫn /student-dashboard
  
module.exports = router;
