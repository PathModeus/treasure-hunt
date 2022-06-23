import Navbarvt from './components/Navbar'
import Leaderboard from './components/Leaderboard'
import CreateTeam from './components/CreateTeam'
import Home from './components/Home'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AuthPage from './components/Authenticate'
import NotFound from './components/NotFound'
import Test from './components/Test'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import './App.css'
import { teamList } from './assets/teamTest'
import { listeAsso } from "./Param"
import { useEffect, useState } from 'react'
import { Session } from './Param'

function App() {
  const [session, setSession] = useState(JSON.parse(localStorage.getItem('session')));
  const [team, setTeam] = useState(null);

  useEffect(() => {
    if (session?.role && session.role[0] === "player") {
      fetch(`http://localhost:3001/api/team/${session.role[1]}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Credentials': true,
        },
        credentials: 'include',
      }).then(async res => {
        setTeam(await res.json());
      }).catch(e => console.log(e));
    }
  }, [session])

  return (
    <div className='background' >
      <Session.Provider value={[session, setSession]}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navbarvt />}>
              <Route index element={session ? <Home team={team} /> : <Navigate to='/login' />} />
              <Route path='login' element={<AuthPage />} />
              {session &&
                <>
                  <Route path='leaderboard' element={<Leaderboard teamsList={teamList} />} />
                  <Route path='contact' element={<Contact listeAsso={listeAsso} />} />
                  <Route path='create-team' element={<CreateTeam />} />
                  <Route path='test' element={<Test />} />
                  <Route element={<NotFound />} />
                  {session.role[0] !== "player" &&
                    <Route path='admin' element={<Admin />} />
                  }
                </>
              }
            </Route>
          </Routes>
        </BrowserRouter>
        <Footer />
      </Session.Provider>
    </div>
  )
}

export default App;
