import { createContext, useState } from 'react'

export const QuizContext = createContext()

export const QuizProvider = ({ children }) => {
  const [triviaData, setTriviaData] = useState(null)
  const [error, setError] = useState(null)

  const getTrivia = async (category, difficulty) => {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`
    )

    const data = await res.json()

    if (!res.ok) setError(data)

    setTriviaData(data)
  }

  return (
    <QuizContext.Provider value={{ getTrivia, triviaData, error }}>
      {children}
    </QuizContext.Provider>
  )
}
