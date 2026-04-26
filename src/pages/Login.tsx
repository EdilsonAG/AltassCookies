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

  //   function handleLogin() {
  //   const state = Math.random().toString(36).substring(7)
  //   localStorage.setItem('oauth_state', state)

  //   window.location.href = 
  //     `http://localhost:8080/oauth2/authorize` +
  //     `?response_type=code` +
  //     `&client_id=food` +
  //     `&redirect_uri=http://localhost:5173/callback` +
  //     `&scope=read` +
  //     `&state=${state}`
  // }


  async function handleLogin() {
    const state = Math.random().toString(36).substring(7)
    localStorage.setItem('oauth_state', state)

    // 1. Gera o codeVerifier
    const codeVerifier = generateCodeVerifier()
    localStorage.setItem('codeVerifier', codeVerifier)

    // 2. Calcula o codeChallenge S256
    const codeChallenge = await generateCodeChallenge(codeVerifier)

    // 3. Redireciona com tudo
    window.location.href =
      `http://localhost:8080/oauth2/authorize` +
      `?response_type=code` +
      `&client_id=web` +
      `&redirect_uri=https://oauth.pstmn.io/v1/callback` +
      `&scope=write` +
      `&state=${state}` +
      `&code_challenge=${codeChallenge}` +
      `&code_challenge_method=S256`
  }

  // Gera string aleatória
  function generateCodeVerifier(): string {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return btoa(String.fromCharCode(...array))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
  }

  // Calcula SHA256 e converte para Base64URL
  async function generateCodeChallenge(verifier: string): Promise<string> {
    const encoder = new TextEncoder()
    const data = encoder.encode(verifier)
    const hash = await crypto.subtle.digest('SHA-256', data)
    return btoa(String.fromCharCode(...new Uint8Array(hash)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-card__logo">🍪</div>
        <h1>Bem-vindo de volta!</h1>
        <p className="auth-card__sub">Entre na sua conta para continuar</p>

        <form onSubmit={handleLogin} className="auth-form">
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
