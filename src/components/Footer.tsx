import { Link } from 'react-router-dom'
import { Instagram, Youtube, Facebook } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">Altass Cookies</span>
          <p className="footer__tagline">Feito com amor e ingredientes selecionados</p>
          <div className="footer__socials">
            <a href="#" aria-label="Instagram"><Instagram size={20}/></a>
            <a href="#" aria-label="Youtube"><Youtube size={20}/></a>
            <a href="#" aria-label="Facebook"><Facebook size={20}/></a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Navegação</h4>
          <Link to="/">Início</Link>
          <Link to="/produtos">Produtos</Link>
          <Link to="/sobre">Sobre nós</Link>
        </div>

        <div className="footer__col">
          <h4>Conta</h4>
          <Link to="/login">Entrar</Link>
          <Link to="/cadastro">Cadastrar-se</Link>
          <Link to="/pedidos">Meus pedidos</Link>
        </div>

        <div className="footer__col">
          <h4>Contato</h4>
          <a href="mailto:contato@altasscookies.com.br">contato@altasscookies.com.br</a>
          <a href="https://wa.me/5500000000000" target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Altass Cookies Gourmet. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
