import React from 'react';
import Leaderboard from '../components/Leaderboard';


const adminPage = () => {
    return (
        <div className='learderboard'>
            <h1> Liste des équipes </h1>
            <Leaderboard teamsList={teamList}/>
        </div>
    );
};

export default adminPage;