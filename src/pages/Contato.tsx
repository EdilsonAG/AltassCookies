import { useState } from 'react'
import { Send, Instagram, MessageCircle } from 'lucide-react';
import './Contato.css'

export default function Contato() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ nome: '', email: '', mensagem: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você integraria com o endpoint de contato do backend
    setSent(true)
  }

  return (
    <main className="container contato-page">
      <header className="contato__header">
        <h1>Fale Conosco</h1>
        <p>Dúvidas, encomendas ou só pra dizer oi? A gente adora conversar! 🍪</p>
      </header>

      <div className="contato__layout">
        <section className="contato__form-box">
          {sent ? (
            <div className="contato__success">
              <span>✅</span>
              <h2>Mensagem enviada!</h2>
              <p>Entraremos em contato em breve. Obrigado!</p>
              <button className="btn-outline" onClick={() => setSent(false)}>Enviar outra</button>
            </div>
          ) : (
            <form className="contato__form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input id="nome" name="nome" type="text" placeholder="Seu nome" value={form.nome} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input id="email" name="email" type="email" placeholder="seu@email.com" value={form.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="mensagem">Mensagem</label>
                <textarea id="mensagem" name="mensagem" placeholder="Escreva sua mensagem..." value={form.mensagem} onChange={handleChange} required rows={5} />
              </div>
              <button type="submit" className="btn-primary contato__btn">
                <Send size={17} /> Enviar mensagem
              </button>
            </form>
          )}
        </section>

        <aside className="contato__info">
          <h2>Outros canais</h2>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="contato__channel">
            <Instagram size={24} />
            <div>
              <strong>Instagram</strong>
              <span>@altasscookies</span>
            </div>
          </a>
          <a href="https://wa.me/5500000000000" target="_blank" rel="noreferrer" className="contato__channel">
            <MessageCircle size={24} />
            <div>
              <strong>WhatsApp</strong>
              <span>Chame no zap!</span>
            </div>
          </a>
        </aside>
      </div>
    </main>
  )
}
