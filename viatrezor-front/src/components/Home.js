import '../styles/Home.css'
import { useState, useEffect } from 'react';
import { welcomingTxt, notInTeamTxt } from '../assets/lore.js';
import AdvancementBar from './AdvancementBar';
import { Link } from 'react-router-dom';

function Home(props) {
  return (
    <div className='wrap'>
      <div className='accueil-flex-hor'>
        <div className='accueil-flex-ver'>
          {props.team && props.team.team_name !== "No team" ?
            <>
              <TypeWriter content={test_content} speed={30} />
              <AdvancementBar team={props.team} nbTasks={4} />
            </>
            :
            <div className="no-team">
              Il te faut d'abord rejoindre une équipe, va t'enregistrer auprès d'un organisateur !
            </div>
          }
        </div>
      </div>
    </div>
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