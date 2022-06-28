import React, {useEffect , useState } from 'react';
import { Table, TableHeader } from 'semantic-ui-react';
import Leaderboard_team from '../components/LearderBoard_team';
import PlayPause from '../components/PlayPause';
const axios = require('axios');


function createData(rang, nom, points, temps) {
  return { rang, nom, points, temps };
}

function AdminPage() {
    const [showPlayButton, setShowPlayButton] = useState(true);
    const [addPoint, setAddPoint ] = useState({team_name:"", bonus: 0})
    const  [teams, setTeams ]  = useState([]);
    const  [times, setTimes ]  = useState(0);
  
    useEffect(() => {
        // ${asso_name}
        fetch('http://localhost:3001/api/team/VR', {
          method: 'GET',
          mode: 'cors',
          headers: {
              'Access-Control-Allow-Credentials': true,
          },
          credentials: 'include',
      }).then(function(response) {
        return response.json();
      })
      .then(function(res) {
        setTeams(res)
      //  setTeams(res.teams)
      //  setTimes(res.times)
      })
  }, [])



    const Submit = () => {
          
          fetch('http://localhost:3001/api/team/bonus', {
              method: 'PUT',
              mode: 'cors',
              headers: {
                  'Access-Control-Allow-Origin': 'http://localhost:3000/api',
                  'Access-Control-Allow-Credentials': true,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify(addPoint)
          }).catch(e => console.log(e))
          setAddPoint({team_name:"", bonus: ""})
        }

  const NextActivity = () => {    
    fetch("http://localhost:3001/api/team/next_activity", {
            methode: 'POST',
            mode: 'cors',
            headers: {
              //'Access-Control-Allow-Origin': 'http://localhost:3000/api',
              'Access-Control-Allow-Credentials': true,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            credentials:"include",
            body: JSON.stringify(addPoint),
          }).catch(e => console.log(e))
  }

  return (
    <div className="Table">
      <h3></h3>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <Table.Header>
          <Table.Row style={{ color: "white" }}>
            <Table.HeaderCell>Rang</Table.HeaderCell>
            <Table.HeaderCell align="center">Nom de l'équipe</Table.HeaderCell>
            <Table.HeaderCell align="center">Points</Table.HeaderCell>
            <Table.HeaderCell align="center">Temps</Table.HeaderCell>
            <Table.HeaderCell align="center">
              Pause/Resume time
            </Table.HeaderCell>
            <Table.HeaderCell align="center">Ajout des points</Table.HeaderCell>
            <Table.HeaderCell align="center">
              Valider l'activité
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body style={{ color: "white" }}>
          {teams.map((row, index) => (
           <Leaderboard_team team ={row} index={index} />
              ))}
            </Table.Body>
          </Table>
      </div>
        
    );
};

export default AdminPage;
