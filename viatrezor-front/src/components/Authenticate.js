import { useState } from 'react';
import '../styles/Authenticate.css'

function Authenticate(setstate) {
    console.log("passage 1");
    fetch('http://localhost:3001/api/15', {
        method: 'GET',
        headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization', },
        mode: 'cors',
        cache: 'default'
    })
        .then(function (res) {
            console.log(res)
            setstate(true)
            return (
                <div>
                    <h1>Bonjour {res.session.user}</h1>
                </div>
            )
        }
        );
    console.log('passé')

}

function AuthPage() {
    const { state, setstate } = useState(false)
    const result = Authenticate(setstate)

    return (
        <div className='authenticate-wrap'>
            <div className='authenticate'>
                <h1 className='authenticate-text'>Connectez vous avec ViaRézo</h1>
                <div className='authenticate-button-wrap'>
                    {state ? result
                        :
                        <form method="get" action="http://localhost:3001">
                            <button className='authenticate-button' type="submit">Se connecter</button>
                        </form>
                    }

                </div>
            </div>
        </div>
    )
}

export default AuthPage