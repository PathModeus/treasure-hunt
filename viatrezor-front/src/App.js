import Navbarvt from './components/Navbar'
import Leaderboard from './components/Leaderboard'
import CreateTeam from './components/CreateTeam'
import Home from './components/Home'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AuthPage from './components/Authenticate'
import NotFound from './components/NotFound'
import Test from './components/Test'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import { team1, teamList} from './assets/teamTest'
import { listeAsso } from "./Param"

function App() {
  return (
    <div className='background' >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbarvt />}>
            <Route index element={<Home team={team1} />} />
            <Route path='leaderboard' element={<Leaderboard teamsList={teamList} />} />
            <Route path='contact' element={<Contact listeAsso={listeAsso} />} />
            <Route path='create-team' element={<CreateTeam />} />
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
