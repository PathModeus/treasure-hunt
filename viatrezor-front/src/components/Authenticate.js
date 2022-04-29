import '../styles/Authenticate.css'

function Authenticate() {
    console.log("Baise ta mère vraiment très fort");
    fetch('http://localhost:3001/api/infos')
        .then(function (res) {
            console.log('Réponse reçue !')
        }
        )
        .then(function (value) {
            console.log("Baise ta mère bien fort")
            return (
                <div>
                    <h1>Bonjour {value}</h1>
                </div>
            )
        });
    console.log('passé')

}

function AuthPage() {
    return (
        <div className='authenticate-wrap'>
            <div className='authenticate'>
                <h1 className='authenticate-text'>Connectez vous avec ViaRézo</h1>
                <div className='authenticate-button-wrap'>
                    <form method="get" action="http://localhost:3001">
                        <button className='authenticate-button' type="submit">Se connecter</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Authenticate