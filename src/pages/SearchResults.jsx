import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import SearchBox from '../components/SearchBox'

const API_URL = import.meta.env.VITE_API_URL + '/api'

function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('search') || ''
  
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query) {
      setLoading(true)
      fetch(`${API_URL}/items?q=${query}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data)
          setLoading(false)
        })
        .catch((err) => {
          console.error(err)
          setLoading(false)
        })
    }
  }, [query])

  return (
    <div>
      <SearchBox />
      <h2>Resultados para: "{query}"</h2>
      
      {loading && <p>Cargando...</p>}
      
      {!loading && products.length === 0 && <p>No se encontraron productos.</p>}

      <ul className="results-list">
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <div>
              <Link to={`/items/${product.id}`}>{product.title}</Link>
              <p>${product.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchResults