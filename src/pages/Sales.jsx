import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL + '/api'

function Sales() {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`${API_URL}/sales/`)
      .then((res) => res.json())
      .then((data) => {
        setSales(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const formatDate = (dateString) => {
    if (!dateString || typeof dateString !== 'string') {
      return 'Fecha inválida'
    }

    const date = new Date(dateString)

    return date.toLocaleString('es-MX', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
    })
  }

  if (loading) return <p>Cargando historial de compras...</p>

  return (
    <div>
      <h2>Historial de Compras</h2>
      <ul className="sales-list">
        {sales.map((sale) => (
          <li key={sale.id}>
            <div>
              <p>
                <strong>Producto ID:</strong>{' '}
                <Link to={`/items/${sale.productId}`}>{sale.productId}</Link>
              </p>
              <p>
                <strong>Fecha:</strong> {formatDate(sale.purchaseDate)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sales
