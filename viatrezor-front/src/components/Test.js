import { useState } from 'react';
import '../styles/Authenticate.css'

function TestRequest(setState, setResult) {
<<<<<<< HEAD
    fetch('http://localhost:3001/api/infos', {
=======
    fetch('http://localhost:3001/api/15', {
>>>>>>> d9c141ba22c22ea285bd05d7b52b09839bf0aac7
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
            setState(true);
            setResult(body)
        }
        )
<<<<<<< HEAD
        .then(() => {
            setState(true);
        })
=======
>>>>>>> d9c141ba22c22ea285bd05d7b52b09839bf0aac7
}

function Test() {
    const [state, setState] = useState(false)
    const [result, setResult] = useState(null)
    return (
        <div className='authenticate-wrap'>
            {state ? <div><h1>{result}</h1></div> :
                <div className='authenticate'>
                    <h1 className='authenticate-text'>Connectez vous avec ViaRézo</h1>
                    <div className='authenticate-button-wrap'>
                        {state ? <div><h1>{result}</h1></div> :
                            <form onSubmit={(event) => {
                                event.preventDefault();
                                TestRequest(setState, setResult)
                            }}>
                                <button className='authenticate-button' type="submit">
                                    Send Request
                                </button>
                            </form>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Test