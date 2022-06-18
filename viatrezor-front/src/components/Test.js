import { useState } from 'react';
import '../styles/Authenticate.css'

function TestRequest(setState, setResult) {
    fetch('http://localhost:3001/api/infos', {
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