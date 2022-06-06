import Banner from './components/Banner'
import Navbarvt from './components/Navbar'
import Leaderboard from './components/Leaderboard'
import CreateTeam from './components/CreateTeam'
import Home from './components/Home'
import Contact from './components/Contact'
import Enigma from './components/Enigma'
import Footer from './components/Footer'
import AuthPage from './components/Authenticate'
import NotFound from './components/NotFound'
import Test from './components/Test'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'


const team1 = {
  name: 'les BG du 97',
  score: 1900,
  time: 1215,
  step: 4
}
const team2 = {
  name: 'shreksophuckers',
  score: 2500,
  time: 1784,
  step: 1
}
const teamList = [team1, team2];

function App() {
  return (
    <div>
      <Banner />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbarvt />}>
            <Route index element={<Home team={team1} />} />
            <Route path='leaderboard' element={<Leaderboard teamsList={teamList} />} />
            <Route path='contact' element={<Contact />} />
            <Route path='create-team' element={<CreateTeam />} />
            <Route path='enigma' element={<Enigma />} />
            <Route path='login' element={<AuthPage />} />
            <Route path='test' element={<Test />} />
            <Route element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App;
