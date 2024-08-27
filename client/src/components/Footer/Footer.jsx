import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer">
      <p>Copyright ⓒ {year}</p>
    </div>
  );
}

export default Footer;
