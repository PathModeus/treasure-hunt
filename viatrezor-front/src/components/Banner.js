import logo from '../assets/logo.png'
import '../styles/Banner.css'

function Banner() {
  const title = 'ViaTrézor'
  return (
    <div className='vt-banner'>
      <img src={logo} alt='ViaTrézor' className='vt-logo' />
      <h1 className='vt-title'>{title}</h1>
    </div>
  )
}

export default Banner