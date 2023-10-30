import React from "react";
import { Container } from "react-bootstrap";
import "./about.css";
import logo from "../../assets/logo-sctk.png";

const About = () => {
  return (
    <div className="about-container">
      <Container>
        <div className="about">
          <div className="wrap-about">
            <h1 className="title">
              Profil Singkat <br /> PT Sarana Catur Tirtakelola
            </h1>
            <p className="description">
              Pada Oktober 1997 Sarana Catur Tirtakelola (SCTK) memulai operasional pelayanan air bersih/minum untuk pertama kalinya. Seiring dengan perkembangan industri di Kabupaten Serang, maka SCTK juga meningkatkan kapasitas
              pelayanannya. Pada tahun 2013 sesuai dengan Perpanjangan Perjanjian Konsesi dengan Pemkab Serang, SCTK memulai proses peningkatan kapasitas Sistem Pelayanan Air Minum (SPAM). Pada 2016 selesai dibangun SPAM berkapasitas 350
              liter per detik (lpd) dari yang sebelumnya hanya 100 lpd.
            </p>
            <p>Secara ringkas, SPAM yang dikelola SCTK adalah sebagai berikut:Air baku diambil dari Sungai Ciujung menggunakan Bangunan Intake berkapasitas 400 lpd.</p>
          </div>
          <div className="image">
            <img src={logo} alt="about HopePoints" />
          </div>
        </div>
      </Container>
    </div>
  );
};
export default About;
