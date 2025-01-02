import styled from 'styled-components';

const Nav = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
  background-color: #0a192f;
  z-index: 1000;
  padding: 1rem 2rem;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
`;

const Logo = styled.div`
  color: #64ffda;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ccd6f6;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled.a`
  color: #ccd6f6;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #64ffda;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <NavContent>
        <NavLinks>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#experience">Experience</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </NavLinks>
      </NavContent>
    </Nav>
  );
};

export default Navbar;
