import { useState } from 'react';
import '../styles/Authenticate.css'

function TestRequest(setState, setResult) {
    console.log("passage 1");
    fetch('http://localhost:3001/api/15', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then((res) =>
            res.json()
        )
        .then((body) => {
            console.log('ici');
            console.log(body);
            setState(true);
            setResult(body)
        }
        )
        .then(() => {
            console.log('passé');
            setState(true);
        })
}

function Test() {
    const [state, setState] = useState(false)
    const [result, setResult] = useState(null)
    console.log('beep')
    return (
        <div className='authenticate-wrap'>
            <div className='authenticate'>
                <h1 className='authenticate-text'>Connectez vous avec ViaRézo</h1>
                <div className='authenticate-button-wrap'>
                    {state ? <div><h1>{result}</h1></div> :
                        <form onSubmit={(event) => {
                            event.preventDefault();
                            console.log("lancement de TestRequest");
                            TestRequest(setState, setResult)
                        }}>
                            <button className='authenticate-button' type="submit">
                                Send Request
                            </button>
                        </form>
                    }

                </div>
            </div>
        </div>
    )
}

export default Test