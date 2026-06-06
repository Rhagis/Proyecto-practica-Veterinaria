import { useState } from "react";
import './Login.css'
import axios from "axios";


function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSumbmit = (e) => {
    e.preventDefault() 
    setError("") 

    if (!usuario.trim()){ 
      setError("El usuario es obligatorio.")
      return
    }
    if(!password.trim()){
      setError("La contraseña es obligatoria.")
      return
    }
  }

  const enviarDatos = async () => {
   
    axios.post('http://localhost:3000/users/login', { username: usuario, password })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error al iniciar sesión:", error);
      });
  };

  return(
    <div className="page">
     <div className="card">

        <div className="avatar">
          👤
        </div>
      <h2 className="card-title">Iniciar Sesión</h2>

      <p className="card-sub">Ingresá tus usuario para continuar</p>

      <form onSubmit={handleSumbmit}>
        <div className="field">
          <label>Usuario</label>
          <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder="admin"/>
        </div>

        <div className="field">
          <label>Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"/>
        </div>

        {error && <p className="error">{error}</p>}

        <button className="btn" type="submit" disabled={loading} onClick={enviarDatos}>{loading ? "Ingresando..." : "Ingresar"}</button>
      </form>
        <p className="forgot">
          <a href="#">¿Olvidaste tu contraseña?</a>
        </p>
  
      </div>
    </div>
  )
}
export default Login;
