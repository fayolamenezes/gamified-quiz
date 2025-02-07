import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuizData } from './api';
import './QuizPage.css';

const QuizPage = () => {
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(25);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#f0f4f8');
  const [isSpeechPlaying, setIsSpeechPlaying] = useState(false); // Track speech status
  const navigate = useNavigate();

  const correctSound = new Audio('/assets/correct_answer.mp3');
  const incorrectSound = new Audio('/assets/wrong_answer.mp3');

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const data = await fetchQuizData();
        console.log('Fetched Data:', data);

        if (Array.isArray(data)) {
          setQuizData({ questions: data });
        } else if (data && data.questions) {
          const shuffledQuestions = shuffleArray(data.questions).map(question => ({
            ...question,
            options: shuffleArray(question.options),
          }));
          setQuizData({ questions: shuffledQuestions });
        } else {
          console.error('Invalid quiz data format:', data);
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    loadQuizData();
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  useEffect(() => {
    if (quizData) {
      const question = quizData.questions[currentQuestionIndex];
      setCorrectAnswer(question?.options.find(option => option.is_correct)?.description);
      setShowCorrectAnswer(false);
      setIsAnswerRevealed(false);
    }
  }, [quizData, currentQuestionIndex]);

  useEffect(() => {
    if (timeLeft === 0 && isSpeechPlaying) {
      window.speechSynthesis.cancel(); // Stop speech when the timer ends
      setIsSpeechPlaying(false);
    }
  }, [timeLeft]);

  if (!quizData) {
    return (
      <div className="loading-state">
        <div className="loader"></div>
        <p>Loading quiz data...</p>
      </div>
    );
  }

  const questions = quizData.questions || [];
  if (questions.length === 0) return <div>No questions available</div>;

  const question = questions[currentQuestionIndex];
  if (!question || !question.options) return <div>No valid question available</div>;

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer ? answer.description : null);
    setShowCorrectAnswer(false);
    setIsAnswerRevealed(false);
  };

  const handleNextQuestion = () => {
    // Stop speech when moving to the next question
    window.speechSynthesis.cancel();
    setIsSpeechPlaying(false); // Reset the speech playing state

    if (!answeredQuestions.includes(currentQuestionIndex)) {
      setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
      if (selectedAnswer === correctAnswer) {
        setScore(prevScore => prevScore + 1);
        correctSound.play();
        setBackgroundColor('rgba(0, 255, 0, 0.6)'); // Green with 60% opacity for correct answer
      } else {
        incorrectSound.play();
        setBackgroundColor('rgba(255, 0, 0, 0.6)'); // Red with 60% opacity for wrong answer
      }
    }

    setShowCorrectAnswer(true);
    setIsAnswerRevealed(true);

    setTimeout(() => {
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setSelectedAnswer(null);
        setTimeLeft(25); // Reset the timer
        setBackgroundColor('#f0f4f8'); // Reset background to default after transition
      } else {
        navigate('/results', { state: { score, total: questions.length } });
      }
    }, 1000); // Give time to show background color change
  };

  const handleSkipQuestion = () => {
    // Stop speech when skipping the question
    window.speechSynthesis.cancel();
    setIsSpeechPlaying(false); // Reset the speech playing state

    setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setSelectedAnswer(null);
    setTimeLeft(25); // Reset the timer
    setBackgroundColor('#f0f4f8'); // Reset background when skipping question
  };

  const handleTextToSpeech = () => {
    if (isSpeechPlaying) {
      // If speech is playing, stop it
      window.speechSynthesis.cancel();
      setIsSpeechPlaying(false);
    } else {
      // Otherwise, start speaking
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = `${question.description}. ${question.options.map(option => option.description).join(', ')}`;
      window.speechSynthesis.speak(utterance);

      utterance.onend = () => {
        setIsSpeechPlaying(false); // Set to false when the speech ends
      };

      setIsSpeechPlaying(true);
    }
  };

  return (
    <div className="quiz-page" style={{ backgroundColor: backgroundColor, transition: 'background-color 1s ease' }}>
      <h2>{question.description || 'No question available'}</h2>
      <div className="timer">Time Left: {timeLeft}s</div>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }} />
      </div>

      {question.options.length > 0 ? (
        question.options.map((option, index) => (
          <button
            key={index}
            className={`answer-button ${selectedAnswer === option.description ? 'selected' : ''} ${showCorrectAnswer && correctAnswer === option.description ? 'correct' : ''}`}
            onClick={() => handleAnswerClick(option)}
            disabled={answeredQuestions.includes(currentQuestionIndex)}
          >
            {option.description || 'No option available'}
          </button>
        ))
      ) : (
        <div>No options available for this question.</div>
      )}

      {isAnswerRevealed && showCorrectAnswer && (
        <div className="correct-answer-message">
          <p>The correct answer is: {correctAnswer}</p>
        </div>
      )}

      <div className="score-section">
        <p>Score: {score}</p>
        <button className="next-button" onClick={handleNextQuestion}>
          {currentQuestionIndex + 1 === questions.length ? 'Finish Quiz' : 'Next'}
        </button>

        {currentQuestionIndex + 1 < questions.length && (
          <button className="skip-button" onClick={handleSkipQuestion}>
            Skip
          </button>
        )}
      </div>

      {/* Text to Speech Button */}
      <button className="text-to-speech-button" onClick={handleTextToSpeech}>
        {isSpeechPlaying ? 'Stop Reading' : 'Read Question and Options'}
      </button>
    </div>
  );
};

export default QuizPage;
