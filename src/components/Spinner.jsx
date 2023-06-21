import "../assets/css/Spinner.css";

const Spinner = () => {
  return (
    <>
      {/* Crear un Spinner */}
      {/* Utilizar el componente de bootstrap Spinner */}
      {/* El Spinner debe ser de tipo border y de color primario */}
      {/* El Spinner debe estar centrado */}
      {/* El Spinner debe tener un tamaño grande */}

      {/* <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div> */}
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default Spinner;
