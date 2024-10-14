const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const taskRoutes = require('./routes/taskRoutes');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('uploads'));

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to MongoDB');
});

// Routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
