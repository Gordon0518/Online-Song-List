const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


//mongoDB connection
const mongoURI = 'mongodb+srv://gordon0518:333555@songlist.gjq1b.mongodb.net/songlist?retryWrites=true&w=majority&appName=SongList';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Fail to connect MongoDB:', error);
});

//song schema
const songSchema = new mongoose.Schema({
  songName: {type: String, required: true},
  singer: {type: String, required: true},
  songURL: {type: String , required: false},
});

const Song = mongoose.model('Song', songSchema);

//user schema
const userSchema = new mongoose.Schema({
  userid: {type: String, required: true, unique:true},
  username: {type: String, required: true, unique:true},
  password: {type: String, required: true},
});

const User = mongoose.model('User', userSchema);



//register
app.post('/api/register', async(req, res) => {
  const{userid, username, password} = req.body;
  try{
    const user = new User({userid, username, password});
    await user.save();
    res.status(201).json({message: 'User registered successfully'});
  }catch(error){
    console.error('Error registering user:', error);
    res.status(500).json({error: 'Error registering user'});
  }
});

//login
app.post('/api/login', async(req, res) => {
  const{userid, password} = req.body;
  try{
    const user = await User.findOne({userid, password});
    if(user){
      res.json({message: 'Login successful'});
    }
    else{
      res.status(401).json({error: 'Invalid username or password'});
    }
  }catch(error){
    console.error('Error logging in:', error);
    res.status(500).json({error: 'Error logging in'});
  }
});



//view all songs
app.get('/api/songList', async(req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        console.error('Error fetching songs:', error);
        res.status(500).json({error: 'Error fetching songs'});   
    } 
});



//add a song
app.post('/api/addSong', async(req, res) => {
    const songName = req.body.songName;
    const singer = req.body.singer;
    const songURL = req.body.songURL;
    const song = new Song({songName, singer, songURL});
    try {
        await song.save();
        res.json(song);
    } catch (error) {
        console.error('Error adding song:', error);
        res.status(500).json({error: 'Error adding song'});
    }
});

//delete a song
app.delete('/api/deleteSong/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const deletedSong = await Song.findByIdAndDelete(id);
        if (!deletedSong) {
          return res.status(404).json({ error: 'Song not found' }); 
        }
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting song:', error);
        res.status(500).json({error: 'Error deleting song'});
    }
});

//edit a song
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


// fetch a single song by ID
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


app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
