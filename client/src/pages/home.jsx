import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'


  



export default function Home() {
  const [stock, setStock] = useState([])

  useEffect(() => {
    const checkStock = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products', {withCredentials: true})
      setStock([]) // Limpiar el stock antes de verificar nuevamente
      for (let i=0; i < response.data.length; i++) {
        //dentro del if se debe reemplazar el 30 por response.data[i].stock_minimo
        // el 30 esta para mostrar en pantalla el stock
        if(response.data[i].stock_actual < 30) {
          setStock(prevStock => [...prevStock, response.data[i]])
        }
      }
    } catch (error) {
      console.error('Error al verificar stock:', error)
    }
    }
    
  
  checkStock()

  const intervalo = setInterval(checkStock,30000)

  return () => clearInterval(intervalo)
  }, [])

  useEffect(() => {
    //Logica para generar graficos con recharts para registros de ventas diarios, semanales y mensuales
  }, [])

  return (
    <section className="page-shell">
      <h1>Bienvenido a la Veterinaria</h1>
      <p>Usa el menú para navegar entre Productos, Ventas, Clientes, Mascotas e Historias Clínicas.</p>
      {stock.length > 0 && (
        <div>
          <h2>Productos con stock bajo:</h2>
          <ul>
            {stock.map((item, index) => (
              <li key={index}>{item.nombre} - Stock actual: {item.stock_actual}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
