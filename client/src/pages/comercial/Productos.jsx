import { useState } from "react";
import FormularioProductos from "../../components/FormularioProductos";
import axios from "axios";


export default function Productos() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [producto, setProducto] = useState([])

  axios.get('http://localhost:3000/products',{withCredentials:true})
            .then((Response)=> setProducto(Response.data))

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
