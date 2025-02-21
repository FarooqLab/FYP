import '../../assets/home-css/footer.css'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Company</h4>
          <p>About Us</p>
          <p>Careers</p>
          <p>Contact</p>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2023 YourBrand. All rights reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;
