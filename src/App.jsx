import { useState } from "react";

import "./assets/css/App.css";
// Importar el componente Header
import Header from "./components/Header";
// Importar el componente PanelClima
import PanelClima from "./components/PanelClima";
// Importar Formulario
import Formulario from "./components/Formulario";

function App() {
  // Crear estado de "location"
  const [location, setLocation] = useState("");
  return (
    <>
      {/* Llamar al componente Header */}
      <Header />
      <Formulario setLocation={setLocation} />
      {/* Llamar al componente PanelClima */}
      <PanelClima location={location} setLocation={setLocation} />
    </>
  );
}

export default App;
