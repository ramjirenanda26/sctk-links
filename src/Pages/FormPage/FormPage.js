import React from 'react';
import FormReportComp from '../../Components/FormComp/FormComp';
import Navigation from '../../Components/Navigation/Navigation';
const FormPage = () => {
  return (
    <>
      <Navigation />
      <React.StrictMode>
        <FormReportComp />
      </React.StrictMode>
    </>
  );
};

export default FormPage;
