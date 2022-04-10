import Banner from './Banner'
import Navbarvt from './Navbar'
import TeamLine from './Leaderboard'


function App() { 
  const team = {
    name:'les BG du 97',
    score: 1900,
    time: 1215
  }
  return (
  <div>
    <Banner />
    <Navbarvt />
    <TeamLine team = {team}/>
  </div>
  )
}

export default App;
