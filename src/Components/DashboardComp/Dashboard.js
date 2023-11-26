import React, { useState } from 'react';
import Map, { Marker, NavigationControl, ScaleControl, GeolocateControl } from 'react-map-gl';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import './dashboardcomp.css';
import { GetRegistration } from '../../Utils/crudData';
import { getUserRoleFromLocalStorage } from '../../Utils/UserData';

const token = 'pk.eyJ1IjoicmVuYW5kYTI2IiwiYSI6ImNsaHgxMTkzdzBsZWkzbW4wMnZ5cDd0OTgifQ.ubLqseZPFD3Ym8ENEzvbCw';
const userRole = getUserRoleFromLocalStorage();

const Dashboard = () => {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [viewport, setViewPort] = useState({
    longitude: 106.33834462741254,
    latitude: -6.199113200732568,
    zoom: 11,
  });

  const getProcessedRegistrationsCount = () => {
    const processedRegistrations = registrations.filter((registration) => registration.status === 'proses');
    return processedRegistrations.length;
  };

  const getDoneRegistrationsCount = () => {
    const doneRegistrations = registrations.filter((registration) => registration.status === 'selesai');
    return doneRegistrations.length;
  };

  const getCanceledRegistrationsCount = () => {
    const canceledRegistrations = registrations.filter((registration) => registration.status === 'tolak');
    return canceledRegistrations.length;
  };

  return (
    <div className="container-dashboard">
      <h2 className="text-white text-center mb-3">Dashboard</h2>
      <div className="container-fluid px-0">
        <div className="row g-3 d-flex justify-content-between">
          <div className="col-md-3">
            <Card>
              <Card.Body className="text-center">
                <Card.Title as="h3">Pendaftar</Card.Title>
                <Card.Text className="fs-4">{registrations.length}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-3">
            <Card>
              <Card.Body className="text-center">
                <Card.Title as="h3">Proses</Card.Title>
                <Card.Text className="fs-4">{getProcessedRegistrationsCount()}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-3">
            <Card>
              <Card.Body className="text-center">
                <Card.Title as="h3">Selesai</Card.Title>
                <Card.Text className="fs-4">{getDoneRegistrationsCount()}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-3">
            <Card>
              <Card.Body className="text-center">
                <Card.Title as="h3">Ditolak</Card.Title>
                <Card.Text className="fs-4">{getCanceledRegistrationsCount()}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
        <Card className="my-3" style={{ width: '100wh', height: '30rem' }}>
          <Card.Body>
            <Map initialViewState={viewport} mapboxAccessToken={token} mapStyle="mapbox://styles/renanda26/cli49zhib02nc01qyaka1dq8w" width="100%" height="100%" onViewportChange={setViewPort}>
              {registrations.map((registration) => (
                <Marker
                  key={registration.idRegistration}
                  latitude={registration.location.latitude}
                  longitude={registration.location.longitude}
                  offsetleft={-3.5 * viewport.zoom}
                  offsetTop={-7 * viewport.zoom}
                  draggable={false}
                  style={{ zIndex: 999 }}
                  onClick={() => navigate(`/dashboard/registration/detail/${registration.idRegistration}`)}
                >
                  <i
                    className="fa-solid fa-location-dot"
                    style={{
                      fontSize: 2 * viewport.zoom,
                      color: 'tomato',
                      cursor: 'pointer',
                    }}
                  ></i>
                </Marker>
              ))}
              <GeolocateControl position="bottom-right" />
              <NavigationControl position="bottom-right" />
              <ScaleControl />
            </Map>
          </Card.Body>
        </Card>
        {userRole === 'admin' && <GetRegistration setRegistrations={setRegistrations} />}
      </div>
    </div>
  );
};

export default Dashboard;
