import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Auth.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')


  // como é type script tenho que pegar o tipo dele
  function handleSubmit(e: React.FormEvent) {
    // impede que pagina seja recarregacada ao submter um formulario
    e.preventDefault()



    // aqui vai a logica de login
     alert(`Login com: ${email}`)
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-card__logo">🍪</div>
        <h1>Bem-vindo de volta!</h1>
        <p className="auth-card__sub">Entre na sua conta para continuar</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form__field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth-form__field">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary auth-btn">Entrar</button>
        </form>

        <p className="auth-card__footer">
          Não tem conta? <Link to="/cadastro">Criar conta</Link>
        </p>
      </div>
    </main>
  )
}
