const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Fail to connect MongoDB:', error);
});

// Song schema
const songSchema = new mongoose.Schema({
  songName: { type: String, required: true },
  singer: { type: String, required: true },
  songURL: { type: String, required: false },
  creator: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: { type: [String], default: [] },
});

// User schema
const userSchema = new mongoose.Schema({
  userid: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  likes: { type: [String], default: [] },
});

const Song = mongoose.model('Song', songSchema);
const User = mongoose.model('User', userSchema);

// Register
app.post('/api/register', async (req, res) => {
  const { userid, username, password } = req.body;
  try {
    const user = new User({ userid, username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// View all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}, 'username'); 
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

app.post('/api/likeUser', async (req, res) => {
  const { user, username } = req.body;
  try {
    const likedUser = await User.findOne({ username });
    const currentUser = await User.findOne({ username: user });
    
    if (!likedUser || !currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!likedUser.likes) {
      likedUser.likes = [];
    }

    const isLiked = likedUser.likes.includes(user);
    if (isLiked) {
      likedUser.likes = likedUser.likes.filter(u => u !== user);
    } else {
      likedUser.likes.push(user);
    }

    await likedUser.save();
    res.json(likedUser);
  } catch (error) {
    console.error('Error liking user:', error);
    res.status(500).json({ error: 'Error liking user' });
  }
});

app.get('/api/userLikes/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.likes || []);
  } catch (error) {
    console.error('Error fetching user likes:', error);
    res.status(500).json({ error: 'Error fetching user likes' });
  }
});

// View all songs
app.get('/api/songList', async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).json({ error: 'Error fetching songs' });
  }
});

// View all songs by creator
app.get('/api/songListByCreator', async (req, res) => {
  const { creator } = req.query;
  try {
    const songs = await Song.find({ creator });
    res.json(songs);
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).json({ error: 'Error fetching songs' });
  }
});

// Add a song
app.post('/api/addSong', async (req, res) => {
  const { songName, singer, songURL, creator } = req.body;
  const song = new Song({ songName, singer, songURL, creator });
  try {
    await song.save();
    res.json(song);
  } catch (error) {
    console.error('Error adding song:', error);
    res.status(500).json({ error: 'Error adding song' });
  }
});

// Delete a song
app.delete('/api/deleteSong/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedSong = await Song.findByIdAndDelete(id);
    if (!deletedSong) {
      return res.status(404).json({ error: 'Song not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting song:', error);
    res.status(500).json({ error: 'Error deleting song' });
  }
});

// Edit a song
app.put('/api/editSong/:id', async (req, res) => {
  const id = req.params.id;
  const { songName, singer, songURL } = req.body;
  try {
    const updatedSong = await Song.findByIdAndUpdate(
      id,
      { songName, singer, songURL },
      { new: true, runValidators: true }
    );
    if (!updatedSong) {
      return res.status(404).json({ error: 'Song not found' });
    }
    res.json(updatedSong);
  } catch (error) {
    console.error('Error updating song:', error);
    res.status(500).json({ error: 'Error updating song' });
  }
});

// Fetch a single song by ID
app.get('/api/songList/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const song = await Song.findById(id);
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
    res.json(song);
  } catch (error) {
    console.error('Error fetching song:', error);
    res.status(500).json({ error: 'Error fetching song' });
  }
});

// Like a song
app.post('/api/likeSong/:id', async (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  try {
    const song = await Song.findById(id);
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
    if (!song.likes) {
      song.likes = [];
    }
    if (!song.likes.includes(user)) {
      song.likes.push(user);
    }
    await song.save();
    res.json(song);
  } catch (error) {
    console.error('Error liking song:', error);
    res.status(500).json({ error: 'Error liking song' });
  }
});

// View all songs for search
app.get('/api/search', async (req, res) => {
  const { search } = req.query;
  try {
    let songs;
    if (search) {
      songs = await Song.find({
        $or: [
          { songName: { $regex: search, $options: 'i' } },
          { singer: { $regex: search, $options: 'i' } },
        ],
      });
    } else {
      songs = await Song.find();
    }
    res.json(songs);
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).json({ error: 'Error fetching songs' });
  }
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});