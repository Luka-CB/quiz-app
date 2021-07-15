import React, { useContext, useEffect, useState } from 'react'
import { QuizContext } from '../context/quizContext'
import he from 'he'
import '../styles/trivia.css'

const TriviaPage = ({ history }) => {
  const { triviaData } = useContext(QuizContext)
  const [num, setNum] = useState(0)
  const [answerVal, setAnswerVal] = useState([])
  const [activeBtn, setActiveBtn] = useState(false)
  const [addClass, setAddClass] = useState({
    one: null,
    two: null,
    three: null,
    four: null,
  })

  const trivia = triviaData && triviaData.results

  const correctAnswerCount = answerVal.filter((x) => x === 'true').length

  useEffect(() => {
    if (!trivia) {
      history.push('/')
    }
  }, [history, trivia])

  const restartQuiz = () => {
    setNum(0)
    setAnswerVal([])
  }

  const nextQuestionHandler = () => {
    setNum(num + 1)
    setActiveBtn(false)
    setAddClass({
      one: null,
      two: null,
      three: null,
      four: null,
    })
  }

  return (
    <div className='quiz_window'>
      {num + 1 > (trivia && trivia.length) ? (
        <div className='finish'>
          <h1>Quiz is Finished</h1>
          <h3>
            Result:{' '}
            <span>{`${correctAnswerCount} correct answers out of ${
              trivia && trivia.length
            } questions`}</span>
          </h3>
          <div className='btns'>
            <button onClick={restartQuiz}>Restart Quiz</button>
            <button onClick={() => history.push('/')}>Start New Quiz</button>
          </div>
        </div>
      ) : (
        <>
          <div className='header'>
            <h1>{num + 1}. Question</h1>
            <h2>
              {num + 1}/{trivia && trivia.length}
            </h2>
          </div>
          <div className='body'>
            <div className='question'>
              <h3>{trivia && he.decode(trivia[num].question)}</h3>
            </div>
            <hr />
            <div className='answers'>
              <span
                onClick={() => {
                  setAnswerVal([...answerVal, 'true'])
                  setAddClass({
                    one: true,
                    two: false,
                    three: false,
                    four: false,
                  })
                  setActiveBtn(true)
                }}
                className={
                  addClass.one
                    ? 'active'
                    : addClass.one === false
                    ? 'disabled'
                    : undefined
                }
              >
                {trivia && he.decode(trivia[num].correct_answer)}
              </span>

              <span
                onClick={() => {
                  setAnswerVal([...answerVal, 'false'])
                  setAddClass({
                    one: false,
                    two: true,
                    three: false,
                    four: false,
                  })
                  setActiveBtn(true)
                }}
                className={
                  addClass.two
                    ? 'active'
                    : addClass.two === false
                    ? 'disabled'
                    : undefined
                }
              >
                {trivia && he.decode(trivia[num].incorrect_answers[0])}
              </span>

              <span
                onClick={() => {
                  setAnswerVal([...answerVal, 'false'])
                  setAddClass({
                    one: false,
                    two: false,
                    three: true,
                    four: false,
                  })
                  setActiveBtn(true)
                }}
                className={
                  addClass.three
                    ? 'active'
                    : addClass.three === false
                    ? 'disabled'
                    : undefined
                }
              >
                {trivia && he.decode(trivia[num].incorrect_answers[1])}
              </span>

              <span
                onClick={() => {
                  setAnswerVal([...answerVal, 'false'])
                  setAddClass({
                    one: false,
                    two: false,
                    three: false,
                    four: true,
                  })
                  setActiveBtn(true)
                }}
                className={
                  addClass.four
                    ? 'active'
                    : addClass.four === false
                    ? 'disabled'
                    : undefined
                }
              >
                {trivia && he.decode(trivia[num].incorrect_answers[2])}
              </span>
            </div>

            <button
              disabled={!activeBtn}
              className={!activeBtn ? 'disabled_btn' : undefined}
              onClick={nextQuestionHandler}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default TriviaPage
