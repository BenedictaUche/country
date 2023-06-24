import { Container, Navbar } from "react-bootstrap";

export default function Navbars() {
  return (
    <Navbar
      className="fixed-top shadow-lg bg-gray-800 py-6 "
    >
      <Container className="container-fluid">
        <Navbar.Brand
          href="#home"
          className="font-bold text-lg sm:text-xl text-white"
        >
          Where in the world?
        </Navbar.Brand>
        <Navbar.Toggle />
        
      </Container>
    </Navbar>
  );
}