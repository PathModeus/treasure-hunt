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
        .then(function (res) {
            console.log(res);
            console.log('ici');
            console.log(res.body);
            setResult(
                <div>
                    <h1>{res.body}</h1>
                </div>
            );
            setState(true);
        }
        )
        .then(function () {
            console.log('passé');
            setState(true);
        })
}

function Test() {
    const [state, setState] = useState(false)
    const [result, setResult] = useState(<div></div>)
    console.log('beep')
    return (
        <div className='authenticate-wrap'>
            <div className='authenticate'>
                <h1 className='authenticate-text'>Connectez vous avec ViaRézo</h1>
                <div className='authenticate-button-wrap'>
                    {state ? result :
                        <form onSubmit={() => TestRequest(setState, setResult)}>
                            <button className='authenticate-button' type="submit">Send Request</button>
                        </form>
                    }

                </div>
            </div>
        </div>
    )
}

export default Test