import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Question from './components/Question';
import Results from './components/Results';
import UserForm from './components/UserForm';
import UserProvider from './components/UserContext';

import questions from './assets/question.js';
import elements from './assets/elements.js';
import keywords from './assets/keywords.js';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState('')
  const [UserName, setUserName] = useState('')
  const [element, setElement] = useState('')
  const [artwork, fetchArtwork] = useState(null)

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  
  function handleUserFormSubmit(name) {
    setUserName(name);
  };
  
  function determineElement(answers) {
    const counts = {};
    answers.forEach(function(answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function(a, b) {
      return counts[a] > counts[b] ? a : b
    });
  };

  useEffect(
    function () {
      if (currentQuestionIndex === questions.length) {
        const selectedElement = determineElement(answers);
        setElement(selectedElement);
        fetchArtwork(keywords[selectedElement]);
      }
    },
    [currentQuestionIndex]
  );

  return (
  <Router basename={path}>
    <Header />
    <Routes>
      <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
      <Route
        path="/quiz"
        element={
        currentQuestionIndex < questions.length ? (
        <Question question={questions[currentQuestionIndex].question} options={questions[currentQuestionIndex].options} onAnswer={handleAnswer} />
        ) : (
        <Results element={element} artwork={artwork} />
      )
      }
      />
    </Routes>
  </Router>
  );
}

export default App
