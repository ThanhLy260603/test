// topicRoutes.js

const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');

// Các route khác
router.get('/topics', topicController.getAllTopics);
router.get('/new', topicController.renderNewTopicForm);
router.post('/', topicController.addNewTopic);
router.get('/topics/:id', topicController.getTopicDetails);
router.get('/:id/edit', topicController.renderEditTopicForm);
router.post('/:id/delete', topicController.deleteTopic);
// Xác định tuyến đường POST để chỉnh sửa đề tài
router.post('/:id/edit', topicController.editTopic);
module.exports = router;
