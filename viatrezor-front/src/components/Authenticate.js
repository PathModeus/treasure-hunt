import { useEffect, useState } from 'react';
import '../styles/Authenticate.css'


function AuthPage() {
    const [user, setUser ] = useState(null);

    const logout = () => {
        fetch('http://localhost:3001/auth/logout/', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Credentials': true,
            },
            credentials: 'include',
        }).then(res => {
            setUser(null);
        }).catch(e => console.log(e));
    }

    useEffect(() => {
        fetch('http://localhost:3001/api/whoami/', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Credentials': true,
            },
            credentials: 'include',
        }).then(async res => {
            setUser(await res.json());
        }).catch(e => console.log(e));
    }, [])

    return (
        <div className='authenticate-wrap'>
            <div className='authenticate'>
                <h1 className='authenticate-text'>Connectez vous avec ViaRézo</h1>
                <div className='authenticate-button-wrap'>
                    {user ? 
                        <>
                            <div>Vous êtes connecté {user.fullName}</div>
                            <button className='authenticate-button' onClick={() => logout()}>Se déconnecter</button>
                        </>
                        :
                        <button className='authenticate-button' onClick={() => window.location.assign('http://localhost:3001/auth/login/')}>Se connecter</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default AuthPage