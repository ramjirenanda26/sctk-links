import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { doc, collection, setDoc, GeoPoint, Timestamp } from 'firebase/firestore';
import { db, storage } from '../../Config/firebase';
import MapGL, { Marker, NavigationControl, ScaleControl, GeolocateControl } from 'react-map-gl';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { GetUserById } from '../../Utils/crudData';
import Swal from 'sweetalert2';

const token = 'pk.eyJ1IjoicmVuYW5kYTI2IiwiYSI6ImNsaHgxMTkzdzBsZWkzbW4wMnZ5cDd0OTgifQ.ubLqseZPFD3Ym8ENEzvbCw';
const FormReportComp = () => {
  //maps
  const [newPlace, setNewPlace] = useState(null);
  const [viewport, setViewPort] = useState({
    longitude: 106.33834462741254,
    latitude: -6.199113200732568,
    zoom: 11,
  });

  const handleMarkerDragEnd = (event) => {
    const { lngLat } = event;
    const { lng, lat } = lngLat;
    setNewPlace({ lat, long: lng });
  };

  useEffect(() => {
    // Set initial marker on map load
    setNewPlace({
      lat: viewport.latitude,
      long: viewport.longitude,
    });
  }, [viewport.latitude, viewport.longitude]);

  const handleGeolocateClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setViewPort((prevViewport) => ({
          ...prevViewport,
          longitude,
          latitude,
        }));
        setNewPlace({ lat: latitude, long: longitude });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  useEffect(() => {
    if (newPlace) {
    }
  }, [newPlace]);

  const usersData = localStorage.getItem('user');
  const user = JSON.parse(usersData);
  const userData = user.user;
  const uid = userData.uid;

  const [users, setUser] = useState(null);
  const [company, setCompany] = useState('');
  const [director, setDirector] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [business, setBusiness] = useState('');
  const [product, setProduct] = useState('');
  const [buildingStatus, setBuildingStatus] = useState('');
  const [tglkejadian, setTglKejadian] = useState('');
  const [useProd, setUseProd] = useState(false);
  const [useMachine, setUseMachine] = useState(false);
  const [useConsume, setUseConsume] = useState(false);
  const [useDomestic, setUseDomestic] = useState(false);
  const [waterUsage, setWaterUsage] = useState('');
  const [file, setFile] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };

    if (file) {
      uploadFile();
    }
  }, [file]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to submit the form?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        const timestamp = Timestamp.fromDate(new Date());
        const date = timestamp.toDate();
        const dateString = date.toLocaleString('id-ID', {
          timeZone: 'Asia/Jakarta',
          dateStyle: 'long',
          timeStyle: 'medium',
        });
        const idRegistration = 'regist' + new Date().getTime();
        const img = data.img ? data.img : null;

        const registrationData = {
          uid: uid,
          idRegistration: idRegistration,
          tgl: dateString,
          company: company,
          director: director,
          address: address,
          name: users.name,
          tlfn: users.phone,
          email: users.email,
          phone: phone,
          business: business,
          product: product,
          buildingStatus: buildingStatus,
          useProd: useProd,
          useMachine: useMachine,
          useConsume: useConsume,
          useDomestic: useDomestic,
          waterUsage: waterUsage,
          img: img, // Menggunakan null jika URL tidak tersedia
          status: 'pending',
          location: new GeoPoint(newPlace.lat, newPlace.long),
        };

        const registRef = collection(db, 'registration');
        const registDocRef = doc(registRef, idRegistration);
        await setDoc(registDocRef, registrationData);

        Swal.fire({
          title: 'Berhasil',
          text: 'Data laporan berhasil disubmit, Klik OK untuk melihat status laporan',
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/profile/list';
          }
        });
      } else {
      }
    } catch (error) {
      console.error('Error menyimpan data laporan:', error);
      Swal.fire({
        title: 'Error',
        text: 'Gagal menyimpan data laporan',
        icon: 'error',
      });
    }
  };

  const handleRadioChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'statusBangunan':
        setBuildingStatus(value);
        break;
      default:
        break;
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    switch (name) {
      case 'produksi':
        setUseProd(checked);
        break;
      case 'mesin':
        setUseMachine(checked);
        break;
      case 'minum':
        setUseConsume(checked);
        break;
      case 'domestik':
        setUseDomestic(checked);
        break;
      default:
        break;
    }

    // validateCheckboxes();
  };

  // const validateCheckboxes = () => {
  //   if (!useProd && !useMachine && !useConsume && !useDomestic) {
  //     alert('Pilih setidaknya satu checkbox!');
  //   }
  // };

  const handleWaterUsageChange = (event) => {
    const { value } = event.target;
    setWaterUsage(value);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7 px-2 mt-4 mb-5">
          <h2 className="text-white my-3"> D</h2>
          {/* <div className='col-md-6'> */}
          <Card>
            <Card.Header>
              <h3 className="form-subtitle-page">Lakukan Pendaftaran Sambung Baru Pipa PT Sarana Catur Tirtakelola</h3>
            </Card.Header>

            <Card.Body className="">
              <Form.Group className="mb-3" controlId="formGroupName">
                <Form.Label className="fw-bold">Infromasi Pelapor</Form.Label>
                <Card>
                  <Card.Body
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <Card.Text>
                        <strong>Nama:</strong> {users?.name}
                        <br />
                        <strong>Email:</strong> {users?.email}
                        <br />
                        <strong>Telephone:</strong> {users?.phone}
                      </Card.Text>
                    </div>
                    <Button
                      variant="primary"
                      onClick={() => {
                        window.location.href = '/profile';
                      }}
                    >
                      {' '}
                      Change
                    </Button>
                  </Card.Body>
                </Card>
              </Form.Group>

              <label className="mb-2 fw-bold">Informasi Perusahaan dan Kebutuhan</label>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formGroupName">
                  <Form.Label>Nama Perusahaan</Form.Label>
                  <Form.Control type="text" placeholder="Masukan nama perusahaan" onChange={(e) => setCompany(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupName">
                  <Form.Label>Nama Direktur</Form.Label>
                  <Form.Control type="text" placeholder="Masukan nama direksi" onChange={(e) => setDirector(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupName">
                  <Form.Label>Alamat Perusahaan/PT</Form.Label>
                  <Form.Control type="text" placeholder="Masukan alamat perusahaan" onChange={(e) => setAddress(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupName">
                  <Form.Label>Nomor Telepon Perusahaan/PT</Form.Label>
                  <Form.Control type="text" placeholder="Masukan nomor telepon perusahaan" onChange={(e) => setPhone(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupName">
                  <Form.Label>Jenis Usaha</Form.Label>
                  <Form.Control type="text" placeholder="Jenis usaha dari perusahaan" onChange={(e) => setBusiness(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupName">
                  <Form.Label>Produk yang Dihasilkan</Form.Label>
                  <Form.Control type="text" placeholder="Produk perusahaan" onChange={(e) => setProduct(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupName">
                  <Form.Label>Kepemilikan Bangunan</Form.Label>
                  <div>
                    <Form.Check type="radio" label="Milik Sendiri" name="statusBangunan" value="Milik Sendiri" checked={buildingStatus === 'Milik Sendiri'} onChange={handleRadioChange} />
                    <Form.Check type="radio" label="Sewa" name="statusBangunan" value="Sewa" checked={buildingStatus === 'Sewa'} onChange={handleRadioChange} />
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupName">
                  <Form.Label>Peruntukan Penggunaan Air</Form.Label>
                  <Form.Check type="checkbox" label="Proses Produksi" name="produksi" checked={useProd} onChange={handleCheckboxChange} />
                  <Form.Check type="checkbox" label="Mesin/boiler" name="mesin" checked={useMachine} onChange={handleCheckboxChange} />
                  <Form.Check type="checkbox" label="Minum" name="minum" checked={useConsume} onChange={handleCheckboxChange} />
                  <Form.Check type="checkbox" label="Mandi/Cuci" name="domestik" checked={useDomestic} onChange={handleCheckboxChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupName">
                  <Form.Label>Kebutuhan Air</Form.Label>
                  <div>
                    <Form.Check type="radio" label="< 1 m³/jam atau < 380 m³/bulan" name="waterUsage" value="< 1 m³/jam atau < 380 m³/bulan" checked={waterUsage === '< 1 m³/jam atau < 380 m³/bulan'} onChange={handleWaterUsageChange} />
                    <Form.Check
                      type="radio"
                      label="1 - 2 m³/jam atau 380 - 1500 m³/bulan"
                      name="waterUsage"
                      value="1 - 2 m³/jam atau 380 - 1500 m³/bulan"
                      checked={waterUsage === '1 - 2 m³/jam atau 380 - 1500 m³/bulan'}
                      onChange={handleWaterUsageChange}
                    />
                    <Form.Check
                      type="radio"
                      label="2 - 5 m³/jam atau 1500 - 3300 m³/bulan"
                      name="waterUsage"
                      value="2 - 5 m³/jam atau 1500 - 3300 m³/bulan"
                      checked={waterUsage === '2 - 5 m³/jam atau 1500 - 3300 m³/bulan'}
                      onChange={handleWaterUsageChange}
                    />
                    <Form.Check
                      type="radio"
                      label="5 - 7 m³/jam atau 3300 - 4900 m³/bulan"
                      name="waterUsage"
                      value="5 - 7 m³/jam atau 3300 - 4900 m³/bulan"
                      checked={waterUsage === '5 - 7 m³/jam atau 3300 - 4900 m³/bulan'}
                      onChange={handleWaterUsageChange}
                    />
                    <Form.Check
                      type="radio"
                      label="7 - 22 m³/jam atau 4900 - 15500 m³/bulan"
                      name="waterUsage"
                      value="7 - 22 m³/jam atau 4900 - 15500 m³/bulan"
                      checked={waterUsage === '7 - 22 m³/jam atau 4900 - 15500 m³/bulan'}
                      onChange={handleWaterUsageChange}
                    />
                    <Form.Check
                      type="radio"
                      label="22 - 36 m³/jam atau 15500 - 25900 m³/bulan"
                      name="waterUsage"
                      value="22 - 36 m³/jam atau 15500 - 25900 m³/bulan"
                      checked={waterUsage === '22 - 36 m³/jam atau 15500 - 25900 m³/bulan'}
                      onChange={handleWaterUsageChange}
                    />
                    <Form.Check
                      type="radio"
                      label="> 58 m³/jam atau > 41400 m³/bulan"
                      name="waterUsage"
                      value="> 58 m³/jam atau > 41400 m³/bulan"
                      checked={waterUsage === '> 58 m³/jam atau > 41400 m³/bulan'}
                      onChange={handleWaterUsageChange}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="dateInput">
                  <Form.Label>Tanggal Pendaftaran:</Form.Label>
                  <Form.Control type="date" onChange={(e) => setTglKejadian(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="fileInput">
                  <Form.Label>
                    Foto Lokasi Pintu Masuk <small style={{ color: 'orange', fontSize: '0.7rem' }}>Opsional</small>
                  </Form.Label>
                  <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
                </Form.Group>
                <label className="mb-2 fw-bold">Lokasi Perusahaan</label>
                <Card className="" style={{ width: '100%', height: '25rem' }}>
                  <div className="map-comp" style={{ width: '100%', height: '100%' }}>
                    <MapGL initialViewState={viewport} mapboxAccessToken={token} mapStyle="mapbox://styles/renanda26/cli49zhib02nc01qyaka1dq8w" width="100%" height="100%" onViewportChange={setViewPort}>
                      {newPlace && (
                        <>
                          <Marker latitude={newPlace?.lat} longitude={newPlace?.long} offsetleft={-3.5 * viewport.zoom} offsetTop={-7 * viewport.zoom} draggable={true} onDragEnd={handleMarkerDragEnd} style={{ zIndex: 999 }}>
                            <i
                              className="fa-solid fa-location-dot"
                              style={{
                                fontSize: 3 * viewport.zoom,
                                color: 'tomato',
                                cursor: 'pointer',
                              }}
                            ></i>
                          </Marker>
                        </>
                      )}
                      <GeolocateControl position="bottom-right" onGeolocate={handleGeolocateClick} />
                      <NavigationControl position="bottom-right" />
                      <ScaleControl />
                    </MapGL>
                  </div>
                </Card>
                <p style={{ textAlign: 'center', padding: '0 20px' }}>
                  <small
                    style={{
                      color: 'orange',
                      fontSize: '0.7rem',
                      textAlign: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    Mohon masukan lokasi dengan benar, agar dapat membantu kami mengumpulkan informasi yang dibutuhkan
                  </small>
                </p>
                <Button variant="primary" type="submit">
                  Daftar
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <GetUserById setUser={setUser} uid={uid} />
        </div>
      </div>
    </div>
  );
};

export default FormReportComp;
