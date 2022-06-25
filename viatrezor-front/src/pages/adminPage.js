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

function adminPage() {
    //const [showPlayButton, setShowPlayButton] = useState(true);
    //const [addPoint, setAddPoint ] = useState(0)

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
                  <input className='add-point-input' type='text' ></input>
                  </Table.Cell>
                  <Table.Cell align="center">
                  <div className="Validate">
                    <button
                    //onClick={() => ()}
                    style={{
                        border: "none",
                        backgroundColor: "green",
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
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
      </div>
        
    );
};

export default adminPage;