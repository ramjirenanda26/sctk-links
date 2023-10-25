import React from "react";
import { Accordion } from "react-bootstrap";
import "./home.css";

const Layanan = () => {
  return (
    <>
      <div className="layanan">
        <div>
          <ul>
            <li>
              <h2>190++</h2>
              <p>Konsumen</p>
            </li>
            <li>
              <h2>27 km</h2>
              <p>Keterjangkauan</p>
            </li>
            <li>
              <h2>24 jam</h2>
              <p>Kontinuitas</p>
            </li>
            <li>
              <h2>100%</h2>
              <p>Kualitas</p>
            </li>
          </ul>

          <Accordion defaultActiveKey="0" className="dropdown">
            <Accordion.Item eventKey="0">
              <Accordion.Header className="dropdownHeader">Layanan Kami</Accordion.Header>
              <Accordion.Body>
                <p>Konsumen : 190++</p>
                <p>Keterjangkauan : 27 km</p>
                <p>Kontinuitas : 24 jam</p>
                <p>Kualitas : 100%</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default Layanan;
