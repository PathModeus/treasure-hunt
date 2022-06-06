import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";


//rgb(5,91,165)

function Footer() {

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-4" style={{ textAlign: "center" }}>
            <h4 className="h4" style={{ color: "white" }}>ViaRézo</h4>
            <ul className="list-unstyled" style={{}}>
              <li><a style={{ color: "white" }} href="#!">Présentation</a></li>
              <li><a style={{ color: "white" }} href="#!">Contacts</a></li>
              <li><a style={{ color: "white" }} href="https://viarezo.fr/">Notre Site</a></li>
            </ul>
          </div>

          <div className="col-md-4 col-sm-4" style={{ textAlign: "center" }}>
            <h6 className="h6">Je suis bloqué.e par une énigme</h6>
          </div>

          <div className="col-md-4 col-sm-4" style={{ textAlign: "center" }}>
            <h4 className="h4" style={{ color: "white" }}>Links</h4>
            <ul className="list-unstyled" style={{}}>
              <li><a style={{ color: "white" }} href="#!">Présentation</a></li>
              <li><a style={{ color: "white" }} href="#!">Contacts</a></li>
              <li><a style={{ color: "white" }} href="https://viarezo.fr/">Notre Site</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom" style={{ color: "white" }}>
        <p className="text-xs-center">
          &copy; {new Date().getFullYear()} Copyright: <a href="https://viarezo.fr/"> ViaRézo </a>
        </p>
      </div>
    </footer>
  )
}

//&copy; {new Date().getFullYear()} Copyright: <a href="https://viarezo.fr/"> ViaRézo </a>


export default Footer;
