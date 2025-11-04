import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import ProductDetail from './pages/ProductDetail'
import Sales from './pages/Sales'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="items" element={<SearchResults />} />
        <Route path="items/:id" element={<ProductDetail />} />
        <Route path="sales" element={<Sales />} />
      </Route>
    </Routes>
  )
}

export default App