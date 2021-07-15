import './styles/App.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import TriviaPage from './pages/TriviaPage'

function App() {
  return (
    <Router>
      <div className='container'>
        <Link to='/'>
          <div className='logo' title='Quiz App'>
            <img src='/quiz-logo.png' alt='Quiz Logo' />
          </div>
        </Link>
        <Route path='/' component={Dashboard} exact />
        <Route path='/trivia' component={TriviaPage} />
      </div>
    </Router>
  )
}

export default App
