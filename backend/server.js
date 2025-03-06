const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

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

const songSchema = new mongoose.Schema({
  songName: {type: String, required: true},
  singer: {type: String, required: true},
  songURL: {type: String , required: false},
});

const Song = mongoose.model('Song', songSchema);



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



app.listen(port, () => {
  console.log(`Server running on http://localhost:${[port]}`);
});

