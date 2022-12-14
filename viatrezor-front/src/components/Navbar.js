import Navbar from "react-bootstrap/Navbar"
import Offcanvas from "react-bootstrap/Offcanvas"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import { Outlet, Link } from "react-router-dom"
import { useContext } from "react"
import { Session } from "../Param"

function Navbarvt() {
  const [session,] = useContext(Session);

  return (
    <div className='Navbarvt'>
      <Navbar style={{ minHeight: '70px' }} className="NavBG" bg="dark" variant="dark" expand={false} collapseOnSelect>
        <Container fluid>
          <Navbar.Brand as={Link} to="/">Menu</Navbar.Brand>
          <span style={{ color: 'white', fontSize: '20px', fontWeight: '400' }}>Chasse au trésor ViaRézo</span>
          <Navbar.Toggle aria-controls="Menu" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Chasse au trésor ViaRézo</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">

                <Nav.Link as={Link} to="/" href="/">Accueil</Nav.Link>
                <Nav.Link as={Link} to="/login" href="/login">S'authentifier</Nav.Link>
                {session &&
                  <>
                    <Nav.Link as={Link} to="/leaderboard" href="/leaderboard">Classement</Nav.Link>
                    <Nav.Link as={Link} to="/contact" href="/contact">Qui sommes nous?</Nav.Link>
                    {session?.role?.admin &&
                      <>
                        <Nav.Link as={Link} to="/create-team" href="/create-team">Créer une équipe</Nav.Link>
                        <Nav.Link as={Link} to="/admin" href="/admin">Interface administrateur</Nav.Link>
                      </>
                    }
                  </>
                }
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
