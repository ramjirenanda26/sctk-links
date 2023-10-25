import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AiFillInstagram } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import "./footer.css";
import logo from "../../assets/logo-sctk.png";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col sm={3} className="footer-info d-flex flex-column align-items-center">
            <a className="footer-logo d-flex align-items-center" href="/">
              <img src={logo} className="rounded" alt="Logo HopePoints" />
            </a>
            <p className="footer-text">
              <p className="footer-text">
                <strong>PT Sarana Catur Tirtakelola </strong>
              </p>
              Jl. Irigasi Pamarayan Timur Kp. Darat Sawah RT. 14 / 02, Ds. Cijeruk, Kibin - Kab. Serang
            </p>
          </Col>
          <Col sm={6} className="footer-team">
            <h5>
              <strong>Contact</strong>
            </h5>
            <ul className="footer-list">
              <li className="footer-item-name">
                <a href="tel:xxx" target="_blank" className="footer-link py-3" rel="noreferrer">
                  Marketing 1
                </a>
              </li>
              <li className="footer-item-name">
                <a href="tel:xxx" target="_blank" className="footer-link py-3" rel="noreferrer">
                  Marketing 2
                </a>
              </li>
              <li className="footer-item-name">
                <a href="tel:xxx" target="_blank" className="footer-link py-3" rel="noreferrer">
                  Marketing 3
                </a>
              </li>
            </ul>
          </Col>
          <Col sm={3} className="footer-social">
            <h5>
              <strong>Social Media</strong>
            </h5>
            <ul className="footer-list">
              <li className="footer-item-social">
                <a href="https://www.instagram.com/saranacaturtirtakelola/" target="_blank" className="footer-link" rel="noreferrer">
                  <AiFillInstagram />
                </a>
                <span>Instagram</span>
              </li>
              <li className="footer-item-social">
                <a href="https://sctk.co.id/" target="_blank" className="footer-link" rel="noreferrer">
                  <CgWebsite />
                </a>
                <span>Website</span>
              </li>
            </ul>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm className="footer-bottom">
            <p className="footer-text text-center">
              Copyright &copy;2023 <strong>PT Sarana Catur Tirtakelola.</strong> All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
