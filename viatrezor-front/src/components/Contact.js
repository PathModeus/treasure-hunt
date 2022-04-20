import React from "react";
import viarezo from '../assets/viarezo.jpg';
import linkcs from '../assets/linkcs.png';
import algorithmics from '../assets/AlgorithmiCS.png';
import clubtech from '../assets/ClubTech.png';
import design from '../assets/CSDesign.png';
import cstudio from '../assets/LogoCSTUDIO.png';
import '../styles/Contact.css'

function Contact() {
  return (
    <div>
      <h1 >Qui sommes nous?</h1>
      <div className="wrap">
        <ViaRezo/>
        <CSDesign/>
        <LinkCS/>
        <AlgorithmiCS/>
        <CStudio/>
        <ClubTech/>
      </div>

    </div>
  )
}

function ViaRezo () {
  return (
  <div className="asso">
    <a href='https://viarezo.fr'>
    <img className="asso-logo" src={viarezo} alt= "logo de ViaRézo"></img>
    </a>
    <div className="asso-texte">
      <p>
        Sans rigoler. Je pratique la MMA depuis maintenant 6 ans, de la boxe en parallèle depuis 7 ans, je pourrai. Ainsi que la musculation depuis 4 ans, 1m87 pour 86 kg. J'ai une vitesse de fou, et des réflexes identiques à ma vitesse. J'ai juste à l'attendre qu'il me charge, l'esquiver et lui donner des bonnes patates dans la tête. Je le lâcherai pas à la moindre erreur, le gorille est fini. T'auras toujours des puceaux d'ici pour penser que c'est impossible. Rien n'est impossible avec de la volonté déjà les amis, et de 2) c'est pas avec votre corps de lâche que vous allez faire quoi que ce soit. N'importe quel homme un minimum entraîné peut vaincre un gorille avec un couteau déjà. À main nue c'est pas forcément plus compliqué ça demande juste de la technique.
      </p>
    </div>
  </div>
  )
}

function LinkCS () {
  return (
  <div className="asso">
    <a href='https://linkcs.fr'>
      <img className="asso-logo" src={linkcs} alt ='logo de LinkCS'></img>
    </a>
    <div className="asso-texte">
      <p>
        Sans rigoler. Je pratique la MMA depuis maintenant 6 ans, de la boxe en parallèle depuis 7 ans, je pourrai. Ainsi que la musculation depuis 4 ans, 1m87 pour 86 kg. J'ai une vitesse de fou, et des réflexes identiques à ma vitesse. J'ai juste à l'attendre qu'il me charge, l'esquiver et lui donner des bonnes patates dans la tête. Je le lâcherai pas à la moindre erreur, le gorille est fini. T'auras toujours des puceaux d'ici pour penser que c'est impossible. Rien n'est impossible avec de la volonté déjà les amis, et de 2) c'est pas avec votre corps de lâche que vous allez faire quoi que ce soit. N'importe quel homme un minimum entraîné peut vaincre un gorille avec un couteau déjà. À main nue c'est pas forcément plus compliqué ça demande juste de la technique.
      </p>
    </div>
  </div>
  )
}

function AlgorithmiCS () {
  return (
  <div className="asso impaire">
    <a href='https://linkcs.fr/association/competitive-programming-association-430'>
      <img className="asso-logo" src={algorithmics} alt="Logo d'AlgorithmiCS"></img>
    </a>
    <div className="asso-texte">
      <p>
        Sans rigoler. Je pratique la MMA depuis maintenant 6 ans, de la boxe en parallèle depuis 7 ans, je pourrai. Ainsi que la musculation depuis 4 ans, 1m87 pour 86 kg. J'ai une vitesse de fou, et des réflexes identiques à ma vitesse. J'ai juste à l'attendre qu'il me charge, l'esquiver et lui donner des bonnes patates dans la tête. Je le lâcherai pas à la moindre erreur, le gorille est fini. T'auras toujours des puceaux d'ici pour penser que c'est impossible. Rien n'est impossible avec de la volonté déjà les amis, et de 2) c'est pas avec votre corps de lâche que vous allez faire quoi que ce soit. N'importe quel homme un minimum entraîné peut vaincre un gorille avec un couteau déjà. À main nue c'est pas forcément plus compliqué ça demande juste de la technique.
      </p>
    </div>
  </div>
  )
}

