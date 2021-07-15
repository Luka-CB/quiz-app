import React, { useContext, useEffect, useState } from 'react'
import { QuizContext } from '../context/quizContext'
import '../styles/dashboard.css'

const Dashboard = ({ history }) => {
  const [categoryData, setCategoryData] = useState(null)
  const [categoryValue, setCategoryValue] = useState('')
  const [difficultyLevel, setDifficultyLevel] = useState('')
  const { getTrivia, triviaData, error } = useContext(QuizContext)

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch('https://opentdb.com/api_category.php')

      const data = await res.json()

      if (!res.ok) console.log(data)

      setCategoryData(data)
    }

    getCategories()
  }, [])

  if (error) {
    console.log(error)
  }

  const getTriviaHandler = () => {
    getTrivia(categoryValue, difficultyLevel)
  }

  const startQuiz = () => {
    if (triviaData) {
      history.push('/trivia')
    }
  }

  return (
    <div className='start_quiz_window'>
      <div className='header'>
        <h1>Welcome to Quiz App</h1>
      </div>
      <div className='body'>
        <div className='inputs'>
          <label>Choose Category</label>
          <select
            value={categoryValue}
            onChange={(e) => setCategoryValue(e.target.value)}
          >
            <option value=''>Any Category</option>
            {categoryData &&
              categoryData.trivia_categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>
        <div className='inputs'>
          <label>Difficulty Level</label>
          <select
            value={difficultyLevel}
            onChange={(e) => setDifficultyLevel(e.target.value)}
          >
            <option value=''>Any Difficulty</option>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
        </div>

        <div className='btns'>
          <button className='active' onClick={getTriviaHandler}>
            Submit
          </button>
          <button
            className={!triviaData ? 'disabled' : 'active'}
            onClick={startQuiz}
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
