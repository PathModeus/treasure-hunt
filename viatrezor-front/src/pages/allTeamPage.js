import React, { useEffect, useState, useContext } from 'react';
import { Table } from 'semantic-ui-react';
import TeamComposent from '../components/TeamComposent';
import useWebSocket from 'react-use-websocket';
import { Session } from '../Param';

const socketUrl = process.env.REACT_APP_SOCKET_URL;

function AllTeamPage() {
  const [session,] = useContext(Session);
  const [teams, setTeams] = useState([]);
  const [activity, setActivity] = useState(null);

  const { lastMessage, sendMessage } = useWebSocket(socketUrl,
    {
      onOpen: () => sendMessage(JSON.stringify({ id: session.login })),
      //Will attempt to reconnect on all close events, such as server shutting down
      shouldReconnect: (closeEvent) => true,
    }
  );

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/api/team/all`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
    }).then(async (res) => {
      setTeams(await res.json());
    })
  }, [])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/api/activity/${session.role.admin}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
    }).then(async (res) => {
      setActivity(await res.json());
    })
  }, [])

  useEffect(() => {
    if (lastMessage?.data && activity) {
      let update = JSON.parse(lastMessage.data);

        let index = teams.findIndex(team => team.team_name === update.team_name)
        let teams_update = teams.map(team => team);
        teams_update[index] = update;
        setTeams(teams_update);
    }
  }, [lastMessage, activity])

  return (
    <div className="Table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <Table.Header>
          <Table.Row style={{ color: "white" }}>
            <Table.HeaderCell>Rang</Table.HeaderCell>
            <Table.HeaderCell align="center">Nom de l'équipe</Table.HeaderCell>
            <Table.HeaderCell align="center">Points</Table.HeaderCell>
            <Table.HeaderCell align="center">Activité en cours</Table.HeaderCell>
            <Table.HeaderCell align="center">
              Rejoindre l'équipe
            </Table.HeaderCell>
            { session?.role?.admin && session.role.admin == "VR" ? 
             <><Table.HeaderCell align="center">Temps</Table.HeaderCell>
             <Table.HeaderCell align="center">
                    Pause/Resume time
            </Table.HeaderCell>
            <Table.HeaderCell align="center">Ajout des points</Table.HeaderCell>
            <Table.HeaderCell align="center">
                    Valider l'activité
            </Table.HeaderCell></> : null
            }
           

          </Table.Row>
        </Table.Header>
        <Table.Body style={{ color: "white" }}>
          {teams.map((row, index) => (
            <TeamComposent session={session} key={index} team={row} index={index} />
          ))}
        </Table.Body>
      </Table>
    </div>

  );
};

export default AllTeamPage;
