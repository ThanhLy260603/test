const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  teacher: { type: String, required: true },
  title: { type: String, required: true },
  note: String,
  students: [{ type: String, lowercase: true }], // Chuẩn hóa tên sinh viên thành chữ thường trước khi lưu
  isLocked: { type: Boolean, default: false }
});


const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
