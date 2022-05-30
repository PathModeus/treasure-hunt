import logo from '../assets/logo.png'
import '../styles/Banner.css'

function Banner() {
  const title = 'Chasse au Trézo'
  return (
    <div className='vt-banner'>
      <h1 className='vt-title'>{title}</h1>
    </div>
  )
}

export default Banner