import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";


  
const Footer = () => {
  return (
    <MDBFooter color="black" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">ViaRézo</h5>
            <div className='column'>
              <ul>
              <li className="list-unstyled">
                <a href="#!">Présentation</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Contacts</a>
              </li>
              <li className="list-unstyled">
                <a href="https://viarezo.fr/">Notre Site</a>
              </li>
            </ul>
            </div>
            <h5>Je suis bloqué par une énigme</h5>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Links</h5>
            
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://viarezo.fr/"> ViaRézo </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}
  
export default Footer