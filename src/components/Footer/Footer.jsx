import './Footer.css';

export const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer__title">
          <h1>AutoElite</h1>
        </div>
        <div className="footer__icons">
          <a href="" target="_blank">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="" target="_blank">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="mailto:email@email.com" target="_blank" rel="noreferrer">
            <i className="fa-solid fa-envelopes-bulk"></i>
          </a>
        </div>
        <div className="footer__FAQ">
          <h2>
            FAQ
          </h2>
        </div>
      </footer>
    </>
  );
};
