import '../styles/Home.css'
import { useState, useEffect, useContext, useRef } from 'react';
import AdvancementBar from './AdvancementBar';
import { Session } from '../Param';

function Home({teamInfo}) {
  const [session,] = useContext(Session);
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(
      session ? 
        teamInfo?.activity?.description ?
          teamInfo.activity.description
          :
          "Parfait ! Vous avez réussi à vous connecter à l'authentificateur de ViaRézo ! Je n'ai pas le temps pour les présentations, rendez-vous au carré des Sciences dès que possible pour former une équipe. J'ai besoin de votre aide en urgence !"
      :  
      "Bonjour, vous êtes là ? Connectez-vous afin que je puisse savoir qui vous êtes !"
    )
  }, [session, teamInfo])

  return (
    <div className='accueil-flex'>
      {teamInfo?.team?.team_name && 
        <div id="team-name">Équipe : {teamInfo.team.team_name}</div>
      }
      {teamInfo?.activity?.name && 
        <div id="round-name">Prochaine épreuve : {teamInfo.activity.name}</div>
      }
      <TypeWriter content={content} speed={30} />
      {teamInfo?.team &&
        <AdvancementBar team={teamInfo.team} nbTasks={4} />
      }
    </div>
  )
}

const TypeWriter = ({ content, speed }) => {
  const [session,] = useContext(Session);
  const [displayedContent, setDisplayedContent] = useState("$  ");
  const [index, setIndex] = useState(0);
  const animKey = useRef(null);

  useEffect(() => {
    setDisplayedContent("$  ");
    setIndex(0);
    if (animKey.current) {
      clearInterval(animKey.current);
    }
    /*Create a new setInterval and store its id*/
    animKey.current = setInterval(() => {
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
  }, [content]);

  useEffect(() => {
    setDisplayedContent(displayedContent + content[index])
  }, [index])

  return (
    <p className="type-writer">
      {session && <>{session.firstName.toLowerCase().substring(0, 5)}@viarezo:~/ <br/></>}
      {displayedContent}
    </p>
  )
};

export default Home