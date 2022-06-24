import { useState } from 'react'
import '../styles/CreateTeam.css'

function CreateTeam() {
    const [newTeam, setNewTeam] = useState({team_name: "", members: ""});

    const Submit = () => {
        if (!newTeam.team_name.length || !newTeam.members.length) {
            alert("Veuillez bien renseigner le nom et les membres de l'équipe !")
        } else {
            fetch('http://localhost:3001/api/team/create', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newTeam),
            }).catch(e => console.log(e))
        }
    }

    return (
        <div className='create-team-wrap'>
            <div className='create-team-container'>
                <h1 className='create-team-title'>Créer une équipe</h1>
                <div className='create-team-name create-team-container'>
                    <label className='create-team-name-label'>Nom de l'équipe:</label>
                    <input className='create-team-name-input' type='text' placeholder="Nom d'équipe" onChange={(e) => setNewTeam({...newTeam, team_name: e.target.value})} />
                </div>
                <div className="create-team-members create-team-container">
                    <label className="create-team-members-label">
                        Identifiants ViaRézo des membres de l'équipe séparés par des ";":
                    </label>
                    <textarea className="create-team-members-input" placeholder="ID des membres" onChange={(e) => setNewTeam({...newTeam, members: e.target.value.replace(/\s/g, '')})} />
                </div>
                <button className="create-team-validate" onClick={Submit}>Créer l'équipe</button>
            </div>
        </div>

    )
}

export default CreateTeam