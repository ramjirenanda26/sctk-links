import React, { useState } from 'react';
import Map, { Marker, NavigationControl, ScaleControl, GeolocateControl } from 'react-map-gl';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { GetDetailRegistration, handelChangeStatus } from '../../Utils/crudData';
import Swal from 'sweetalert2';

const token = 'pk.eyJ1IjoicmVuYW5kYTI2IiwiYSI6ImNsaHgxMTkzdzBsZWkzbW4wMnZ5cDd0OTgifQ.ubLqseZPFD3Ym8ENEzvbCw';
const DashDetailRegistration = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [registration, setRegistration] = useState(null);
  const [viewport, setViewPort] = useState({
    width: '100%',
    height: '25rem',
    latitude: 0,
    longitude: 0,
    zoom: 15,
  });

  const handleProcessSubmit = async () => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: 'Konfirmasi',
        text: 'Apakah Anda yakin ingin memproses registrasi ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya',
        cancelButtonText: 'Batal',
      });

      if (isConfirmed) {
        // Perbarui status menjadi "Diproses" di database
        const setStatus = 'proses';
        handelChangeStatus(setRegistration, setStatus, id);

        Swal.fire('Berhasil', 'Status registratis berhasil diperbarui!', 'success');
      }
    } catch (error) {
      console.log('Error updating status:', error);
    }
  };

  const handleSelesaiSubmit = async () => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: 'Konfirmasi',
        text: 'Apakah Anda yakin ingin menyelesaikan laporan ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya',
        cancelButtonText: 'Batal',
      });

      if (isConfirmed) {
        const setStatus = 'selesai';
        handelChangeStatus(setRegistration, setStatus, id);

        Swal.fire('Berhasil', 'Status laporan berhasil diperbarui!', 'success');
      }
    } catch (error) {
      console.log('Error updating status:', error);
    }
  };

  const handleBatalSubmit = async () => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: 'Konfirmasi',
        text: 'Apakah Anda yakin ingin menolak laporan ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya',
        cancelButtonText: 'Batal',
      });

      if (isConfirmed) {
        const setStatus = 'tolak';
        handelChangeStatus(setRegistration, setStatus, id);

        Swal.fire('Berhasil', 'Status laporan berhasil ditolak!', 'success');
      }
    } catch (error) {
      console.log('Error updating status:', error);
    }
  };

  return (
    <div className="container-dashboard">
      <GetDetailRegistration setRegistration={setRegistration} setViewPort={setViewPort} id={id} />
      <h2 className="text-white my-3">Detail Registration</h2>
      <Card>
        <Card.Header>
          <div>
            <Button variant="danger" type="cancel" onClick={() => navigate('/dashboard/registration')}>
              Back
            </Button>
          </div>
        </Card.Header>
        <Card.Body className="">
          <Card className="p-3 mb-3">
            <div style={{ textAlign: 'left' }}>
              <strong>Tanggal Pelaporan</strong> <br />
              <small>{registration?.tgl}</small> <br />
              <strong>Status : </strong>
              <small>{registration?.status}</small>
            </div>
          </Card>

          <div className="row">
            <div className="col-md-6">
              <label className="mb-2">
                <b>Lokasi Pintu Perusahaan/PT</b>
              </label>
              <Card className="mb-3" style={{ width: '100%', height: '25rem' }}>
                <Card.Body>
                  {registration && registration.location && (
                    <Map initialViewState={viewport} mapboxAccessToken={token} mapStyle="mapbox://styles/renanda26/cli49zhib02nc01qyaka1dq8w" width="100%" height="100%" onViewportChange={setViewPort}>
                      <Marker
                        key={registration?.idRegistration}
                        latitude={registration?.location.latitude}
                        longitude={registration?.location.longitude}
                        offsetleft={-3.5 * viewport.zoom}
                        offsetTop={-7 * viewport.zoom}
                        draggable={false}
                        style={{ zIndex: 999 }}
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
                      <GeolocateControl position="bottom-right" />
                      <NavigationControl position="bottom-right" />
                      <ScaleControl />
                    </Map>
                  )}
                </Card.Body>
              </Card>
              <div>
                {/* Modify the label for latitude and longitude */}
                <label>
                  Latitude & Longitude:
                  <input type="text" value={`${registration?.location.latitude}, ${registration?.location.longitude}`} readOnly />
                </label>
                <Form.Group controlId="formGridImg" style={{ marginBottom: '1rem' }}>
                  <Form.Label>Gambar</Form.Label>
                  <br />
                  {registration?.img ? <img src={registration.img} alt="Gambar" className="img-fluid" /> : <p>Gambar tidak tersedia</p>}
                </Form.Group>
              </div>
            </div>
            <div className="col-md-6">
              <label className="mb-2">
                <b>Detail Pendaftaran</b>
              </label>
              <Form>
                <Form.Group className="mb-3" controlId="formGroupName">
                  <Form.Label>Informasi Pendaftar</Form.Label>
                  <Card>
                    <Card.Body
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <Card.Text>
                          <strong>Nama:</strong> {registration?.name}
                          <br />
                          <strong>Email:</strong> {registration?.email}
                          <br />
                          <strong>Telephone:</strong> {registration?.tlfn}
                        </Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupTitle">
                  <Form.Group className="mb-3" controlId="formGroupName">
                    <Form.Label>Tanggal Pendaftaran</Form.Label>
                    <Form.Control type="dateandtime" placeholder="" defaultValue={registration?.tgl} readOnly />
                  </Form.Group>
                  <Form.Label>Nama Perusahaan</Form.Label>
                  <Form.Control type="text" defaultValue={registration?.company} readOnly />
                  <Form.Label>Nama Direksi</Form.Label>
                  <Form.Control type="text" defaultValue={registration?.director} readOnly />
                  <Form.Label>Nomor Telephone Perusahaan</Form.Label>
                  <Form.Control type="text" defaultValue={registration?.phone} readOnly />
                  <Form.Label>Jenis Usaha</Form.Label>
                  <Form.Control type="text" defaultValue={registration?.business} readOnly />
                  <Form.Label>Hasil Produksi</Form.Label>
                  <Form.Control type="text" defaultValue={registration?.product} readOnly />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupName">
                  <Form.Label>Alamat Perusahaan</Form.Label>
                  <Form.Control type="dateandtime" placeholder="" defaultValue={registration?.address} readOnly />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress">
                  <Form.Label>Peruntukan Air</Form.Label>
                  <Form.Control
                    placeholder="1234 Main St"
                    defaultValue={[registration?.useProd ? 'Produksi' : '', registration?.useMachine ? 'Broiler/Mesin' : '', registration?.useConsume ? 'Minum' : '', registration?.useDomestic ? 'Mandi/Cuci' : ''].filter(Boolean).join(', ')}
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridAddress">
                  <Form.Label>Besar Penggunaan Air</Form.Label>
                  <Form.Control type="text" defaultValue={registration?.waterUsage} readOnly />
                </Form.Group>

                {registration?.status !== 'tolak' && (
                  <Button variant="danger" onClick={handleBatalSubmit}>
                    Tolak
                  </Button>
                )}
                {registration?.status === 'pending' ? (
                  <>
                    <Button variant="warning" style={{ marginLeft: '5px' }} onClick={handleProcessSubmit}>
                      Proses
                    </Button>
                  </>
                ) : (
                  <>
                    {registration?.status === 'proses' && (
                      <Button variant="success" style={{ marginLeft: '5px' }} onClick={handleSelesaiSubmit}>
                        Laporan Sudah Selesai
                      </Button>
                    )}
                  </>
                )}
              </Form>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DashDetailRegistration;
