// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const topicRouter = require('./routes/topicRoutes');
const studentDashboardRoutes = require('./routes/studentDashboardRoutes'); 
const app = express();
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/doan_csn', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB kết nối thành công');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB lỗi kết nối', err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views'));
app.set('views', './views');
app.set('view engine', 'ejs');
// Serve static files from the 'views/images' directory
app.use('/images', express.static(__dirname + '/views/images'));

// Sử dụng route từ thư mục routes
app.use('/', authRoutes);
app.use('/topics', topicRouter);
app.use('/student-dashboard', studentDashboardRoutes); // Use studentDashboardRoutes

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
