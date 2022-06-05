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
            }).then(res => {
                console.log("reponse", res);
                // setUser(res);
            }).catch(e => console.log(e));
        }
    }, [params])

    useEffect(() => {console.log(user)}, [user]);

    return (
        <div className='authenticate-wrap'>
            <div className='authenticate'>
                <h1 className='authenticate-text'>Connectez vous avec ViaRézo</h1>
                <div className='authenticate-button-wrap'>
                    {user.length ? 
                        <div>connecté</div>
                        :
                        <button className='authenticate-button' onClick={() => window.location.assign('http://localhost:3001/api/login/')}>Se connecter</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default AuthPage