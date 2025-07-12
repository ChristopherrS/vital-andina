import React from "react";
import puceLogo from "/assets/puce-logo.png"; 
import "./Footer.css"; 


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-contenido">
        {/* Créditos PUCE */}
        <div className="footer-creditos">
          <img src={puceLogo} alt="Logotipo PUCE" className="puce-logo" />
          <p>
            <strong>Por favor tomar en cuenta:</strong> Créditos para la Aplicación/Página Web.  
            Proyecto desarrollado con fines académicos en la <b>PUCE</b>.
            El contenido, diseño e implementación fueron realizados exclusivamente 
            con fines educativos, sin fines de lucro, como un aporte a la promoción de
             la nutrición andina y la innovación tecnológica.

          </p>
        </div>

        {/* Redes Sociales */}
        <div className="footer-redes">
          <h4>Síguenos en redes sociales</h4>
          <div className="redes-icons">
            <a
              href="https://www.instagram.com/vitalandina6/"
              target="_blank"
              rel="noreferrer"
              title="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61577566711717"
              target="_blank"
              rel="noreferrer"
              title="Facebook"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://www.tiktok.com/@vitalandina6?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noreferrer"
              title="TikTok"
            >
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-copy">
        © {new Date().getFullYear()} Vital Andina. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
