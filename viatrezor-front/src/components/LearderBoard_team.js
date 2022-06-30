import React, { useEffect, useState } from 'react';
import PlayPause from '../components/PlayPause';
import { Table} from 'semantic-ui-react';

function Leaderboard_team(props) {

    const [showPlayButton, setShowPlayButton] = useState(props.team.timer_status);
    const [addPoint, setAddPoint ] = useState({team_name:props.team_name, bonus: 0, next_activity: ""})
    const [Points, setPoints ] = useState(props.team.points)
    let temps = Date.now()
    let date = new Date( props.team.timer_last_on);
    date.setHours(date.getHours() -2);
    console.log(date);
    var diff = ( temps -date.getTime() ) / 1000;  // bug de timezone
    const  [times, setTimes ]  = useState(props.team.timer_status ? props.team.time + diff : props.team.time  );      
    const  [timer, setTimer ]  = useState("00:00:00");
  
useEffect(() => {
      let {  hours, minutes, seconds }  = getTime(times);
      setTimer(
        (hours > 9 ? hours : '0' + hours) + ':' +
        (minutes > 9 ? minutes : '0' + minutes) + ':'
        + (seconds > 9 ? seconds : '0' + seconds)
    )
     
        const interval = setInterval(() => {
        if(showPlayButton)
        {
          setTimes(times+1)
        }
 

        }, 1000);
        return () => clearInterval(interval);
        
      }, [times, showPlayButton]);

  
      const getTime = (e) => {
  
    const seconds = Math.floor(e % 60);
    const minutes = Math.floor((e / 60) % 60);
    const hours = Math.floor((e / 60 / 60) % 24);
    return {
        e, hours, minutes, seconds
    };
  }
    const NextActivity = () => {    
            fetch('http://localhost:3001/api/team/next_activity/VR', {
               method: "PUT", 
               mode: 'cors',
               headers: {
                //'Access-Control-Allow-Origin': 'http://localhost:3000/api',
                'Access-Control-Allow-Credentials': true,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              credentials:"include",
    body: JSON.stringify(
        {
          team_id: props.team.team_id,
          next_activity: "CStudio"
        }
    )
});
    }

    const Pause = () => {    
      fetch('http://localhost:3001/api/team/stop', {
         method: "PUT", 
         mode: 'cors',
         headers: {
          //'Access-Control-Allow-Origin': 'http://localhost:3000/api',
          'Access-Control-Allow-Credentials': true,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials:"include",
body: JSON.stringify(
  {
    team_id: props.team.team_id,
    next_activity: "CStudio"
  }
)
});
}
  
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
    setPoints( Points + addPoint.bonus)
    setAddPoint({team_name:"", bonus: 0})
  }

    return (

      <Table.Row
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <Table.Cell align="left">{props.index + 1}</Table.Cell>
      <Table.Cell align="left">{props.team.team_name}</Table.Cell>
      <Table.Cell align="left">{Points}</Table.Cell>
      <Table.Cell align="left">{timer}</Table.Cell>
      <Table.Cell align="left">
        <div className="Pause">
          <button
            onClick={() =>{
              Pause()
              setShowPlayButton(!showPlayButton);
            
            }
            }
            style={{
              border: "none",
              backgroundColor: "#ff8d8d",
              boxShadow: "0 0 4px 2px rgba(0,0,0,.2)",
              cursor: "pointer",
              height: 40,
              outline: "none",
              borderRadius: "100%",
              width: 40,
            }}
          >
            <PlayPause
              buttonToShow={showPlayButton ? "pause" : "play"}
            />
          </button>
        </div>
      </Table.Cell>
      <Table.Cell align="left">
        <input
          className="add-point-input"
          placeholder="points de l'activité"
          type="int"
          onChange={(e) => {
            setAddPoint({
              team_name: props.team.team_name,
              bonus: parseInt(e.target.value, 10), 
              next_activity: "Oser",
            }) 
          }
          }
          style={{
            width: 200,
            borderRadius: "5px",
          }}
        ></input>
        <div heigth='20px'></div>
        <button
          className="validate-activity"
          type="submit"
          onClick={Submit}
          style={{
            display: "right",
            border: "none",
            backgroundColor: "#04AA6D",
            textAlign: "center",
            textDecoration: "none",
            color: "white",
            backgroundColor: "green",
            boxShadow: "0 0 4px 2px rgba(0,0,0,.2)",
            cursor: "pointer",
            height: 25,
            outline: "none",
            borderRadius: "5px",
            width: 200,
            marginTop: 10,
          }}
          color="white"
        >
          Ajouter les points
        </button>
      </Table.Cell>
      <Table.Cell align="left">
        <button
          className="validate-activity"
          type="submit"
          onClick={NextActivity}
          style={{
            border: "none",
            backgroundColor: "#04AA6D",
            textAlign: "center",
            textDecoration: "none",
            color: "white",
            backgroundColor: "green",
            boxShadow: "0 0 4px 2px rgba(0,0,0,.2)",
            cursor: "pointer",
            height: 50,
            outline: "none",
            borderRadius: "5px",
            width: 100,
          }}
          color="white"
        >
          Activité suivante
        </button>
      </Table.Cell>
    </Table.Row>
  )};

export default Leaderboard_team;

