import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(135deg,rgb(24, 87, 36),rgb(58, 148, 71))",
        color: "#fff",
        padding: "2rem 1rem",
        textAlign: "center",
        marginTop: "4rem",
      }}
    >
      <div style={{ marginBottom: "1rem", fontSize: "1.4rem", fontWeight: "600" }}>
        Síguenos en redes sociales
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          fontSize: "1.8rem",
        }}
      >
        <a
          href="https://www.instagram.com/vitalandina6/"
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram"
          style={{
            color: "#fff",
            transition: "transform 0.3s, color 0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#E1306C")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=61577566711717"
          target="_blank"
          rel="noopener noreferrer"
          title="Facebook"
          style={{
            color: "#fff",
            transition: "transform 0.3s, color 0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#1877F2")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
        >
          <FaFacebook />
        </a>
        <a
          href="https://www.tiktok.com/@vitalandina6?is_from_webapp=1&sender_device=pc"
          target="_blank"
          rel="noopener noreferrer"
          title="TikTok"
          style={{
            color: "#fff",
            transition: "transform 0.3s, color 0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#69C9D0")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
        >
          <FaTiktok />
        </a>
      </div>

      <div
        style={{
          marginTop: "1.5rem",
          fontSize: "0.9rem",
          color: "#ccc",
        }}
      >
        © {new Date().getFullYear()} Vital Andina. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
