import { useNavigate } from "react-router-dom"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from "react-bootstrap";
import './nav.css';
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "./authSlice";

const Navv = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth)
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/')
  }
  return(
    <Navbar id="nav" bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Database Project</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={() => navigate("/")}>Top 5 Queries</Nav.Link>
            {user ? (
              <>
                <Nav.Link onClick={() => navigate("/channels")}>Channels+Filter</Nav.Link>
                <Nav.Link onClick={() => navigate("/longitude")}>Longitude Search</Nav.Link>
                <Nav.Link onClick={() => navigate("/favorite")}>Favorites list</Nav.Link>
                <Nav.Link onClick={onLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link onClick={() => navigate("/register")}>Sign up</Nav.Link>
                <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
              </>
            )}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navv;