import React, { useEffect, useState } from 'react';
import PlayPause from '../components/PlayPause';
import { Table } from 'semantic-ui-react';


const getTime = (e) => {
  const seconds = Math.floor(e % 60);
  const minutes = Math.floor((e / 60) % 60);
  const hours = Math.floor((e / 60 / 60) % 24);
  return {
    e, hours, minutes, seconds
  };
}


function Leaderboard_team(props) {
  const [bonus, setBonus] = useState(0);
  let diff = Date.now() - new Date(props.team.timer_last_on);
  const [times, setTimes] = useState(props.team.timer_status ? props.team.time + diff : props.team.time);
  let { hours, minutes, seconds } = getTime(times);
  const [timer, setTimer] = useState(
    (hours > 9 ? hours : '0' + hours) + ':' +
    (minutes > 9 ? minutes : '0' + minutes) + ':' +
    (seconds > 9 ? seconds : '0' + seconds)
  );

  const NextActivity = () => {
    fetch(`${process.env.REACT_APP_SERVER}/api/team/next`, {
      method: "PUT",
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify(
        {
          team_name: props.team.team_name,
        }
      )
    });
  }

  const Pause = () => {
    fetch(`${process.env.REACT_APP_SERVER}/api/team/stop`, {
      method: "PUT",
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify(
        {
          team_name: props.team.team_name,
        }
      )
    });
  }

  const Submit = () => {
    fetch(`${process.env.REACT_APP_SERVER}/api/team/bonus`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({team_name: props.team.team_name, bonus})
    }).catch(e => console.log(e));
    setBonus(0);
  }


  useEffect(() => {
    if (props.team.timer_status) {
      let { hours, minutes, seconds } = getTime(times);
      setTimer(
        (hours > 9 ? hours : '0' + hours) + ':' +
        (minutes > 9 ? minutes : '0' + minutes) + ':' +
        (seconds > 9 ? seconds : '0' + seconds)
      )

      const interval = setInterval(() => {
        if (props.team.timer_status) {
          setTimes(times + 1)
        }
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setBonus(0);
      let diff = Date.now() - new Date(props.team.timer_last_on);
      let time = props.team.timer_status ? props.team.time + diff : props.team.time;
      setTimes(time);
      let { hours, minutes, seconds } = getTime(time);
      setTimer(
        (hours > 9 ? hours : '0' + hours) + ':' +
        (minutes > 9 ? minutes : '0' + minutes) + ':' +
        (seconds > 9 ? seconds : '0' + seconds)
      );
    }
  }, [times, props.team]);

  
  return (
    <Table.Row
      id={props.index}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <Table.Cell align="left">{props.index + 1}</Table.Cell>
      <Table.Cell align="left">{props.team.team_name}</Table.Cell>
      <Table.Cell align="left">{props.team.points}</Table.Cell>
      <Table.Cell align="left">{timer}</Table.Cell>
      <Table.Cell align="left">
        <div className="Pause">
          <button
            onClick={() => {
              Pause()
            }}
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
              buttonToShow={props.team.timer_status ? "pause" : "play"}
            />
          </button>
        </div>
      </Table.Cell>
      <Table.Cell align="left" style={{display: "flex", flexDirection: "column"}}>
        <input
          className="add-point-input"
          placeholder="points de l'activité"
          type="number"
          value={bonus}
          onChange={(e) => {
            setBonus(parseInt(e.target.value, 10))
          }}
          style={{
            width: 200,
            borderRadius: "5px",
          }}
        />
        <button
          className="validate-activity"
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
  )
};

export default Leaderboard_team;

