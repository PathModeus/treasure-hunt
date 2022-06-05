import '../styles/Home.css'
import { useState, useEffect } from 'react';

function Home(props) {
  return (
    <div>
      <h1 >Accueil</h1>
      <div className='accueil-flex-hor'>
        <div className='accueil-flex-ver'>
          <TypeWriter content={sample_content} speed={35} />
          <Advancement team={props.team} />
        </div>
      </div>
    </div>
  )
}

function Advancement(props) {
  const redNumber = 7 - props.team.step
  const greenNumber = props.team.step
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
    <span className='red-circle circle'>&#128308; </span>
  )
}

function DoneStep() {
  return (
    <span className='green-circle circle'>&#128994; </span>
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
    setDisplayedContent((displayedContent) => displayedContent + content[index])
  }, [index])

  return (
    <p className="type-writer">{displayedContent}</p>
  )
};

const sample_content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

export default Home