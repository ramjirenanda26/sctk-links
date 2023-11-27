import React, { useState } from 'react';
import { Container, Row, Col, Table, Card } from 'react-bootstrap';
import Navigation from '../../Components/Navigation/Navigation';
import { GetRegistrationByid } from '../../Utils/crudData';

import './profile.css';
import MenuProfile from '../../Components/DashboardProfileComp/Menu';

function ListReportProfile() {
  const usersData = localStorage.getItem('user');
  const user = JSON.parse(usersData);
  const userData = user.user;
  const uid = userData.uid;
  const [registrations, setRegistrations] = useState([]);

  return (
    <>
      <Navigation />

      <Container className="profile-container">
        <Row>
          <MenuProfile />
          <Col sm={9}>
            <Card className="">
              <Card.Header>
                <p>Status Pendaftaran Anda</p>
              </Card.Header>
              <Card.Body>
                <Table responsive bordered hover className="bg-white">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Tanggal Pendaftaran</th>
                      <th>Company</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((registration, index) => (
                      <tr key={registration.idRegistration}>
                        <td>{index + 1}</td>
                        <td>{registration.tgl}</td>
                        <td>{registration.company}</td>
                        <td>{registration.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <GetRegistrationByid setRegistrations={setRegistrations} uid={uid} />
      </Container>
    </>
  );
}

export default ListReportProfile;
