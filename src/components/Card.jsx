import PropTypes from "prop-types";
import Map from "./Map";
const Card = ({ clima, forecast, setLocation }) => {
  // Obtener la fecha actual con formato DD/MM/YYYY
  const fechaActual = new Date().toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  let icono = "";
  let urlIcono = "";

  // Función para formatear temperatura de Kelvin a Celsius
  const kelvinToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15);
  };

  // obtener el ícono del clima
  icono = clima?.weather[0].icon;

  // URL del ícono
  urlIcono = `http://openweathermap.org/img/w/${icono}.png`;

  // obtener el pronóstico del clima a las 3 horas
  const iconUrl3 = forecast?.list[1]?.weather[0]?.icon
    ? `http://openweathermap.org/img/w/${forecast.list[1].weather[0].icon}.png`
    : "";
  const iconUrl6 = forecast?.list[2]?.weather[0]?.icon
    ? `http://openweathermap.org/img/w/${forecast.list[2].weather[0].icon}.png`
    : "";
  const iconUrl9 = forecast?.list[3]?.weather[0]?.icon
    ? `http://openweathermap.org/img/w/${forecast.list[3].weather[0].icon}.png`
    : "";

  const forecast3 = forecast?.list[1]
    ? new Date(forecast.list[1].dt_txt).toLocaleDateString("es-ES", {
        hour: "numeric",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";
  const forecast6 = forecast?.list[2]
    ? new Date(forecast.list[2].dt_txt).toLocaleDateString("es-ES", {
        hour: "numeric",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";
  const forecast9 = forecast?.list[3]
    ? new Date(forecast.list[3].dt_txt).toLocaleDateString("es-ES", {
        hour: "numeric",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <div className="mt-4">
      <div className="container card-container">
        <div className="card mb-3 mx-auto bg-dark text-light">
          <div className="card-content row g-0">
            <div className="col-md-4 card-image">
              <div className="card-image-top">
                {/* Colocar el ícono del clima */}
                <p className="card-desc">
                  <img src={urlIcono} alt="icono" />
                  {clima?.weather[0].description}
                </p>
                {/* Colocar la temperatura actual */}
                <p className="card-temp">
                  {kelvinToCelsius(clima?.main.temp)}°C
                </p>
              </div>
              <div className="card-image-bottom">
                {/* Colocar el nombre de la ciudad */}
                <h3 className="card-title">{clima?.name}</h3>
                {/* Colocar la fecha actual */}
                <p className="card-date">{fechaActual}</p>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card-body-container">
                <div className="card-body">
                  {/* Temperatura máxima */}
                  <p className="card-text">
                    <span className="fw-bold">
                      {kelvinToCelsius(clima?.main.temp_max)}°C
                    </span>{" "}
                    {/* Colocar el simbolo de temperatura alta tamaño pequeño*/}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-thermometer-high text-danger"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585a1.5 1.5 0 0 1 1 1.415z" />
                      <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z" />
                    </svg>
                  </p>
                  {/* Temperatura mínima */}
                  <p className="card-text">
                    <span className="fw-bold">
                      {kelvinToCelsius(clima?.main.temp_min)}°C
                    </span>{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-thermometer-low text-primary"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V9.5a.5.5 0 0 1 1 0v1.585a1.5 1.5 0 0 1 1 1.415z" />
                      <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z" />
                    </svg>
                  </p>
                  {/* Sensación térmica */}
                  <p className="card-text">
                    <span className="fw-bold">
                      {kelvinToCelsius(clima?.main.feels_like)}°C
                    </span>{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-thermometer-half text-warning"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415z" />
                      <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z" />
                    </svg>
                  </p>
                  {/* Humedad */}
                  <p className="card-text">
                    {" "}
                    <span className="fw-bold">
                      {clima?.main.humidity}%
                    </span>{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-droplet-fill text-primary"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6ZM6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z" />
                    </svg>
                  </p>
                  {/* Velocidad del viento */}
                  <p className="card-text">
                    <span className="fw-bold">{clima?.wind?.speed} m/s</span>{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-wind"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z" />
                    </svg>
                  </p>
                  {/* Presión atmosférica */}
                  <p className="card-text">
                    <span className="fw-bold">{clima?.main.pressure} hPa</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-browser-safari text-success"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Zm.25-14.75v1.5a.25.25 0 0 1-.5 0v-1.5a.25.25 0 0 1 .5 0Zm0 12v1.5a.25.25 0 1 1-.5 0v-1.5a.25.25 0 1 1 .5 0ZM4.5 1.938a.25.25 0 0 1 .342.091l.75 1.3a.25.25 0 0 1-.434.25l-.75-1.3a.25.25 0 0 1 .092-.341Zm6 10.392a.25.25 0 0 1 .341.092l.75 1.299a.25.25 0 1 1-.432.25l-.75-1.3a.25.25 0 0 1 .091-.34ZM2.28 4.408l1.298.75a.25.25 0 0 1-.25.434l-1.299-.75a.25.25 0 0 1 .25-.434Zm10.392 6 1.299.75a.25.25 0 1 1-.25.434l-1.3-.75a.25.25 0 0 1 .25-.434ZM1 8a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 0 .5h-1.5A.25.25 0 0 1 1 8Zm12 0a.25.25 0 0 1 .25-.25h1.5a.25.25 0 1 1 0 .5h-1.5A.25.25 0 0 1 13 8ZM2.03 11.159l1.298-.75a.25.25 0 0 1 .25.432l-1.299.75a.25.25 0 0 1-.25-.432Zm10.392-6 1.299-.75a.25.25 0 1 1 .25.433l-1.3.75a.25.25 0 0 1-.25-.434ZM4.5 14.061a.25.25 0 0 1-.092-.341l.75-1.3a.25.25 0 0 1 .434.25l-.75 1.3a.25.25 0 0 1-.342.091Zm6-10.392a.25.25 0 0 1-.091-.342l.75-1.299a.25.25 0 1 1 .432.25l-.75 1.3a.25.25 0 0 1-.341.09ZM6.494 1.415l.13.483a.25.25 0 1 1-.483.13l-.13-.483a.25.25 0 0 1 .483-.13ZM9.86 13.972l.13.483a.25.25 0 1 1-.483.13l-.13-.483a.25.25 0 0 1 .483-.13ZM3.05 3.05a.25.25 0 0 1 .354 0l.353.354a.25.25 0 0 1-.353.353l-.354-.353a.25.25 0 0 1 0-.354Zm9.193 9.193a.25.25 0 0 1 .353 0l.354.353a.25.25 0 1 1-.354.354l-.353-.354a.25.25 0 0 1 0-.353ZM1.545 6.01l.483.13a.25.25 0 1 1-.13.483l-.483-.13a.25.25 0 1 1 .13-.482Zm12.557 3.365.483.13a.25.25 0 1 1-.13.483l-.483-.13a.25.25 0 1 1 .13-.483Zm-12.863.436a.25.25 0 0 1 .176-.306l.483-.13a.25.25 0 1 1 .13.483l-.483.13a.25.25 0 0 1-.306-.177Zm12.557-3.365a.25.25 0 0 1 .176-.306l.483-.13a.25.25 0 1 1 .13.483l-.483.13a.25.25 0 0 1-.306-.177ZM3.045 12.944a.299.299 0 0 1-.029-.376l3.898-5.592a.25.25 0 0 1 .062-.062l5.602-3.884a.278.278 0 0 1 .392.392L9.086 9.024a.25.25 0 0 1-.062.062l-5.592 3.898a.299.299 0 0 1-.382-.034l-.005-.006Zm3.143 1.817a.25.25 0 0 1-.176-.306l.129-.483a.25.25 0 0 1 .483.13l-.13.483a.25.25 0 0 1-.306.176ZM9.553 2.204a.25.25 0 0 1-.177-.306l.13-.483a.25.25 0 1 1 .483.13l-.13.483a.25.25 0 0 1-.306.176Z" />
                    </svg>
                  </p>
                </div>
                <div className="map">
                  {clima?.coord && (
                    <Map coordinates={clima.coord} setLocation={setLocation} />
                  )}
                </div>
              </div>

              <div className="row mt-4 forecast">
                {/* Colocar un subtítulo "Pronóstico" con un fondo claro y opacidad */}
                <h5 className="forecast-title ">Pronóstico</h5>

                <div className="col forecast-col">
                  {/* Colocar el pronostico a las 3 hs */}
                  <p className="date">{forecast3} h</p>
                  <p className="description">
                    {/* Colocar imagen */}
                    <img src={iconUrl3} alt="icono" />
                    {forecast?.list[1].weather[0].description}
                  </p>
                  {/* Colocar temperatura */}
                  <p className="temp fw-bold">
                    {kelvinToCelsius(forecast?.list[1].main.temp)}°C
                  </p>
                </div>
                <div className="col forecast-col">
                  {/* Colocar el pronostico a las 3 hs */}
                  <p className="date">{forecast6} h</p>
                  <p className="description">
                    {/* Colocar imagen */}
                    <img src={iconUrl6} alt="icono" />
                    {forecast?.list[2].weather[0].description}
                  </p>
                  {/* Colocar temperatura */}
                  <p className="temp fw-bold">
                    {kelvinToCelsius(forecast?.list[2].main.temp)}°C
                  </p>
                </div>
                <div className="col forecast-col">
                  {/* Colocar el pronostico a las 3 hs */}
                  <p className="date">{forecast9} h</p>
                  <p className="description">
                    {/* Colocar imagen */}
                    <img src={iconUrl9} alt="icono" />
                    {forecast?.list[3].weather[0].description}
                  </p>
                  {/* Colocar temperatura */}
                  <p className="temp fw-bold">
                    {kelvinToCelsius(forecast?.list[3].main.temp)}°C
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

Card.propTypes = {
  clima: PropTypes.object.isRequired,
  forecast: PropTypes.object.isRequired,
  setLocation: PropTypes.func.isRequired,
};
