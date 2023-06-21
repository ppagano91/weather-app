// importar useState
import { useState, useEffect } from "react";
import Card from "./Card";
import Spinner from "./Spinner";
import axios from "axios";
import PropTypes from "prop-types";

const PanelClima = ({ location, setLocation }) => {
  // Crear estado "clima" para guardar los datos de la API. Inicia como arreglo vacío
  const [weather, setWeather] = useState({});

  // Crear estado "forecast" para guardar los datos de la API. Inicia como arreglo vacío
  const [forecast, setForecast] = useState({});

  // Crear estado para un loading
  const [loading, setLoading] = useState(false);

  // Crear estado de tarjeta de visualización del clima con el nombre "show"
  // const [show, setShow] = useState(false);

  useEffect(() => {
    const consultarClima = async (ciudad) => {
      setLoading(true);
      try {
        const appId = import.meta.env.VITE_API_KEY;
        let urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${appId}&lang=es`;
        let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=${appId}&lang=es`;

        const { data: dataWeather } = await axios(urlWeather);
        const { data: dataForecast } = await axios(urlForecast);

        // Validar que la respuesta sea correcta
        if (!dataWeather & !dataForecast)
          throw new Error("Error en la llamada a la API");
        setWeather(dataWeather);
        setForecast(dataForecast);

        // Cambiar el estado de loading a false
        setLoading(false);
        // Cambiar el estado de show a true
      } catch (error) {
        console.log(error);
      } finally {
        console.log("Finally");
      }
    };
    if (location != "") {
      consultarClima(location);
    }
  }, [location]);

  return (
    // centrar el contenido
    <div className="text-center text-white m-100">
      {/* Cargar el componente Card y pasarle como props: clima, loading, show y forecast  */}
      {loading ? (
        <div className="spinner">
          <Spinner />
        </div>
      ) : Object.keys(weather).length != 0 &&
        Object.keys(forecast).length != 0 ? (
        <Card clima={weather} forecast={forecast} setLocation={setLocation} />
      ) : (
        <div className="text-center text-white m-100">
          <h4>No se ha ingresado una Ciudad</h4>
        </div>
      )}
    </div>
  );
};

export default PanelClima;

PanelClima.propTypes = {
  location: PropTypes.string.isRequired,
  setLocation: PropTypes.func.isRequired,
};
