const Topic = require('../models/topic');

const getAllTopics = async (req, res) => {
    try {
        const topics = await Topic.find();
        res.render('topics', { topics });
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi Máy Chủ Nội Bộ: ' + error.message);
    }
};

const getTopicDetails = async (req, res) => {
    const topicId = req.params.id;

    try {
        const topic = await Topic.findById(topicId);
        if (!topic) {
            return res.status(404).send('Không Tìm Thấy Đề Tài');
        }
        const students = Array.isArray(topic.students) ? topic.students : [topic.students];
        res.render('topics', { topics, students });
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi Máy Chủ Nội Bộ: ' + error.message);
    }
};

const renderNewTopicForm = async (req, res) => {
    res.render('new-topic');
};

const addNewTopic = async (req, res) => {
    try {
        const { teacher, title, note, students } = req.body;

        const newTopic = new Topic({
            teacher,
            title,
            note,
            students
        });

        await newTopic.save();

        res.redirect('/topics');
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi Máy Chủ Nội Bộ: ' + error.message);
    }
};

const registerTopic = async (req, res) => {
    try {
        const { studentName, topicTitle } = req.body;

        const newRegistration = {
            studentName,
            topicTitle,
        };

        res.status(201).json({ message: 'Đăng Ký Đề Tài Thành Công.' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi Máy Chủ Nội Bộ: ' + error.message);
    }
};

const getAllStudentTopics = async (req, res) => {
    try {
        const topics = await Topic.find({});
        res.render('student-dashboard', { topics });
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi Máy Chủ Nội Bộ: ' + error.message);
    }
};

const getStudentTopicDetails = async (req, res) => {
    const topicId = req.params.id;
    try {
        const topic = await Topic.findById(topicId);
        if (!topic) {
            return res.status(404).send('Không Tìm Thấy Đề Tài');
        }
        res.render('student_topic_details', { topic });
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi Máy Chủ Nội Bộ: ' + error.message);
    }
};

const deleteTopic = async (req, res) => {
    const topicId = req.params.id;
    try {
        await Topic.findByIdAndDelete(topicId);
        res.redirect('/topics');
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi Máy Chủ Nội Bộ: ' + error.message);
    }
};

const renderEditTopicForm = async (req, res) => {
    const topicId = req.params.id;
    try {
        const topic = await Topic.findById(topicId);
        if (!topic) {
            return res.status(404).send('Không Tìm Thấy Đề Tài');
        }
        res.render('edit-topic', { topic, success: req.query.success });
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi Máy Chủ Nội Bộ: ' + error.message);
    }
};

const editTopic = async (req, res) => {
    const topicId = req.params.id;
    try {
        const updatedTopicData = {
            teacher: req.body.teacher,
            title: req.body.title,
            note: req.body.note,
            students: req.body.students
        };

        await Topic.findByIdAndUpdate(topicId, updatedTopicData);
        res.redirect(`/topics?success=1`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi Máy Chủ Nội Bộ: ' + error.message);
    }
};

module.exports = {
    getAllTopics,
    getTopicDetails,
    renderNewTopicForm,
    addNewTopic,
    registerTopic,
    getAllStudentTopics,
    getStudentTopicDetails,
    deleteTopic,
    renderEditTopicForm,
    editTopic
};
