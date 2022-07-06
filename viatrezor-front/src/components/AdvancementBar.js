import '../styles/AdvancementBar.css'
import barre1P from '../assets/barres/barre1P.png'
import barre2P from '../assets/barres/barre2P.png'
import barre3P from '../assets/barres/barre3P.png'
import barre4P from '../assets/barres/barre4P.png'
import barre1V from '../assets/barres/barre1V.png'
import barre2V from '../assets/barres/barre2V.png'
import barre3V from '../assets/barres/barre3V.png'
import barre4V from '../assets/barres/barre4V.png'



function AdvancementBar(props) {
  const remainingTasks = props.nbTasks - props.team.step + 1
  const completedTasks = props.team.step - 1

  const listBarEmpty = [
    <img key="1" className='barre' src={barre1V} alt='Epreuve 1 inachevée' />,
    <img key="2" className='barre' src={barre2V} alt='Epreuve 2 inachevée' />,
    <img key="3" className='barre' src={barre3V} alt='Epreuve 3 inachevée' />,
    <img key="4" className='barre' src={barre4V} alt='Epreuve 4 inachevée' />
  ]
  const listBarFull = [
    <img key="1" className='barre' src={barre1P} alt='Epreuve 1 achevée' />,
    <img key="2" className='barre' src={barre2P} alt='Epreuve 2 achevée' />,
    <img key="3" className='barre' src={barre3P} alt='Epreuve 3 achevée' />,
    <img key="4" className='barre' src={barre4P} alt='Epreuve 4 achevée' />
  ]

  const advancementBar = [];

  for (let i = 0; i < completedTasks; i++) {
    advancementBar.push(listBarFull[i])
  }

  for (let i = completedTasks; i < remainingTasks + 1; i++) {
    advancementBar.push(listBarEmpty[i])
  }

  return (
    <div className='advancement-bar'>{advancementBar}</div>
  )
}


export default AdvancementBar
