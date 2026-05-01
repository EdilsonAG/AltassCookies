// import { useAuth } from '../context/AuthContext'
// import { Link, useNavigate } from 'react-router-dom'

// export function Header() {
//   const { logado, usuario, logout, loading } = useAuth()
//   const navigate = useNavigate()

//   const handleLogout = async () => {
//     await logout()
//     navigate('/')
//   }

//   // Evita "piscar" o botão Entrar enquanto verifica o cookie
//   if (loading) return <header>...</header>

//   return (
//     <header>
//       <nav>
//         <Link to="/">Início</Link>
//         <Link to="/produtos">Produtos</Link>
//         {/* ... */}
//       </nav>

//       <Link to="/carrinho">🛒</Link>

//       {logado ? (
//         <div>
//           <span>Olá, {usuario?.nome}</span>
//           <button type="button" onClick={handleLogout}>Sair</button>
//         </div>
//       ) : (
//         <Link to="/login">Entrar</Link>
//       )}
//     </header>
//   )
// }