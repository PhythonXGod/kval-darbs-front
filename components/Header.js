import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import SearchBar from "@/components/SearchBar";
import BarsIcon from "@/components/icons/Bars";
import Link from "next/link";
import { useContext, useState } from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: #2E8A99;
`;
const Logo = styled(Link)`
  color:#fff;
  text-decoration:none;
  position: relative;
  z-index: 3;
  font-weight: bold;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  ${props => props.mobileNavActive ? `
    display: block;
  ` : `
    display: none;
  `}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #2E8A99;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color:#fff;
  text-decoration:none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding:0;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border:0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  const {cartProducts} = useContext(CartContext);
  const [mobileNavActive,setMobileNavActive] = useState(false);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={'/'}>P42</Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={'/products'}>Visi piedāvājumi</NavLink>
            <NavLink href={'/cart'}>Grozs ({cartProducts.length})</NavLink>
            <SearchBar />
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
      
    </StyledHeader>
  );
}