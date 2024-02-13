// controllers/authController.js
const User = require('../models/user');

const authController = {
    login: async (req, res) => {
      try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (user) {
          // Check user type (you may have a field in your user model to identify teacher/student)
          if (user.usertype === 'teacher') {
            // Redirect to manageTopics page for teachers
            return res.redirect('/topics');
          } else {
            // Redirect to some other page for students
            return res.redirect('/student-dashboard');
          }
        } else {
          res.status(401).json({ error: 'Thông tin đăng nhập không hợp lệ.' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Đăng nhập thất bại' });
      }
    },

  register: async (req, res) => {
    try {
      const { usertype, username, password, email } = req.body;

      // Kiểm tra xem tài khoản đã tồn tại chưa
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Tài khoản đã tồn tại' });
      }

      // Tạo mới người dùng
      const newUser = new User({ usertype, username, password, email });
      await newUser.save();

      res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi server' });
    }
  },
};

module.exports = authController;
