const Topic = require('../models/topic');

const studentDashboardController = {
    getDashboard: async (req, res) => {
        try {
            const topics = await Topic.find();
            res.render('student-dashboard', { topics });
        } catch (err) {
            console.error('Lỗi khi truy xuất đề tài:', err);
            res.status(500).send('Lỗi máy chủ nội bộ');
        }
    },
    registerToTopic: async (req, res) => {
        const { id } = req.params;
        let { studentName } = req.body;
        studentName = studentName.trim().toLowerCase(); // Chuẩn hóa tên sinh viên thành chữ thường
    
        try {
            const topic = await Topic.findById(id);
            if (!topic) {
                return res.status(404).send('Không tìm thấy đề tài');
            }
    
            // Kiểm tra xem đề tài đã bị khóa (có sinh viên đăng kí) hay chưa
            if (topic.isLocked) {
                return res.status(403).send('Đề tài đã bị khóa');
            }
    
            // Kiểm tra xem sinh viên đã đăng ký vào một đề tài khác chưa
            const existingTopic = await Topic.findOne({ students: studentName });
            if (existingTopic) {
                return res.status(403).send('Sinh viên này đã đăng ký đề tài nào đó');
            }
    
            // Thêm sinh viên vào mảng students của đề tài
            topic.students.push(studentName);
    
            // Kiểm tra xem có sinh viên đăng ký vào đề tài hay không
            if (topic.students.length > 0) {
                topic.isLocked = true; // Thiết lập đề tài là bị khóa
            }
    
            await topic.save();
    
            res.redirect('/student-dashboard'); // Sau khi đăng ký thành công, chuyển hướng lại trang student dashboard
        } catch (err) {
            console.error('Lỗi khi đăng ký vào đề tài:', err);
            res.status(500).send('Lỗi máy chủ nội bộ');
        }
    }
    
}    

module.exports = studentDashboardController;
