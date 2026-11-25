const MoodHistory = require('../models/MoodHistory');

const suggestMusic = async (req, res) => {
  const { mood, email } = req.body;

  if (!mood || !email) {
    return res.status(400).json({ message: 'Mood and email are required' });
  }

  try {
    // ✅ Save mood with email
    const newMood = new MoodHistory({ mood, email });
    await newMood.save();

    const musicMap = {
      happy: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7aLTmlC',
      relaxed: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWU0ScTcjJBdj',
      focused: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX8Uebhn9wzrS',
      sad: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX7qK8ma5wgG1'
    };

    res.status(200).json({
      message: `Enjoy your day with ${mood} vibes! 🎉`,
      music: musicMap[mood] || ''
    });
  } catch (err) {
    console.error('Error suggesting music:', err);
    res.status(500).json({ message: 'Failed to fetch music suggestion' });
  }
};



// Get user's mood history
const getMoodHistory = async (req, res) => {
  const { email } = req.query;

  try {
    const moods = await MoodHistory.find({ email }).sort({ timestamp: -1 }).limit(10);
    res.status(200).json(moods);
  } catch (error) {
    console.error('Mood history fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch mood history' });
  }
};

// Clear mood history for a user
const deleteMoodHistory = async (req, res) => {
  const { email } = req.query;

  try {
    await MoodHistory.deleteMany({ email });
    res.status(200).json({ message: 'Mood history cleared successfully' });
  } catch (error) {
    console.error('Mood history deletion error:', error);
    res.status(500).json({ message: 'Failed to clear mood history' });
  }
};


module.exports = {
  suggestMusic,
  getMoodHistory,
  deleteMoodHistory
};

