// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { fetchQuizData } from './api';
import StartPage from './StartPage';
import QuizPage from './QuizPage';
import ResultsPage from './ResultsPage';

const App = () => {
  const [quizData, setQuizData] = useState(null); // Holds quiz data or null on error
  const [isLoading, setIsLoading] = useState(true); // Tracks loading state
  const [hasError, setHasError] = useState(false);  // Tracks error state

  useEffect(() => {
    const getQuizData = async () => {
      setIsLoading(true); // Set loading to true before fetching data
      const data = await fetchQuizData();

      if (data) {
        setQuizData(data); // Set data if it's successfully fetched
      } else {
        setHasError(true); // Set error if data fetching failed
      }
      setIsLoading(false); // Set loading to false after data fetch attempt
    };

    getQuizData();
  }, []);

  if (isLoading) {
    return <div>Loading quiz data...</div>; // Display loading message while data is being fetched
  }

  if (hasError) {
    return <div>There was an error fetching quiz data. Please try again later.</div>; // Display error message if there's an error
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route
          path="/quiz"
          element={<QuizPage quizData={quizData} />}
        />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
