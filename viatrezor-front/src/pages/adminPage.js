import React, {useEffect , useState } from 'react';
import { Table, TableHeader } from 'semantic-ui-react';
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
  }, [teams])



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


    return (
        <div className="Table">
      <h3></h3>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <Table.Header>
              <Table.Row style={{color : "white"}}>
                <Table.HeaderCell>Rang</Table.HeaderCell>
                <Table.HeaderCell align="center">Nom de l'équipe</Table.HeaderCell>
                <Table.HeaderCell align="center">Points</Table.HeaderCell>
                <Table.HeaderCell align="center">Temps</Table.HeaderCell>
                <Table.HeaderCell align="center">Pause/Resume time</Table.HeaderCell>
                <Table.HeaderCell align="center">Ajout des points</Table.HeaderCell>
                <Table.HeaderCell align="center">Valider l'activité</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body style={{ color: "white" }}>
              {teams.map((row, index) => (
                <Table.Row
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <Table.Cell component="th" scope="row">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell align="left">{row.team_name}</Table.Cell>
                  <Table.Cell align="left">{row.points}</Table.Cell>
                  <Table.Cell align="left">{row.time}</Table.Cell>
                  <Table.Cell align="center">
                  <div className="Pause">
                    <button onClick={() => setShowPlayButton(!showPlayButton) }
                    style={{
                        border: "none",
                        backgroundColor: "#04AA6D",
                        boxShadow: "0 0 4px 2px rgba(0,0,0,.2)",
                        cursor: "pointer",
                        height: 40,
                        outline: "none",
                        borderRadius: "100%",
                        width: 40
                    }}
                    >
                      <PlayPause buttonToShow={showPlayButton ? "play" : "pause"} />
                    </button>
                </div>
                  </Table.Cell>
                  <Table.Cell align="left">
                  <input className='add-point-input' placeholder="points de l'activité" type='int'  onChange={(e) => setAddPoint({team_name: row.team_name, bonus: e.target.value }) }></input>
                  </Table.Cell>
                  <Table.Cell align="center">
                    <button className= 'validate-activity' type="submit"
                    onClick={Submit}
                    style={{
                        border: "none",
                        backgroundColor: "#04AA6D",
                        textAlign: 'center',
                        textDecoration: 'none',
                        color: "white",
                        boxShadow: "0 0 4px 2px rgba(0,0,0,.2)",
                        cursor: "pointer",
                        height: 40,
                        outline: "none",
                        borderRadius: "5px",
                        width: 100
                    }}
                    color= "white">Valider
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
      </div>
        
    );
};

export default AdminPage;
