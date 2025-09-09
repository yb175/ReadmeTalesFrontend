import LandingPage from './pages/landing'
import Readme from './pages/readme'
import {BrowserRouter, Route, Routes} from 'react-router'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/readme' element={<Readme/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
