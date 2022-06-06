import '../styles/CreateTeam.css'
import shrek from '../assets/shreksophone.gif'

function CreateTeam() {
    return (
        <div className='create-team-wrap'>
            <div className='create-team-container'>
                <h1 className='create-team-title'>Créer une équipe</h1>
                <TeamName />
                <TeamMembers />
                <SubmitButton />
            </div>
        </div>

    )
}

function TeamName() {
    return (
        <div className='create-team-name create-team-container'>
            <label className='create-team-name-label' for='team-name'>Nom de l'équipe:</label>
            <input className='create-team-name-input' type='text' placeholder="Nom d'équipe"></input>
        </div>
    )
}

function TeamMembers() {
    return (
        <div className="create-team-members create-team-container">
            <label className="create-team-members-label" for='team-members'>
                Identifiants ViaRézo des membres de l'équipe séparés par des ";":
            </label>
            <textarea className="create-team-members-input" placeholder="ID des membres"></textarea>
        </div>
    )
}

function SubmitButton() {
    return (
        <button className="create-team-validate">Créer l'équipe</button>
    )
}
export default CreateTeam