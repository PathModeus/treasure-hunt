import React from "react";
import viarezo from '../assets/logo.png';
import linkcs from '../assets/linkcs.png';
import algorithmics from '../assets/AlgorithmiCS.png';
import clubtech from '../assets/ClubTech.png';
import design from '../assets/CSDesign.png';
import cstudio from '../assets/LogoCSTUDIO.png';
import '../styles/Contact.css'

function Contact() {
  return (
    <div>
      <h1 className="title">Qui sommes nous?</h1>
      <div className="wrap">
        <ViaRezo />
        <CSDesign />
        <LinkCS />
        <AlgorithmiCS />
        <CStudio />
        <ClubTech />
      </div>

    </div>
  )
}

function ViaRezo() {
  return (
    <div className="asso">
      <a href='https://viarezo.fr'>
        <img className="asso-logo" src={viarezo} alt="logo de ViaRézo"></img>
      </a>
      <div className="asso-texte">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  )
}

function LinkCS() {
  return (
    <div className="asso">
      <a href='https://linkcs.fr'>
        <img className="asso-logo" src={linkcs} alt='logo de LinkCS'></img>
      </a>
      <div className="asso-texte">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  )
}

function AlgorithmiCS() {
  return (
    <div className="asso impaire">
      <a href='https://linkcs.fr/association/competitive-programming-association-430'>
        <img className="asso-logo" src={algorithmics} alt="Logo d'AlgorithmiCS"></img>
      </a>
      <div className="asso-texte">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  )
}

function CSDesign() {
  return (
    <div className="asso impaire">
      <a href='https://csdesign.cs-campus.fr/'>
        <img className="asso-logo" src={design} alt="Logo de CSDesign"></img>
      </a>
      <div className="asso-texte">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  )
}

function CStudio() {
  return (
    <div className="asso">
      <a href='https://cstudio.cs-campus.fr/'>
        <img className="asso-logo" src={cstudio} alt="Logo de CStudio"></img>
      </a>
      <div className="asso-texte">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  )
}

function ClubTech() {
  return (
    <div className="asso impaire">
      <a href='https://linkcs.fr/association/club-tech-50'>
        <img className="asso-logo" src={clubtech} alt="Logo du Club Tech"></img>
      </a>
      <div className="asso-texte">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  )
}
export default Contact;