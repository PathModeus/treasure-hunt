import Banner from './Banner'
import Navbarvt from './Navbar'
import Leaderboard from './Leaderboard'

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
    <Navbarvt />
    <Leaderboard teamsList = {teamList}/>
  </div>
  )
}

export default App;
