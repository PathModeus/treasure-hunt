import { useContext, useEffect } from 'react';
import { Session } from '../Param';
import '../styles/Authenticate.css'


function AuthPage({ setLoad }) {
    const [session, setSession] = useContext(Session);

    const logout = () => {
        setSession(null);
        localStorage.removeItem('session');
        fetch(`${process.env.REACT_APP_SERVER}/api/auth/logout/`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Credentials': true,
            },
            credentials: 'include',
        })
    }

    useEffect(() => {
        if (!session) { setLoad(true) }
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
                        <button className='authenticate-button' onClick={() => window.location.assign(`${process.env.REACT_APP_SERVER}/api/auth/login/`)}>Se connecter</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default AuthPage
