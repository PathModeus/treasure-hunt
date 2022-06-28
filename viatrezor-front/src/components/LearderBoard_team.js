import React, { useEffect, useState } from 'react';
import PlayPause from '../components/PlayPause';
import { Table} from 'semantic-ui-react';

function Leaderboard_team(props) {

    const [showPlayButton, setShowPlayButton] = useState(true);
    const [addPoint, setAddPoint ] = useState({team_name:"", bonus: 0})
    const  [times, setTimes ]  = useState(0);      
    const  [timer, setTimer ]  = useState("00:00:00");
   
    useEffect(() => {
      let {  hours, minutes, seconds }  = getTime(times);
      setTimer(
        (hours > 9 ? hours : '0' + hours) + ':' +
        (minutes > 9 ? minutes : '0' + minutes) + ':'
        + (seconds > 9 ? seconds : '0' + seconds)
    )
        const interval = setInterval(() => {
            setTimes(times+1)
        }, 1000);
      
        return () => clearInterval(interval);
      }, [times]);
     
  
  const getTime = (e) => {
   

    const seconds = Math.floor(e % 60);
    const minutes = Math.floor((e / 60) % 60);
    const hours = Math.floor((e / 60 / 60) % 24);
    return {
        e, hours, minutes, seconds
    };
  }
  


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
          }).catch(e => console.log(e))
      }


    return (

   
                <Table.Row
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <Table.Cell component="th" scope="row">
                    {props.team.team_id} 
                  </Table.Cell>
                  <Table.Cell align="left">{props.team.team_name}</Table.Cell>
                  <Table.Cell align="left">{props.team.points}</Table.Cell>
                  <Table.Cell align="left">{timer}</Table.Cell>
                  <Table.Cell align="center">
                  <div className="Pause">
                    <button onClick={() => setShowPlayButton(!showPlayButton) }
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
                      <PlayPause buttonToShow={showPlayButton ? "play" : "pause"} />
                    </button>
                </div>
                  </Table.Cell>
                  <Table.Cell align="left">
                  <input className='add-point-input' placeholder="points de l'activité" type='int'  onChange={(e) => setAddPoint({team_name: props.team.nom, bonus: e.target.value }) }></input>
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
                        backgroundColor: "green",
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
)};

export default Leaderboard_team;

