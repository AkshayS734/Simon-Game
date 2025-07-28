import SimonGame from './components/SimonGame'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'

function App() {
  return (
    <ErrorBoundary>
      <SimonGame />
    </ErrorBoundary>
  )
}

export default App
