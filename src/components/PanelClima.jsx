// importar useState
import { useState } from "react";
import Formulario from "./Formulario";
import Card from "./Card";
import Map from "./Map";
import axios from "axios";

const PanelClima = () => {
  const appId = import.meta.env.VITE_API_KEY;
  let urlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${appId}&lang=es`;
  let ciudadUrl = `&q=`;
  let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?appid=${appId}&lang=es`;

  // Crear estado "clima" para guardar los datos de la API. Inicia como arreglo vacío
  const [weather, setWeather] = useState([]);

  // Crear estado "forecast" para guardar los datos de la API. Inicia como arreglo vacío
  const [forecast, setForecast] = useState([]);

  // Crear estado para un loading
  const [loading, setLoading] = useState(false);

  // Crear estado de tarjeta de visualización del clima con el nombre "show"
  const [show, setShow] = useState(false);

  // Crear estado de "location"
  const [location, setLocation] = useState("");

  // Crear función getLocation
  const getLocation = async (loc) => {
    setLoading(true);
    setLocation(loc);

    // Hacer un fetch a la API de clima
    await fetch(`${urlWeather}${ciudadUrl}${loc}`)
      .then((response) => {
        // Validar que la respuesta sea correcta
        if (!response.ok) throw new Error("Error en la llamada a la API");
        // Si la respuesta es correcta, convertir la respuesta a JSON
        return response.json();
      })
      .then((data) => {
        console.log("weather\n", data);
        // Guardar los datos de la respuesta en el estado "clima"
        setWeather(data);
        // Guardar los datos de la respuesta en el estado "forecast"
        setForecast(data);

        // Cambiar el estado de show a true
        // setShow(true);
      })
      .catch((error) => {
        // Si hay un error, imprimirlo en consola
        console.log(error);
      });

    // Hacer un fetch a la API de forecast
    await fetch(`${urlForecast}${ciudadUrl}${loc}`)
      .then((response) => {
        // Validar que la respuesta sea correcta
        if (!response.ok) throw new Error("Error en la llamada a la API");
        // Si la respuesta es correcta, convertir la respuesta a JSON
        return response.json();
      })
      .then((data) => {
        console.log("forecast\n", data);
        // Guardar los datos de la respuesta en el estado "forecast"
        setForecast(data);
        // Cambiar el estado de loading a false
        setLoading(false);
      })
      .catch((error) => {
        // Si hay un error, imprimirlo en consola
        console.log(error);
      });
    // Cambiar el estado de loading a false
    setLoading(false);
    // Cambiar el estado de show a true
    setShow(true);
  };
  return (
    <>
      <Formulario getLocation={getLocation} />

      {/* Si clima no es un objeto vacío, mostar el Map */}
      {weather?.coord && <Map coordinates={weather.coord} />}

      {/* Cargar el componente Card y pasarle como props: clima, loading, show y forecast  */}
      <Card clima={weather} loading={loading} show={show} forecast={forecast} />
    </>
  );
};

export default PanelClima;
