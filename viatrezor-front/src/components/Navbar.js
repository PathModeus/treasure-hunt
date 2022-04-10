import Navbar from "react-bootstrap/Navbar"
import Offcanvas from "react-bootstrap/Offcanvas"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"
import NavDropdown from "react-bootstrap/NavDropdown"
import FormControl from "react-bootstrap/FormControl"

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
                <Nav.Link href="#action1">Accueil</Nav.Link>
                <Nav.Link href="#action2">Enigme finale</Nav.Link>
                <Nav.Link href="#action3">Classement</Nav.Link>
                <Nav.Link href="#action4">Contact</Nav.Link>
                <Nav.Link href="#authenticate">Se connecter</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navbarvt