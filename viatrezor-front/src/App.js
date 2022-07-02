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
import { Admin } from './components/Admin'

function App() {
  const [session, setSession] = useState(localStorage.getItem('session') ? JSON.parse(localStorage.getItem('session')) : null);
  const [teamInfo, setTeamInfo] = useState(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/api/whoami/`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
    }).then(async res => {
      if (res.status === 200) {
        let response = await res.json();
        localStorage.setItem('session', JSON.stringify(response));
        setSession(response);
      }
    }).catch(e => console.log(e));
  }, [load])

  useEffect(() => {
    if (session?.role?.player) {
      fetch(`${process.env.REACT_APP_SERVER}/api/team/${session.role.player}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Credentials': true,
        },
        credentials: 'include',
      }).then(async res => {
        setTeamInfo(await res.json());
        setLoad(false);
      }).catch(e => console.log(e));
    }
  }, [session, load])

  return (
    <div className='background' >
      <Session.Provider value={[session, setSession]}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navbarvt />}>
              <Route index element={session?.role?.admin && session.role.admin !== "VR" ? <Admin /> : <Home teamInfo={teamInfo} />} />
              <Route path='login' element={<AuthPage setLoad={setLoad} />} />
              {session &&
                <>
                  <Route path='leaderboard' element={<Leaderboard teamsList={teamList} />} />
                  <Route path='contact' element={<Contact listeAsso={listeAsso} />} />
                  <Route path='create-team' element={<CreateTeam setLoad={setLoad} />} />
                  <Route path='test' element={<Test />} />
                  <Route element={<NotFound />} />
                  {session.role?.admin === "VR" &&
                    <Route path='admin' element={<Admin superAdmin />} />
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
