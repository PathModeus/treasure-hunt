import '../styles/Home.css'
import {useState, useEffect} from 'react';

function Home(props) {
    return (
      <div>
        <h1 >Accueil</h1>
        <div className='accueil-flex-hor'>
        <div className='accueil-flex-ver'>
          <TypeWriter content={sample_content} speed={35}/>
          <Advancement team={props.team}/>
        </div>
        </div>    
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
    <span className='green-circle circle'>&#128994;</span>
  )
}


const TypeWriter = ({ content = "", speed = 1000 }) => {
  const [displayedContent, setDisplayedContent] = useState("~% ");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    /*Create a new setInterval and store its id*/
    const animKey = setInterval(() => {
      setIndex((index) => {
        /*This setState function will set the index
        to index+1 if there is more content otherwise
        it will destory this animation*/
      
        if (index >= content.length - 1) {
          clearInterval(animKey);
          return index;
        }
        return index + 1;
      });
    }, speed);
  }, []);

  useEffect(() => {
    setDisplayedContent((displayedContent)=>displayedContent + content[index]) 
  }, [index])

  return (
    <p className="type-writer">{displayedContent}</p>
  )
};

const sample_content = `Sans rigoler.

Je pratique la MMA depuis maintenant 6 ans, de la boxe en parallèle depuis 7 ans, faut pas me faire chier moi.

Ainsi que la musculation depuis 4 ans, 1m87 pour 86 kg

J'ai une vitesse de fou, et des réflexes identiques à ma vitesse. J'ai juste à l'attendre qu'il me charge, l'esquiver et lui donner des bonnes patates dans la tête. Je le lâcherai pas à la moindre erreur, le gorille est fini. T'auras toujours des puceaux d'ici pour penser que c'est impossible. Rien n'est impossible avec de la volonté déjà les amis, et de 2) c'est pas avec votre corps de lâche que vous allez faire quoi que ce soit.

N'importe quel homme un minimum entraîné peut vaincre un gorille avec un couteau déjà. À main nue c'est pas forcément plus compliqué ça demande juste de la technique.`;

export default Home