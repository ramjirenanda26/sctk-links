import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFilePen, FaTableColumns } from 'react-icons/fa6';
import { FaMapMarkedAlt } from 'react-icons/fa';
import './home.css';

const Features = () => {
  const navigate = useNavigate();
  return (
    <section className="feature p-4">
      <h1 className="mb-4 mt-3">
        Explore Our Features<p className="featureBline"></p>
      </h1>
      <p className="mb-5">SCTK-Links menyediakan layanan untuk mempermudah sambung pipa ke lokasi layanan</p>
      <div className="container-fluid mb-5">
        <div className="row g-3 d-flex justify-content-around align-items-center">
          <div className="col-md-3 mb-3">
            <div className="featureForm" onClick={() => navigate('/form')}>
              <i>
                <FaFilePen />
              </i>
              <h2 className="featureFormTitle">Form</h2>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="featureForm" onClick={() => navigate('/map')}>
              <i>
                <FaMapMarkedAlt />
              </i>
              <h2 className="featureFormTitle">Maps</h2>
            </div>
          </div>
          <div className="col-md-3">
            <div className="featureForm" onClick={() => navigate('/office')}>
              <i>
                <FaTableColumns />
              </i>
              <h2 className="featureFormTitle">Dashboard</h2>
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => navigate('/register')}>Daftar</button>
    </section>
  );
};

export default Features;
