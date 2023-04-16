import { FooterComponent } from 'flowbite-react';

const Footer = () => {
  return (
    <FooterComponent container={true}>
      <FooterComponent.Copyright href="#" by="Arachnophobia" year={2023} />
      <FooterComponent.LinkGroup>
        <FooterComponent.Link href="#">About</FooterComponent.Link>
        <FooterComponent.Link href="#">Privacy Policy</FooterComponent.Link>
        <FooterComponent.Link href="#">Licensing</FooterComponent.Link>
        <FooterComponent.Link href="#">Contact</FooterComponent.Link>
      </FooterComponent.LinkGroup>
    </FooterComponent>
  );
};

export default Footer;
