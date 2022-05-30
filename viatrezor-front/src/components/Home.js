import '../styles/Home.css'
import { useState, useEffect } from 'react';
import { welcomingTxt, notInTeamTxt } from '../assets/lore.js';
import AdvancementBar from './AdvancementBar';

function Home(props) {
  return (
    <div className='wrap'>
      <div className='accueil-flex-hor'>
        <div className='accueil-flex-ver'>
          <TypeWriter content={test_content} speed={30} />
          <AdvancementBar team={props.team} nbTasks={4} />
        </div>
      </div>
    </div>
  )
}

function Advancement(props) {
  const remainingTasks = props.nbEquipe - props.team.step
  const completedTasks = props.team.step
  const advancementBar = []
  for (let i = 0; i < greenNumber; i++) {
    advancementBar.push(<DoneStep />)
  }
  for (let i = 0; i < redNumber; i++) {
    advancementBar.push(<ToDoStep />)
  }
  return (
    <div className='advancement-bar'>{advancementBar}</div>
  )
}

function ToDoStep() {
  return (
    <span className='red-circle circle'>&#128308;</span>
  )
}

function DoneStep() {
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
        it will destroy this animation*/

        if (index >= content.length - 1) {
          clearInterval(animKey);
          return index;
        }
        return index + 1;
      });
    }, speed);
  }, []);

  useEffect(() => {
    setDisplayedContent((displayedContent) => displayedContent + content[index])
  }, [index])

  return (
    <p className="type-writer">{displayedContent}</p>
  )
};


const test_content = notInTeamTxt


export default Home