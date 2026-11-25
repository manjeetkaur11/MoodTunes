import React, { useState, useEffect } from 'react';
import '../style/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Dashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('name');
  const [mood, setMood] = useState('');
  const [message, setMessage] = useState('');
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);

  // 🍅 Pomodoro state
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 mins
  const [isRunning, setIsRunning] = useState(false);

// ☑️ To-Do State
const [tasks, setTasks] = useState([]);
const [newTask, setNewTask] = useState("");

//🎶ambient sounds 
const ambientSounds = {
  rain: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  forest: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  cafe: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
};

const [currentSound, setCurrentSound] = useState(null);
const [audioObj, setAudioObj] = useState(null);

// ✅ Fetch tasks from backend
const fetchTasks = async () => {
  const email = localStorage.getItem('email');
  try {
    const res = await axios.get(`http://localhost:5000/api/tasks?email=${email}`);
    setTasks(res.data);
  } catch (err) {
    console.error("Failed to fetch tasks:", err);
  }
};

// ✅ Add new task
const handleAddTask = async () => {
  const email = localStorage.getItem('email');
  if (newTask.trim() === "") return;
  try {
    const res = await axios.post("http://localhost:5000/api/tasks", {
      email,
      text: newTask
    });
    setTasks([res.data, ...tasks]);
    setNewTask("");
  } catch (err) {
    console.error("Failed to add task:", err);
  }
};

// ✅ Delete task
const handleDeleteTask = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  } catch (err) {
    console.error("Failed to delete task:", err);
  }
};

// ✅ Toggle checkbox
const handleToggleComplete = async (id) => {
  try {
    const res = await axios.put(`http://localhost:5000/api/tasks/${id}/toggle`);
    const updated = tasks.map(task =>
      task._id === id ? { ...task, completed: res.data.completed } : task
    );
    setTasks(updated);
  } catch (err) {
    console.error("Failed to toggle task:", err);
  }
};


  // ⏱️ Pomodoro Timer Logic
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      alert("Pomodoro session completed! 🎉");
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // ⌛ Time Formatter
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

useEffect(() => {
  fetchTasks();
}, []);


 const handleMoodSelect = async (selectedMood) => {
  setMood(selectedMood);
  const email = localStorage.getItem('email');

  try {
    const res = await axios.post('http://localhost:5000/api/mood', {
      mood: selectedMood,
      email
    });

    setMessage(res.data.message);
    setSpotifyUrl(res.data.music);
  } catch (error) {
    console.error('Mood suggestion error:', error);
    setMessage('Something went wrong. Try again.');
  }
};


   const fetchMoodHistory = async () => {

     const email = localStorage.getItem('email'); 
  if (!email) return;

    try {
    const res = await axios.get(`http://localhost:5000/api/mood/history?email=${email}`); // ← Attach email
    setMoodHistory(res.data);
  } catch (error) {
    console.error('Failed to fetch mood history:', error);
  }
};

const handleClearHistory = async () => {
  const email = localStorage.getItem('email');

  try {
    await axios.delete(`http://localhost:5000/api/mood/history?email=${email}`);
    setMoodHistory([]); // Update UI
  } catch (error) {
    console.error('Failed to clear mood history:', error);
  }
};

  useEffect(() => {
    fetchMoodHistory();
  }, []);

  useEffect(() => {
  return () => {
    if (audioObj) {
      audioObj.pause();
      audioObj.currentTime = 0;
    }
  };
}, [audioObj]);

  

const handleAmbientSound = (type) => {
  const soundUrl = ambientSounds[type];

  if (currentSound === type) {
    // Stop if already playing
    audioObj.pause();
    setCurrentSound(null);
  } else {
    if (audioObj) audioObj.pause(); // Stop previous sound

    const newAudio = new Audio(soundUrl);
    newAudio.loop = true;
    newAudio.play();
    setAudioObj(newAudio);
    setCurrentSound(type);
  }
};

