import '../styles/Authenticate.css'

function Authenticate () {
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