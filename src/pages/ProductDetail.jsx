import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL + '/api'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`${API_URL}/items/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  const handleBuy = () => {
    fetch(`${API_URL}/addSale`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId: id }),
    })
      .then((res) => res.json())
      .then((success) => {
        if (success) {
          alert('¡Compra registrada con éxito!')
        } else {
          alert('Error al registrar la compra.')
        }
      })
      .catch((err) => {
        console.error(err)
        alert('Error de conexión al registrar la compra.')
      })
  }

  if (loading) return <p>Cargando producto...</p>
  if (!product) return <p>Producto no encontrado.</p>

  // Usamos el array de 'images' si existe y tiene items,
  // si no, usamos 'thumbnail' como fallback.
  const imageList =
    product.images && product.images.length > 0
      ? product.images
      : [product.thumbnail]

  return (
    <div className="product-detail">
      {/* --- COLUMNA DE IMÁGENES --- */}
      <div className="product-images">
        {imageList.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${product.title} - imagen ${index + 1}`}
          />
        ))}
      </div>

      {/* --- COLUMNA DE INFORMACIÓN --- */}
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h1>{product.title}</h1>
        <p className="product-description">{product.description}</p>

        <div className="product-price-details">
          <span className="product-price">${product.price}</span>
          <span className="product-discount">
            {product.discountPercentage}% OFF
          </span>
        </div>

        <p>
          <strong>Rating:</strong> {product.rating} / 5 ⭐
        </p>

        <button onClick={handleBuy}>Registrar Compra</button>

        <h3>Detalles del Producto</h3>
        <ul className="product-specs">
          <li>
            <strong>Stock:</strong> {product.stock} (
            {product.availabilityStatus})
          </li>
          <li>
            <strong>SKU:</strong> {product.sku}
          </li>
          <li>
            <strong>Peso:</strong> {product.weight}g
          </li>
          <li>
            <strong>Dimensiones:</strong> {product.dimensions?.width} x{' '}
            {product.dimensions?.height} x {product.dimensions?.depth} cm
          </li>
          <li>
            <strong>Pedido Mínimo:</strong> {product.minimumOrderQuantity}
          </li>
        </ul>

        <h3>Envío y Garantía</h3>
        <ul className="product-specs">
          <li>
            <strong>Envío:</strong> {product.shippingInformation}
          </li>
          <li>
            <strong>Garantía:</strong> {product.warrantyInformation}
          </li>
          <li>
            <strong>Política de Devolución:</strong> {product.returnPolicy}
          </li>
        </ul>

        <div className="product-tags">
          <strong>Tags:</strong>
          {product.tags?.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* --- SECCIÓN DE RESEÑAS (ABAJO) --- */}
      <div className="product-reviews">
        <h2>Reseñas ({product.reviews?.length || 0})</h2>
        {product.reviews?.map((review, index) => (
          <div key={index} className="review-item">
            <strong>
              {review.reviewerName} (Rating: {review.rating}/5)
            </strong>
            <p>"{review.comment}"</p>
            <small>{new Date(review.date).toLocaleDateString('es-MX')}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductDetail
