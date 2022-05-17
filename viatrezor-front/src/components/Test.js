import { useState } from 'react';
import '../styles/Authenticate.css'

function TestRequest(setState, setResult) {
    console.log("passage 1");
    fetch('http://localhost:3001/api/15', {
        method: 'GET',
        headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization', },
        mode: 'cors',
        cache: 'default'
    })
        .then(function (res) {
            console.log(res)
            console.log('ici')
            setResult(
                <div>
                    <h1>{res.body}</h1>
                </div>
            )
        }
        )
        .then(function () {
            console.log('passé')
            setState(true)
        })


}

function Test() {
    const [state, setState] = useState(false)
    const [result, setResult] = useState(<div></div>)
    return (
        <div className='authenticate-wrap'>
            <div className='authenticate'>
                <h1 className='authenticate-text'>Connectez vous avec ViaRézo</h1>
                <div className='authenticate-button-wrap'>
                    {state ? result :
                        <form method="get" onClick={TestRequest(setState, setResult)}>
                            <button className='authenticate-button' type="submit">Se connecter</button>
                        </form>
                    }

                </div>
            </div>
        </div>
    )
}

export default Test