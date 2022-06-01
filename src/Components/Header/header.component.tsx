import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export const HeaderComponent = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#home" as={Link} to="/">
          <img
            alt=""
            src={"./assets/imagen/logo.jpg"}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          Home
        </Navbar.Brand>
        <Navbar.Brand href="#list" as={Link} to="/list">
          Lista de permisos
        </Navbar.Brand>
        <Navbar.Brand href="#create" as={Link} to="/create">
          Crear Permisos
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}