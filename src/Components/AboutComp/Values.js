import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { FaRegHandPointUp, FaRegHandshake, FaTree } from 'react-icons/fa';
import { IoBarChartSharp } from 'react-icons/io5';
import './about.css';

const Values = () => {
  return (
    <div className="values">
      <Container>
        <h1 className="title-values">Our Core Values</h1>
        <p className="description-values">Kultur perusahaan sangat penting untuk berjalannya bisnis. Perusahaan berdiri dengan 5 pilar utama untuk sukses, di antaranya:</p>

        <div className="cardItem">
          <div className="row justify-content-center align-items-center">
            <Card className="cardItemValues" style={{ width: '18rem', height: '5rem' }}>
              <div>
                <h3>
                  <span className="logo-ref-values">
                    <HiOutlineLightBulb />
                  </span>
                  Optimistic
                </h3>
              </div>
            </Card>
            <Card className="cardItemValues" style={{ width: '18rem', height: '5rem' }}>
              <div>
                <h3>
                  <span className="logo-ref-values">
                    <FaRegHandPointUp />
                  </span>
                  Willing
                </h3>
              </div>
            </Card>
            <Card className="cardItemValues" style={{ width: '18rem', height: '5rem' }}>
              <div>
                <h3>
                  <span className="logo-ref-values">
                    <IoBarChartSharp />
                  </span>
                  Growing
                </h3>
              </div>
            </Card>
            <Card className="cardItemValues" style={{ width: '18rem', height: '5rem' }}>
              <div>
                <h3>
                  <span className="logo-ref-values">
                    <FaRegHandshake />
                  </span>
                  Team Up
                </h3>
              </div>
            </Card>
            <Card className="cardItemValues" style={{ width: '18rem', height: '5rem' }}>
              <div>
                <h3>
                  <span className="logo-ref-values">
                    <FaTree />
                  </span>
                  Harmonious
                </h3>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Values;
