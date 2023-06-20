const Header = () => {
  return (
    /* Crear un Header con el título de "Predicción Meteorológica", utilizando bootstrap
    El Header:
          * debe tener el título "Predicción Meteorológica" centrado
          * debe estar posicioando de forma fija en la parte superior de la página
          * debe ocupar todo el ancho de la página
    */
    // Colocar el header arriba

    <header className="header navbar navbar-expand-lg navbar-dark bg-dark w-100 header">
      <div className="container-fluid">
        {/* El título debe estar en el centro*/}
        {/* Etiqueta h2 */}
        {/* Clase mx-auto, estar en negrita y letra mediana y color blanco */}
        <h2 className="mx-auto fw-bold text-white">Predicción Meteorológica</h2>
      </div>
    </header>
  );
};

export default Header;
