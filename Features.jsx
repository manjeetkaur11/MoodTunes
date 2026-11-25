import React from 'react';
import '../style/Features.css'; // optional: for styling

const Features = () => {
  return (
    <div className="features-page">
      <h1 className="features-title">🎧 MoodTunes Features</h1>
      <p className="features-subtitle">Explore how MoodTunes helps enhance your mood, focus, and productivity</p>

      <div className="features-list">

        <div className="feature-box">
          <h3>🎵 Mood-Based Music Recommendations</h3>
          <p>Select or detect your mood and instantly get personalized Spotify playlists to uplift or match your emotions.</p>
        </div>

        <div className="feature-box">
          <h3>📚 Mood History Tracking</h3>
          <p>Automatically tracks your daily moods with timestamps so you can reflect on your emotional well-being over time.</p>
        </div>

        <div className="feature-box">
          <h3>✅ To-Do List Manager</h3>
          <p>Plan your tasks, mark them as done, and stay productive with a simple, easy-to-use task manager synced to your account.</p>
        </div>

        <div className="feature-box">
          <h3>🍅 Pomodoro Timer</h3>
          <p>Boost your focus using the Pomodoro technique. Work in focused sprints with automatic session tracking.</p>
        </div>

        <div className="feature-box">
          <h3>🌿 Ambient Soundscapes</h3>
          <p>Play calming background sounds like rain, forest, or café to stay relaxed and maintain a peaceful workspace.</p>
        </div>

        <div className="feature-box">
          <h3>📝 Mood-Based Blog (Coming Soon)</h3>
          <p>Write and share mood-based blog entries to reflect on your day, your progress, or your personal growth journey.</p>
        </div>

        <div className="feature-box">
          <h3>🔒 Secure Account System</h3>
          <p>Sign up and log in securely using your email. Your moods, tasks, and preferences are stored privately and safely.</p>
        </div>

      </div>
    </div>
  );
};

export default Features;
