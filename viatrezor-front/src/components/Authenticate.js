import { useContext, useEffect } from 'react';
import { Session } from '../Param';
import '../styles/Authenticate.css'


function AuthPage({ navigation }) {
    const [session, setSession] = useContext(Session);

    const logout = () => {
        setSession(null);
        localStorage.removeItem('session');
        fetch('http://localhost:3001/auth/logout/', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Credentials': true,
            },
            credentials: 'include',
        })
    }

    useEffect(() => {
        if (!session) {
            fetch('http://localhost:3001/api/whoami/', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Access-Control-Allow-Credentials': true,
                },
                credentials: 'include',
            }).then(async res => {
                const session = await res.json();
                localStorage.setItem('session', session)
                setSession(session);
            }).catch(e => console.log(e));
        }
    }, [])

    return (
        <div className='authenticate-wrap'>
            <div className='authenticate'>
                <h1 className='authenticate-text'>Connectez vous avec ViaRézo</h1>
                <div className='authenticate-button-wrap'>
                    {session ?
                        <>
                            <div>Vous êtes connecté {session.fullName}</div>
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