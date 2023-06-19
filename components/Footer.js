import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #222;
  padding: 20px;
  text-align: center;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
`;

const FooterText = styled.p`
  color: #888;
  font-size: 14px;
  margin: 0;
`;

const FooterLink = styled.a`
  color: #888;
  text-decoration: none;

  &:hover {
    color: #555;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        © 2023 P42. All rights reserved.
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;


