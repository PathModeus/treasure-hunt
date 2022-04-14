import '../styles/Home.css'

function Home(props) {
    return (
      <div>
        <h1 >Accueil</h1>
        < Advancement team={props.team}/>
      </div>
    )
  }

function Advancement (props) {
  const redNumber = 7 - props.team.step
  const greenNumber = props.team.step
  const advancementBar = []
  for (let i=0; i<greenNumber;i++) {
    advancementBar.push(<DoneStep/>)
  }
  for (let i=0; i<redNumber;i++) {
    advancementBar.push(<ToDoStep/>)
  }
  return (
    <div className='advancement-bar'>{advancementBar}</div>
  )
}

function ToDoStep () {
  return (
    <span className = 'red-circle circle'>&#128308;</span>
  )
}

function DoneStep () {
  return (
    <span className='green-circle circle'>&#128994; </span>
  )
}


export default Home