import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./about.css";

const VisiMisi = () => {
  return (
    <div className="visi_misi">
      <Container>
        <Row>
          <Col md="auto">
            <div className="visi_content">
              <h1 className="mb-4 mt-3">
                Visi<p className="visi_Bline"></p>
              </h1>
              <p>Menjadi perusahaan nasional penyedia air bersih yang terintegrasi dan berkelanjutan untuk masyarakat domestik, industri maupun komersial.</p>
            </div>
          </Col>
          <div className="visi_content">
            <h1 className="mb-4 mt-3">
              Misi<p className="visi_Bline"></p>
            </h1>
            <p>Melayani pemenuhan kebutuhan air bersih konsumen pelanggan di kabupaten serang khususnya serang timur baik industri maupun masyarakat dengan mengutamakan mutu dan pelayanan demi kepuasan pelanggan.</p>
          </div>
          <div className="visi_content">
            <h1 className="mb-4 mt-3">
              Budaya<p className="visi_Bline"></p>
            </h1>
            <p>
              Berkomitmen memberikan jasa pelayanan terbaik kepada pelanggan.Menjadikan tantangan sebagai hal yang harus diselesaikan secara tuntas.Selalu meningkatkan kemampuan dan kemauan dalam pelayanan.Kekeluargaan, kejujuran, dan
              ketulusan sebagai landasan bertindak dan berfikir dalam bekerjasama dan bersama bekerja.Komitmen untuk menjaga lingkungan terus menerus guna menjaga ketersediaan air permukaan
            </p>
          </div>
        </Row>
      </Container>
    </div>
  );
};
export default VisiMisi;
