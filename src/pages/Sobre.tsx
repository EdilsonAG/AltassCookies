import './Sobre.css'

export default function Sobre() {
  return (
    <main className="sobre-page">
      <section className="sobre__hero container">
        <div className="sobre__hero-text">
          <p className="sobre__eyebrow">Nossa história</p>
          <h1>Feito com amor,<br />entregue com carinho</h1>
          <p>
            A Altass Cookies Gourmet nasceu da paixão por criar experiências únicas através
            de sabores autênticos. Cada cookie é uma obra de arte, preparada artesanalmente
            com ingredientes selecionados para proporcionar o máximo de sabor e textura.
          </p>
        </div>
        <div className="sobre__emoji-art">🍪</div>
      </section>

      <section className="sobre__values container">
        {[
          { emoji: '🌾', title: 'Ingredientes Naturais', desc: 'Trabalhamos apenas com ingredientes de alta qualidade, sem conservantes artificiais.' },
          { emoji: '👐', title: 'Feito à Mão', desc: 'Cada unidade é produzida artesanalmente, garantindo cuidado em cada detalhe.' },
          { emoji: '💛', title: 'Receitas com Alma', desc: 'Nossas receitas são desenvolvidas com criatividade e muito amor pela confeitaria.' },
        ].map(v => (
          <div key={v.title} className="sobre__value-card">
            <span className="sobre__value-emoji">{v.emoji}</span>
            <h3>{v.title}</h3>
            <p>{v.desc}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
