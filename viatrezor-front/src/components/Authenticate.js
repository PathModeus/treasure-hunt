import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Authenticate.css'

function AuthPage() {
    const [user, setUser ] = useState({});
    const params = useParams();

    useEffect(() => {
        if (params.connected) {
            console.log(params.connected);
            fetch('http://localhost:3001/api/whoami/', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    // 'token' : params.token,
                    // 'Access-Control-Allow-Origin' : 'http://localhost:3000',
                },
                credentials: 'include',
            }).then(async res => {
                setUser(await res.json());
            }).catch(e => console.log(e));
        }
    }, [params])

    return (
        <div className='authenticate-wrap'>
            <div className='authenticate'>
                <h1 className='authenticate-text'>Connectez vous avec ViaRézo</h1>
                <div className='authenticate-button-wrap'>
                    {user.fullName ? 
                        <div>Vous êtes connecté {user.fullName}</div>
                        :
                        <button className='authenticate-button' onClick={() => window.location.assign('http://localhost:3001/api/login/')}>Se connecter</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default AuthPage