const handleLogout = () => {
  localStorage.removeItem('email');
  navigate('/login'); // Or '/' if your login route is at root
};


  return (
    <div className="dashboard">
      <header className="dashboard-header">
  <h1>Welcome back, {userName || "User"} 👋</h1>
  <p>Your personalized MoodTunes dashboard</p>
</header>

      <section className="mood-summary">
        <h2 className="mood-tag">Today's Mood: {mood ? mood.charAt(0).toUpperCase() + mood.slice(1) : 'None'} </h2>
        <div className="mood-buttons">
         <button onClick={() => handleMoodSelect('happy')}>😊 Happy</button>
        <button onClick={() => handleMoodSelect('relaxed')}>😌 Relaxed</button>
        <button onClick={() => handleMoodSelect('focused')}>🎯 Focused</button>
        <button onClick={() => handleMoodSelect('sad')}>😢 Sad</button>
        </div>
      </section>

      {message && (
        <div className="mood-message">
          <p>{message}</p>
        </div>
      )}

       {spotifyUrl && (
        <div className="spotify-player">
          <iframe
            src={spotifyUrl}
            width="100%"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Recommendation"
          ></iframe>
        </div>
      )}

      <section className="music-player">
        <h2>Recommended Music</h2>
        <iframe
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DX3PFzdbtx1Us"
          width="100%"
          height="80"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
          title="Spotify Playlist"
        ></iframe>
      </section>

        {/* Mood History Section */}
    

      <div className="mood-history">
  <h3>Mood History</h3>
  <button onClick={handleClearHistory}>🗑️clear</button>
  {moodHistory.length > 0 ? (
    <ul>
      {moodHistory.map((entry) => (
        <li key={entry._id}>
          {entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)} – {new Date(entry.timestamp).toLocaleString()}
        </li>
      ))}
    </ul>
  ) : (
    <p>No mood history yet.</p>
  )}
</div>

<section className="productivity-tools">
  <div className="tool">
    <h3>Pomodoro Timer</h3>
    <p>{formatTime(timeLeft)}</p>
    <button onClick={() => setIsRunning(true)}>Start</button>
    <button onClick={() => setIsRunning(false)}>Pause</button>
    <button onClick={() => {
      setIsRunning(false);
      setTimeLeft(25 * 60);
    }}>Reset</button>
  </div>

 <div className="tool">
  <h3>To-Do List</h3>

  <div className="todo-input">
    <input
      type="text"
      placeholder="Add a task..."
      value={newTask}
      onChange={(e) => setNewTask(e.target.value)}
    />
    <button className="add-btn" onClick={handleAddTask}>➕</button>
  </div>

  <ul className="todo-list">
    {tasks.map((task) => (
      <li key={task._id} className={`todo-item ${task.completed ? "done" : ""}`}>
        <label>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => handleToggleComplete(task._id)}
          />
          {task.text}
        </label>
        <button className="delete-btn" onClick={() => handleDeleteTask(task._id)}>🗑️</button>
      </li>
    ))}
  </ul>
</div>

<div className="tool">
  <h3>Ambient Sounds</h3>
  <button
    className={currentSound === "rain" ? "active" : ""}
    onClick={() => handleAmbientSound("rain")}
  >
    Rain 🌧️
  </button>
  <button
    className={currentSound === "forest" ? "active" : ""}
    onClick={() => handleAmbientSound("forest")}
  >
    Forest 🌲
  </button>
  <button
    className={currentSound === "cafe" ? "active" : ""}
    onClick={() => handleAmbientSound("cafe")}
  >
    Café ☕
  </button>
</div>

      </section>

      <section className="quote-box">
        <blockquote>
          "The best way to get started is to quit talking and begin doing."
        </blockquote>
        <p>– Walt Disney</p>
      </section>

      <footer className="dashboard-footer">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </footer>
    </div>
  );
};

export default Dashboard;
