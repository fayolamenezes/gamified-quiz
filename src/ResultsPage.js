import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const ResultsPage = () => {
  const { state } = useLocation();
  const { score, total } = state || { score: 0, total: 0 };

  // Calculate percentage score
  const percentage = ((score / total) * 100).toFixed(2);

  // Determine the performance message based on the score
  const performanceMessage = score === total
    ? "Awesome! Perfect Score!"
    : score / total >= 0.7
    ? "Great job! You're doing amazing!"
    : "Good effort! Keep going, you'll do better next time!";

  const [fade, setFade] = useState(false);

  // Play the completion sound when the results page is loaded
  useEffect(() => {
    const completionSound = new Audio('/assets/quiz_complete.mp3');
    completionSound.play();

    // Trigger the fade effect
    setFade(true);

    // Fade out effect after a short delay
    const timer = setTimeout(() => {
      setFade(false);
    }, 5000); // Fade-out after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  // Inject keyframes for the animations when the component mounts
  useEffect(() => {
    const stylesKeyframes = `
      @keyframes fadeInBackground {
        0% { background-color: #f7f8fc; }
        100% { background-color: rgba(255, 215, 0, 0.5); } /* Gold with 50% opacity */
      }

      @keyframes fadeOutBackground {
        0% { background-color: rgba(255, 215, 0, 0.5); } /* Gold with 50% opacity */
        100% { background-color: #f7f8fc; }
      }
    `;
    
    const style = document.createElement('style');
    style.innerHTML = stylesKeyframes;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style); // Clean up the injected styles
    };
  }, []);

  return (
    <div style={{ 
      ...styles.page, 
      animation: fade ? 'fadeInBackground 2s' : 'fadeOutBackground 2s' 
    }}>
      <h2 style={styles.heading}>Quiz Complete!</h2>

      <div style={styles.resultContainer}>
        <p style={styles.score}>Total Questions: <strong>{total}</strong></p>
        <p style={styles.score}>Your Score: <strong>{score}</strong></p>
        <p style={styles.score}>Percentage: <strong>{percentage}%</strong></p>
      </div>

      <p style={styles.performance}>{performanceMessage}</p>

      <Link to="/quiz">
        <button style={styles.retakeButton}>Retake Quiz</button>
      </Link>
    </div>
  );
};

// Inline CSS including animations and media queries for responsiveness
const styles = {
  page: {
    textAlign: 'center',
    marginTop: '50px',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)', /* Subtle shadow */
    maxWidth: '600px',
    margin: '50px auto',
    backgroundColor: '#f7f8fc', /* Initial light background */
  },
  heading: {
    fontSize: '36px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  resultContainer: {
    marginBottom: '30px',
  },
  score: {
    fontSize: '22px',
    color: '#333',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  performance: {
    fontSize: '20px',
    color: '#4CAF50', /* Green for encouraging message */
    marginBottom: '30px',
    fontStyle: 'italic',
  },
  retakeButton: {
    padding: '12px 25px',
    fontSize: '18px',
    backgroundColor: '#5e92f3', /* Soft blue */
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s, box-shadow 0.3s', /* Smooth transition */
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },

  // Media Queries for responsiveness
  '@media (max-width: 768px)': {
    page: {
      padding: '20px', // Reduced padding for smaller screens
      marginTop: '30px',
    },
    heading: {
      fontSize: '28px', // Smaller font size on mobile
    },
    score: {
      fontSize: '18px', // Smaller text for score
    },
    performance: {
      fontSize: '18px', // Slightly smaller performance message
    },
    retakeButton: {
      fontSize: '16px', // Smaller button font
      padding: '10px 20px', // Adjusted padding for button
    },
  },

  '@media (max-width: 480px)': {
    page: {
      padding: '15px', // Further reduced padding on very small screens
      marginTop: '20px',
    },
    heading: {
      fontSize: '24px', // Even smaller font size for very small screens
    },
    score: {
      fontSize: '16px', // Even smaller score text
    },
    performance: {
      fontSize: '16px', // Slightly smaller performance message for very small screens
    },
    retakeButton: {
      fontSize: '14px', // Smaller button font for very small screens
      padding: '8px 15px', // Adjusted padding for very small screens
    },
  },
};

export default ResultsPage;
