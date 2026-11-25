import React from 'react';
import '../style/About.css'; // optional: for styling

const About = () => {
  return (
    <div className="about-page">
      <h1 className="about-title">About MoodTunes</h1>
      <p className="about-subtitle">
        Empowering your mind through music and productivity.
      </p>

      <div className="about-content">
        <p>
          MoodTunes is a personalized productivity dashboard that adapts to your emotional state.
          Whether you're feeling happy, sad, focused, or relaxed, our app curates music, tools, and features that support your current mood.
        </p>

        <p>
          Our mission is simple: to boost mental well-being and productivity through a blend of technology, psychology, and music.
          By understanding your emotions, we help you make the most of your day — emotionally and professionally.
        </p>

        <p>
          MoodTunes was created for students, remote workers, creators, and anyone who wants to stay mentally balanced and productive in a fast-paced world.
        </p>

        <p>
          Every feature — from mood detection to ambient sounds, from Pomodoro timers to task tracking — is designed to improve your workflow
          and mental clarity. And we’re just getting started!
        </p>
      </div>

      <div className="about-footer">
        <p>🌟 Thank you for using MoodTunes — your emotional productivity companion.</p>
      </div>
    </div>
  );
};

export default About;
