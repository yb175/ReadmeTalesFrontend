import LandingPage from './pages/landing'
import Readme from './pages/readme'
import {BrowserRouter, Route, Routes} from 'react-router'
import GithubCallback from './pages/githubCallback' 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/auth/github/callback' element={<GithubCallback/>}/>
        <Route path='/readme' element={<Readme/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
