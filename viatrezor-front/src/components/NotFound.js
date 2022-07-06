import notFound from '../assets/404.gif'
import '../styles/NotFound.css'

function NotFound() {
    return (
        <div className='not-found-wrap'>
            <div className='not-found'>
                <img className='not-found-img' src={notFound} alt='Page not found image' />
                <h1 className='not-found-text'>Désolé cette page n'existe pas</h1>
                <div className='not-found-button-wrap'>
                    <form method="get" action="/">
                        <button className='not-found-button' type="submit">Retourner à l'accueil</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NotFound