function CSDesign () {
  return (
  <div className="asso impaire">
    <a href='https://csdesign.cs-campus.fr/'>
      <img className="asso-logo" src={design} alt="Logo de CSDesign"></img>
    </a>
    <div className="asso-texte">
      <p>
        Sans rigoler. Je pratique la MMA depuis maintenant 6 ans, de la boxe en parallèle depuis 7 ans, je pourrai. Ainsi que la musculation depuis 4 ans, 1m87 pour 86 kg. J'ai une vitesse de fou, et des réflexes identiques à ma vitesse. J'ai juste à l'attendre qu'il me charge, l'esquiver et lui donner des bonnes patates dans la tête. Je le lâcherai pas à la moindre erreur, le gorille est fini. T'auras toujours des puceaux d'ici pour penser que c'est impossible. Rien n'est impossible avec de la volonté déjà les amis, et de 2) c'est pas avec votre corps de lâche que vous allez faire quoi que ce soit. N'importe quel homme un minimum entraîné peut vaincre un gorille avec un couteau déjà. À main nue c'est pas forcément plus compliqué ça demande juste de la technique.
      </p>
    </div>
  </div>
  )
}

function CStudio () {
  return (
  <div className="asso">
    <a href='https://cstudio.cs-campus.fr/'>
      <img className="asso-logo" src={cstudio} alt="Logo de CStudio"></img>
    </a>
    <div className="asso-texte">
      <p>
        Sans rigoler. Je pratique la MMA depuis maintenant 6 ans, de la boxe en parallèle depuis 7 ans, je pourrai. Ainsi que la musculation depuis 4 ans, 1m87 pour 86 kg. J'ai une vitesse de fou, et des réflexes identiques à ma vitesse. J'ai juste à l'attendre qu'il me charge, l'esquiver et lui donner des bonnes patates dans la tête. Je le lâcherai pas à la moindre erreur, le gorille est fini. T'auras toujours des puceaux d'ici pour penser que c'est impossible. Rien n'est impossible avec de la volonté déjà les amis, et de 2) c'est pas avec votre corps de lâche que vous allez faire quoi que ce soit. N'importe quel homme un minimum entraîné peut vaincre un gorille avec un couteau déjà. À main nue c'est pas forcément plus compliqué ça demande juste de la technique.
      </p>
    </div>
  </div>
  )
}

function ClubTech () {
  return (
  <div className="asso impaire">
    <a href='https://linkcs.fr/association/club-tech-50'>
      <img className="asso-logo" src={clubtech} alt="Logo du Club Tech"></img>
    </a>
    <div className="asso-texte">
      <p>
        Sans rigoler. Je pratique la MMA depuis maintenant 6 ans, de la boxe en parallèle depuis 7 ans, je pourrai. Ainsi que la musculation depuis 4 ans, 1m87 pour 86 kg. J'ai une vitesse de fou, et des réflexes identiques à ma vitesse. J'ai juste à l'attendre qu'il me charge, l'esquiver et lui donner des bonnes patates dans la tête. Je le lâcherai pas à la moindre erreur, le gorille est fini. T'auras toujours des puceaux d'ici pour penser que c'est impossible. Rien n'est impossible avec de la volonté déjà les amis, et de 2) c'est pas avec votre corps de lâche que vous allez faire quoi que ce soit. N'importe quel homme un minimum entraîné peut vaincre un gorille avec un couteau déjà. À main nue c'est pas forcément plus compliqué ça demande juste de la technique.
      </p>
    </div>
  </div>
  )
}
export default Contact;