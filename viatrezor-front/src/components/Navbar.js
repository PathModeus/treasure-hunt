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
      <Navbar style={{ minHeight: '70px' }} className="NavBG" bg="dark" variant="dark" expand={false}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/">Menu</Navbar.Brand>
          <span style={{ color: 'white', fontSize: '20px', fontWeight: '400' }}>Chasse au Rézo</span>
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
                <Nav.Link as={Link} to="/login">S'authentifier</Nav.Link>
                {session &&
                  <>
                    <Nav.Link as={Link} to="/leaderboard">Classement</Nav.Link>
                    <Nav.Link as={Link} to="/contact">Qui sommes nous?</Nav.Link>
                    {session?.role?.admin &&
                      <>
                        <Nav.Link as={Link} to="/create-team">Créer une équipe</Nav.Link>
                        <Nav.Link as={Link} to="/admin">Interface administrateur</Nav.Link>
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