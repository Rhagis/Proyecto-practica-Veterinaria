import { useState } from "react";
import FormularioProductos from "../../components/FormularioProductos";

export default function Productos() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <section className="page-shell">
      <h1>Productos</h1>
      <p>Administra el catálogo de productos para tu clínica veterinaria.</p>

      <button
        type="button"
        onClick={() => setMostrarFormulario((prev) => !prev)}
      >
        {mostrarFormulario ? "Ocultar formulario" : "Agregar producto"}
      </button>

      {mostrarFormulario && <FormularioProductos />}
    </section>
  )
}
