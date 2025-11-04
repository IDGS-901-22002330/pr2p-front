import { Link, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
      <nav>
        <Link to="/">Buscar</Link>
        <Link to="/sales">Compras</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout