import React from 'react'
import { Navbar, 
  //Button, NavbarBrand, Form, FormControl,
  Offcanvas, Nav, Container, NavDropdown,Button 
   } from 'react-bootstrap';
// import Image from 'next/image'
import ilink from '../../assets/images/ilink.png';
import hug from '../../assets/images/hug.png';
import { Link ,NavLink } from 'react-router-dom';
// import ilink from '../../assets/images/ilink.png'


export default function topbar(props) {
  console.log(props.address,"hello");

 

    return (
        <>
<Navbar collapseOnSelect expand="lg" bg="transparent" variant="dark">
  <Container>
  <Navbar.Brand href={"/home"} style={{letterSpacing:2}}><img src={hug}/></Navbar.Brand>
  <Button variant="outlined" className="topbar-btn connct-wallet-btn mobileview">
    {props.address}
      <img src={ilink} alt="ilink" className="btn-img"/>
          </Button>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    {/* <Nav className="me-auto">
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav> */}
    
    <Nav placement="justify-content-end">
    <Nav.Link>
    <Button variant="outlined" className="topbar-btn connct-wallet-btn">
    {props.address}
    {/* <div>
    <Image
      src='../../assets/images/ilink.png'
      alt="Picture of the author"
      width="10"
      height="10"
      /> </div> */}
      <img src={ilink} alt="ilink" className="btn-img"/>
          </Button></Nav.Link>
      <Nav.Link href="/bonds" color = '#242429'>BONDS </Nav.Link>
      <Nav.Link eventKey={2} href={"/topbutton"}>
        DEX
      </Nav.Link>
      <Navbar.Toggle aria-controls="offcanvasNavbar" className="main-toggler"/>

      <Navbar.Offcanvas
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
      placement="end"
    >   
      <Offcanvas.Header closeButton>
        <Offcanvas.Title id="offcanvasNavbarLabel">BONDIE</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="justify-content-end flex-grow-1 pe-3">
          <Nav.Link href={"/home"}>Home</Nav.Link>
          <Nav.Link href={'/bonds'}>Bond</Nav.Link>
          {/* <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
              Something else here
            </NavDropdown.Item>
          </NavDropdown> */}
        </Nav>

      </Offcanvas.Body>
      
    </Navbar.Offcanvas>     
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
        </>
    )
}
