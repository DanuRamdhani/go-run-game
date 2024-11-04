import './App.css'
import RoomList from './components/RoomScreen'
import LocationTracker from './components/LocationTracker'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<RoomList />} />
          <Route path="tracker" element={<LocationTracker />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
