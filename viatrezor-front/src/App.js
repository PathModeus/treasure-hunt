import Banner from './components/Banner'
import Navbarvt from './components/Navbar'
import Leaderboard from './components/Leaderboard'
import CreateTeam from './components/CreateTeam'
import Home from './components/Home'
import Contact from './components/Contact'
import Enigm from './components/Enigm'
import Auth from './components/Auth'
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
