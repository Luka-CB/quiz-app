import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { QuizProvider } from './context/quizContext'

ReactDOM.render(
  <QuizProvider>
    <App />
  </QuizProvider>,
  document.getElementById('root')
)
