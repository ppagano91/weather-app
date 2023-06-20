import "./assets/css/App.css";
// Importar el componente Header
import Header from "./components/Header";
// Importar el componente PanelClima
import PanelClima from "./components/PanelClima";
// Importar Formulario

function App() {
  return (
    <>
      {/* Llamar al componente Header */}
      <Header />
      {/* <Formulario getLocation={getLocation} /> */}
      {/* Llamar al componente PanelClima */}
      <PanelClima />
    </>
  );
}

export default App;
