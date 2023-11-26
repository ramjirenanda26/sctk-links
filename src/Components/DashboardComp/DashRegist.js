import React, { useState } from 'react';
import { Table, Button, Card, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { GetRegistration, handleDeleteRegistration } from '../../Utils/crudData';
import './dashboardcomp.css';
import { getUserRoleFromLocalStorage } from '../../Utils/UserData';
import Swal from 'sweetalert2';

const DashRegist = () => {
  const Navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const userRole = getUserRoleFromLocalStorage();
  const [currentPage, setCurrentPage] = useState(1);
  const [registrationsPerPage] = useState(10);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleDelete = (registrationId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this registration. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteRegistration(registrationId);
        Swal.fire('Deleted!', 'The registration has been deleted.', 'success');
      }
    });
  };

  // Get current registrations
  const indexOfLastRegistration = currentPage * registrationsPerPage;
  const indexOfFirstRegistration = indexOfLastRegistration - registrationsPerPage;
  const currentRegistrations = registrations.slice(indexOfFirstRegistration, indexOfLastRegistration);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Fungsi untuk mengubah halaman ke halaman pertama
  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  // Fungsi untuk mengubah halaman ke halaman sebelumnya
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Fungsi untuk mengubah halaman ke halaman berikutnya
  const goToNextPage = () => {
    if (currentPage < registrationsPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Fungsi untuk mengubah halaman ke halaman terakhir
  const goToLastPage = () => {
    setCurrentPage(registrationsPerPage);
  };

  const nomorUrutAwal = (currentPage - 1) * registrationsPerPage;

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  return (
    <div className="container-dashboard">
      <h2 className="text-white text-center mb-3">Table Registration</h2>
      <Card>
        <Card.Body>
          <button className="navbar-toggler d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleFilter" aria-controls="collapsibleFilter" aria-label="Toggle navigation">
            <i className="fa-solid fa-filter" style={{ cursor: 'pointer', color: '#f94892' }} /> <small style={{ cursor: 'pointer', color: '#f94892' }}>Filter</small>
          </button>
          <div className="collapse navbar-collapse d-md-block" id="collapsibleFilter">
            <ul className="ms-auto mt-2 list-unstyled mt-lg-0">
              <li className="nav-item dropdown">
                <button className={selectedStatus === null ? 'button-filter active' : 'button-filter'} onClick={() => handleStatusChange(null)}>
                  Semua
                </button>
                <button className={selectedStatus === 'pending' ? 'button-filter active' : 'button-filter'} onClick={() => handleStatusChange('pending')}>
                  Perlu diproses
                </button>
                <button className={selectedStatus === 'proses' ? 'button-filter active' : 'button-filter'} onClick={() => handleStatusChange('proses')}>
                  Telah diproses
                </button>
                <button className={selectedStatus === 'selesai' ? 'button-filter active' : 'button-filter'} onClick={() => handleStatusChange('selesai')}>
                  Selesai
                </button>
                <button className={selectedStatus === 'tolak' ? 'button-filter active' : 'button-filter'} onClick={() => handleStatusChange('tolak')}>
                  Ditolak
                </button>
              </li>
            </ul>
          </div>
          <Table responsive bordered hover className="table bg-white mt-1">
            <thead>
              <tr className="text-center">
                <th>No</th>
                <th>Tanggal</th>
                <th>Nama Perusahaan</th>
                <th>Nama Direksi</th>
                <th>Alamat Perusahaan</th>
                <th>Jenis Usaha</th>
                <th>Produk</th>
                <th>Status Bangunan</th>
                <th>Peruntukan Air</th>
                <th>Kebutuhan Air</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRegistrations.map((registration, index) => (
                <tr key={registration.idReport}>
                  <td style={{ textAlign: 'center' }}>{nomorUrutAwal + index + 1}</td>
                  <td>{registration.tgl}</td>
                  <td>{registration.company}</td>
                  <td>{registration.director}</td>
                  <td>{registration.address}</td>
                  <td>{registration.business}</td>
                  <td>{registration.product}</td>
                  <td>{registration.buildingStatus}</td>
                  <td>{[registration.useProd && 'Produksi', registration.useMachine && 'Broiler/Mesin', registration.useConsume && 'Minum', registration.useDomestic && 'Mandi/Cuci'].filter(Boolean).join(', ')}</td>

                  <td>{registration.waterUsage}</td>
                  <td>{registration.status}</td>
                  <td className="d-flex flex-column align-items-center">
                    <Button variant="info" onClick={() => Navigate(`/dashboard/registration/detail/${registration.idRegistration}`)}>
                      <i className="fa-solid fa-eye"></i>
                    </Button>
                    {userRole === 'admin' && (
                      <Button variant="danger" className="mt-1" onClick={() => handleDelete(registration.idRegistration)}>
                        <i className="fa-solid fa-trash-can"></i>
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination className="justify-content-center custom-pagination">
            <Pagination.First onClick={goToFirstPage} />
            <Pagination.Prev onClick={goToPrevPage} />
            {Array.from({
              length: Math.ceil(registrations.length / registrationsPerPage),
            }).map((_, index) => (
              <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={goToNextPage} />
            <Pagination.Last onClick={goToLastPage} />
          </Pagination>
        </Card.Body>
      </Card>
      {userRole === 'admin' && <GetRegistration setRegistrations={setRegistrations} selectedStatus={selectedStatus} />}
    </div>
  );
};

export default DashRegist;
