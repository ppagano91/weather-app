// Importar useState y useEffect
import { useState } from "react";
import PropTypes from "prop-types";

const Formulario = ({ getLocation }) => {
  /*
    Crear un estado para guardar el valor del input con el nombre de ciudad
    El estado comienza como una cadena vacía
    */
  const [city, setCity] = useState("");

  // Crear función de handleSubmit del formulario
  const handleSubmit = (e) => {
    // Evitar que el formulario se envíe
    e.preventDefault();
    // Validar que el input no esté vacío y que no tenga espacios en blanco
    // En este caso enviar un mensaje de alerta
    if (city.trim() === "") {
      alert("El campo no puede estar vacío");
      return;
    }
    getLocation(city);
  };

  // Crear función obtenerCiudadUsuario
  const obtenerCiudadUsuario = () => {
    // Obtener la ciudad de la computadora del usuario
    fetch("http://ip-api.com/json")
      .then((response) => response.json())
      .then((data) => {
        const cityUser = data.city;
        getLocation(cityUser);
      });

    // navigator.geolocation.getCurrentPosition(
    // (position) => {
    // console.log(position);
    // getLocation(position.coords.latitude, position.coords.longitude);
    // })
  };

  return (
    // Crear un formulario con un input y un botón para la búsqueda de la ciudad
    // El formulario debe estar en línea
    // El formulario debe estar dentro de una etiqueta div
    // El formulario debe estar centrado
    // El formulario debe estar posicionado debajo del Header
    // El input debe tener un placeholder con el texto "Introduce la ciudad"
    // El input debe tener un borde redondeado
    // El input debe tener un ancho razonable
    // El input debe tener una prop onChange
    // El botón debe tener un texto "Buscar "

    <div className="formulario container mt-4">
      <div className="row">
        <div className="col-12">
          {/* form debe tener un onSubmit */}
          <form
            className="d-flex justify-content-center"
            onSubmit={handleSubmit}
          >
            <div className="input-group mb-3 mx-auto">
              <input
                required
                className="form-control"
                type="search"
                placeholder="Introduce la ciudad"
                aria-label="Search"
                onChange={(e) => setCity(e.target.value)}
              />
              <button
                className="btn btn-primary input-group-text"
                type="submit"
              >
                Buscar
              </button>
              {/* Agregar otro botón que encuentre la ciudad de la computadora del usuario */}
              {/* El botón debe tener un texto "Mi ubicación" */}
              {/* El botón debe tener una prop onClick para llamar a una función "obtenerCiudadUsuario" */}
              {/* El botón debe tener una clase de bootstrap que lo haga secundario */}
              <button
                className="btn btn-secondary input-group-text"
                type="button"
                onClick={() => obtenerCiudadUsuario()}
              >
                Mi ubicación
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Formulario;

Formulario.propTypes = {
  getLocation: PropTypes.func.isRequired,
};
