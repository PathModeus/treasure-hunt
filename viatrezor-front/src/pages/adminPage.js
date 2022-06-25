import React, { useState } from 'react';
import { Table, TableHeader } from 'semantic-ui-react';
import PlayPause from '../components/PlayPause';


function createData(rang, nom, points, temps) {
    return { rang, nom, points, temps };
  }
  
  const rows = [
    createData("1", "equipe1", 1000,"5:40:21" ),
    createData("2", "equipe2", 500, "5:40:21"),
    createData("3", "equipe3", 12, "5:40:21"),
    createData("4", "equipe4", 1, "5:40:21"),
  ];

function AdminPage() {
    //const [showPlayButton, setShowPlayButton] = useState(true);
    const [addPoint, setAddPoint ] = useState({team_name:"", bonus: 0})
    const Submit = () => {
      
          fetch('http://localhost:3001/api/team/bonus', {
              method: 'POST',
              mode: 'cors',
              headers: {
                  'Access-Control-Allow-Credentials': true,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify(addPoint)
          }).catch(e => console.log(e))
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
              {rows.map((row) => (
                <Table.Row
                  key={row.rang}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <Table.Cell component="th" scope="row">
                    {row.rang}
                  </Table.Cell>
                  <Table.Cell align="left">{row.nom}</Table.Cell>
                  <Table.Cell align="left">{row.points}</Table.Cell>
                  <Table.Cell align="left">{row.temps}</Table.Cell>
                  <Table.Cell align="center">
                  <div className="Pause">
                    <button
                    //onClick={() => ()}
                    style={{
                        border: "none",
                        backgroundColor: "#ff8d8d",
                        boxShadow: "0 0 4px 2px rgba(0,0,0,.2)",
                        cursor: "pointer",
                        height: 40,
                        outline: "none",
                        borderRadius: "100%",
                        width: 40
                    }}
                    >
                    </button>
                </div>
                  </Table.Cell>
                  <Table.Cell align="left">
                  <input className='add-point-input' placeholder="points de l'activité" type='int'  onChange={(e) => setAddPoint({team_name: row.nom, bonus: e.target.value }) }></input>
                  </Table.Cell>
                  <Table.Cell align="center">
                    <button className= 'validate-activity' type="submit"
                    onClick={Submit}
                    style={{
                        border: "none",
                        backgroundColor: "green",
                        boxShadow: "0 0 4px 2px rgba(0,0,0,.2)",
                        cursor: "pointer",
                        height: 40,
                        outline: "none",
                        borderRadius: "5px",
                        width: 100
                    }}
                    >Valider
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