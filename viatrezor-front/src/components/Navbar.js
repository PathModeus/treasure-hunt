import Navbar from "react-bootstrap/Navbar"
import Offcanvas from "react-bootstrap/Offcanvas"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import { LinkContainer } from "react-router-bootstrap"


function Navbarvt() {
  return (
    <div className = 'Navbarvt'>
      <Navbar bg="dark" variant="dark" expand={false}>
        <Container fluid>
          <Navbar.Brand href="#">Menu</Navbar.Brand>
          <Navbar.Toggle aria-controls="Menu" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Chasse au Trézor</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <LinkContainer to="/home">
                  <Nav.Link>Accueil</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/enigm">
                  <Nav.Link>Enigme finale</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/leaderboard">
                  <Nav.Link>Classement</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/contact">
                  <Nav.Link>Contact</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/auth">
                  <Nav.Link>Se connecter</Nav.Link>
                </LinkContainer>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navbarvt