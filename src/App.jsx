import { useState } from 'react'
import './App.css'
import LocationTracker from './components/page1'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LocationTracker />
    </>
  )
}

export default App
