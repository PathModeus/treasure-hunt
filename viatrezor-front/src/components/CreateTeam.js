import { useState } from 'react'
import '../styles/CreateTeam.css'

function CreateTeam({ setLoad }) {
    const [newTeam, setNewTeam] = useState({ team_name: "", members: "" });
    const [loading, setLoading] = useState(false);

    const Submit = () => {
        if (!newTeam.team_name.length || !newTeam.members.length) {
            alert("Veuillez bien renseigner le nom et les membres de l'équipe !")
        } else {
            setLoading(true)
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
            }).then((res) => {
                if (res.status == 200) {
                    alert("L'équipe a été créée avec succès !")
                    setLoad(true)
                } else {
                    alert("Une erreur c'est produite, vérifiez d'avoir bien renseigné tous les joueurs de l'équipe !")
                }
                setLoading(false)
            })
                .catch((e) => {
                    setLoading(false)
                    console.log(e)
                })
        }
    }

    return (
        <div className='create-team-wrap'>
            <div className='create-team-container'>
                <h1 className='create-team-title'>Créer une équipe</h1>
                <div className='create-team-name create-team-container'>
                    <label>Nom de l'équipe:</label>
                    <input className='create-team-name-input' type='text' placeholder="Nom d'équipe" onChange={(e) => setNewTeam({ ...newTeam, team_name: e.target.value })} disabled={loading} />
                </div>
                <div className="create-team-members create-team-container">
                    <label>
                        Identifiants ViaRézo des membres de l'équipe séparés par des ";":
                    </label>
                    <textarea className="create-team-members-input" placeholder="ID des membres" onChange={(e) => setNewTeam({ ...newTeam, members: e.target.value.replace(/\s/g, '') })} disabled={loading} />
                </div>
                <button className="create-team-validate" onClick={Submit} disabled={loading}>Créer l'équipe</button>
            </div>
        </div>

    )
}

export default CreateTeam