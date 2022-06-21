import React from "react";
import '../styles/Contact.css'


function Contact(props) {

  const listeAsso = props.listeAsso.map((asso) => <Asso asso={asso} />)

  return (
    <div>
      <h1 className="title">Qui sommes nous ?</h1>
      <div className="wrap">
        {listeAsso}
      </div>

    </div>
  )
}

function Asso(props) {
  const textImg = "logo de " + props.asso.name
  return (
    <div className="asso">
      <a href={props.asso.website}>
        <img className="asso-logo" src={props.asso.pathLogo} alt={textImg} ></img>
      </a>
      <div className="asso-texte">
        <p>
          {props.asso.texteAsso}
        </p>
      </div>
    </div>
  )

}

export default Contact;