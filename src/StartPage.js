import React from 'react';
import { Link } from 'react-router-dom';

const StartPage = () => {
  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Welcome to the Gamified Quiz!</h1>
      <p style={styles.subHeading}>Get ready to test your knowledge and challenge yourself!</p>
      <div style={styles.buttonContainer}>
        <Link to="/quiz">
          <button style={styles.startButton}>Start Quiz</button>
        </Link>
      </div>
      <div style={styles.footer}>
        <p style={styles.footerText}>Are you ready to level up your knowledge?</p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    textAlign: 'center',
    marginTop: '50px',
    padding: '50px 30px',
    borderRadius: '15px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(to right, #5e92f3, #76c7f2)',
    minHeight: '50vh',
  },
  heading: {
    fontSize: '50px',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '20px',
    fontFamily: "'Montserrat', sans-serif",
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
  },
  subHeading: {
    fontSize: '30px',
    color: '#fff',
    fontWeight: '400',
    marginBottom: '30px',
    fontFamily: "'Roboto', sans-serif",
    textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)',
  },
  buttonContainer: {
    marginTop: '30px',
  },
  startButton: {
    padding: '15px 40px',
    fontSize: '25px',
    backgroundColor: '#4a78c7',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s, box-shadow 0.3s, color 0.3s',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    fontWeight: '600',
  },
  footer: {
    marginTop: '40px',
    fontFamily: "'Poppins', sans-serif",
    color: '#fff',
    fontSize: '18px',
    textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)',
  },
  footerText: {
    fontSize: '18px',
    color: '#fff',
    fontWeight: '500',
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
  },
  // Media Queries for Responsiveness
  '@media (max-width: 768px)': {
    page: {
      padding: '30px 20px',
      minHeight: '60vh',
    },
    heading: {
      fontSize: '35px',
      marginBottom: '15px',
    },
    subHeading: {
      fontSize: '22px',
      marginBottom: '20px',
    },
    startButton: {
      padding: '12px 30px',
      fontSize: '20px',
    },
    footerText: {
      fontSize: '16px',
    },
  },
  '@media (max-width: 480px)': {
    heading: {
      fontSize: '28px',
      marginBottom: '10px',
    },
    subHeading: {
      fontSize: '18px',
      marginBottom: '15px',
    },
    startButton: {
      padding: '10px 25px',
      fontSize: '18px',
    },
    footerText: {
      fontSize: '14px',
    },
  },
};

export default StartPage;
