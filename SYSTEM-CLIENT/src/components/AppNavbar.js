import { useContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavbar() {
    
    const { user } = useContext(UserContext);

    return (
        <Navbar expand="lg" className="bg-body-tertiary sticky-top shadow">
            <Container>
                <Navbar.Brand href="#home" className="fw-bold">UA ENROLLMENT</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {/* Default */}
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/courses">Courses</Nav.Link>

                        {
                            (user.id !== null) ? (
                                user.isAdmin === true ? (
                                    <>
                                        {/* Login with Admin Privileges */}
                                        <Nav.Link as={Link} to="/add-course">Add Course</Nav.Link>
                                        <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                        <Nav.Link as={Link} to="/logout" className="rounded-pill bg-primary text-white">Logout</Nav.Link>
                                    </>
                                ) : (
                                    <>
                                        {/* Login as Regular User */}
                                        <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                        <Nav.Link as={Link} to="/logout" className="rounded-pill bg-primary text-white">Logout</Nav.Link>
                                    </>
                                )
                            ) : (
                                <>
                                    {/* Logout */}
                                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                                    <Nav.Link as={Link} to="/login" className="rounded-pill bg-primary text-white">Login</Nav.Link>
                                </>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
