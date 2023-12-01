const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const errorHandler = require('./middleware/errorHandler'); // Import the error handler middleware

dotenv.config();
const app = express();

// MongoDB connection setup
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Error handling middleware (should be the last middleware)
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
