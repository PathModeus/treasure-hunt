import Banner from './Banner'
import Navbarvt from './Navbar'
import Leaderboard from './Leaderboard'
import Home from './Home'
import Contact from './Contact'
import Enigm from './Enigm'
import Auth from './Auth'
import { BrowserRouter, Route, Routes } from "react-router-dom"


const team1 = {
  name:'les BG du 97',
  score: 1900,
  time: 1215
}
const team2 = {
  name: 'shreksophuckers',
  score: 2500,
  time: 1784
}
const teamList = [team1,team2];

function App() { 
  return (
  <div>
    <Banner />
    <BrowserRouter>
      <Routes>
        <Route path='/' element = { <Navbarvt /> }>
          <Route index element = { <Home /> } />
          <Route path='leaderboard' element={ <Leaderboard teamsList = {teamList} /> } />
          <Route path='contact' element={ <Contact />} />
          <Route path='auth' element={ <Auth />} />
          <Route path='enigm' element = { <Enigm />} />
        </Route>

      </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App;
