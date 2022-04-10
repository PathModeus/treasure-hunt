function TeamLine(props) {
    return (
        <div className='team-line'>
          <div className='team-line-name'>{props.team.name}</div>
          <div className='team-line-time'>{props.team.time}</div>
          <div className='team-line-score'>{props.team.score}</div>
          <StopButton name={props.team}/>
        </div>
      )
}

function StopButton(props) {
    return (
        <button class="team-line-pause">Pause</button>
      )
}

export default TeamLine