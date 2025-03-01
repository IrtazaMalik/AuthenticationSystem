const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://i211721:P9uDZdfYmjgJ1cBA@infosec-system-authenti.xyzri.mongodb.net/twitter_clone?retryWrites=true&w=majority&appName=infosec-system-authentication', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));


// Import routes
const authRoutes = require('./routes/auth');
// const tweetRoutes = require('./routes/tweets');
// const userRoutes = require('./routes/users');

// Use routes
app.use('/api/auth', authRoutes);
// app.use('/api/tweets', tweetRoutes);
// app.use('/api/users', userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
