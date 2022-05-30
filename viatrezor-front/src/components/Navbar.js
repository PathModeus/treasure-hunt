import Navbar from "react-bootstrap/Navbar"
import Offcanvas from "react-bootstrap/Offcanvas"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import { Outlet, Link } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"


function Navbarvt() {
  return (
    <div className = 'Navbarvt'>
      <Navbar className ="NavBG" bg="dark" variant="dark" expand={false}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/">Menu</Navbar.Brand>
          <Navbar.Toggle aria-controls="Menu" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Chasse au Rézo</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                
                <Nav.Link as={Link} to="/">Accueil</Nav.Link>  
                <Nav.Link as={Link} to="/enigma">Enigme finale</Nav.Link>              
                <Nav.Link as={Link} to="/leaderboard">Classement</Nav.Link>              
                <Nav.Link as={Link} to="/contact">Qui sommes nous?</Nav.Link>
                <Nav.Link as={Link} to="/create-team">Créer une équipe</Nav.Link>
                
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <section>
        <Outlet></Outlet>
      </section>

    </div>
  )
}

export default Navbarvt