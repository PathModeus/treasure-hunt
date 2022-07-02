import React, { useEffect, useState, useContext } from 'react';
import { Table, TableHeader } from 'semantic-ui-react';
import Leaderboard_team from '../components/LearderBoard_team';
import useWebSocket from 'react-use-websocket';
import { Session } from '../Param';

const socketUrl = process.env.SOCKET_URL;

function AdminPage() {
  const [showPlayButton, setShowPlayButton] = useState(true);
  //const [addPoint, setAddPoint ] = useState({team_name:"", bonus: 0})
  const [teams, setTeams] = useState([]);
  const [session, setSession] = useContext(Session);

  const { lastMessage, sendMessage, readyState } = useWebSocket(socketUrl,
    {
      onOpen: () => sendMessage(JSON.stringify({ activite: session.role.admin, id: session.login })),
      //Will attempt to reconnect on all close events, such as server shutting down
      shouldReconnect: (closeEvent) => true,
    });

  useEffect(() => {
    // ${asso_name}
    fetch(`${process.env.REACT_APP_SERVER}/api/team/admin/VR`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
    }).then(function (response) {
      return response.json();
    })
      .then(function (res) {
        setTeams(res)
      })

    if (lastMessage !== null) {
      console.log("message")
      console.log(JSON.parse(lastMessage.data))
      let up = JSON.parse(lastMessage.data)
      console.log("teams")
      console.log(teams)

      var team_update = teams.filter(function (value, index, arr) {
        return value.team_name != up.team_name;
      });
      console.log(team_update)
      team_update.push(up)
      setTeams([])
      console.log("teams after")

      console.log(team_update)
    }
  }, [lastMessage])

  useEffect(() => {
    console.log("heho")
    setTeams(teams)
  }, [teams])

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
            <Leaderboard_team team={row} index={index} />
          ))}
        </Table.Body>
      </Table>
    </div>

  );
};

export default AdminPage;
