import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="hero">
        <Container>
          <div className="d-flex">
            <div className="wrap-text">
              <h1 className="title">
                Ayo Bergabung <br /> menjadi <br /> Konsumen SCTK!
              </h1>
              <p>
                Sayangi lingkungan dengan tidak menggunakan <br /> Air Bawah Tanah (ABT) dengan berlebihan!
              </p>
              <button onClick={() => navigate("/form")}>Daftar</button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Hero;
