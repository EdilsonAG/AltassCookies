import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { pedidoService, pagamentoService } from '../services/api'
import { useCart } from '../context/CartContext'
import type { StatusPagamento } from '../types'
import './Checkout.css'

type Step = 'resumo' | 'pagamento' | 'confirmacao'

export default function Checkout() {
  const { itens, totalPreco, recarregar } = useCart()
  const navigate = useNavigate()

  const [step, setStep] = useState<Step>('resumo')
  const [tipoPagamento, setTipoPagamento] = useState('PIX')
  const [loading, setLoading] = useState(false)
  const [statusPagamento, setStatusPagamento] = useState<StatusPagamento | null>(null)

  async function handleFinalizar() {
    setLoading(true)
    try {
      const pedido = await pedidoService.criar()
      const pagamento = await pagamentoService.pagar({ tipo: tipoPagamento, pedidoId: pedido.id })
      setStatusPagamento(pagamento.statusPagamento)
      await recarregar()
      setStep('confirmacao')
    } catch {
      alert('Erro ao processar pedido. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'confirmacao') {
    return (
      <main className="checkout-page">
        <div className="checkout-confirm">
          <div className="checkout-confirm__icon">{statusPagamento === 'APROVADO' ? '✅' : '⏳'}</div>
          <h1>{statusPagamento === 'APROVADO' ? 'Pedido confirmado!' : 'Pedido em processamento'}</h1>
          <p>
            {statusPagamento === 'APROVADO'
              ? 'Seu pagamento foi aprovado. Prepare-se para receber seus cookies!'
              : 'Seu pedido foi criado. Aguardando confirmação do pagamento.'}
          </p>
          <button className="btn-primary" onClick={() => navigate('/')}>
            Voltar para a loja
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="checkout-page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>

        {/* Steps indicator */}
        <div className="steps">
          {(['resumo', 'pagamento'] as Step[]).map((s, i) => (
            <div key={s} className={`step ${step === s ? 'active' : ''} ${i < ['resumo', 'pagamento'].indexOf(step) ? 'done' : ''}`}>
              <div className="step__dot">{i + 1}</div>
              <span>{s === 'resumo' ? 'Resumo' : 'Pagamento'}</span>
            </div>
          ))}
        </div>

        <div className="checkout-layout">
          {/* Conteúdo do step */}
          <section className="checkout-content">
            {step === 'resumo' && (
              <div>
                <h2>Seus itens</h2>
                {itens.map(item => (
                  <div key={item.id} className="checkout-item">
                    <span>{item.produto.nome} × {item.quantidade}</span>
                    <span>{((item.produto.preco ?? 0) * item.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                  </div>
                ))}
                <button className="btn-primary checkout-next" onClick={() => setStep('pagamento')}>
                  Ir para pagamento
                </button>
              </div>
            )}

            {step === 'pagamento' && (
              <div>
                <h2>Forma de pagamento</h2>
                <div className="payment-options">
                  {['PIX', 'CREDITO', 'DEBITO'].map(tipo => (
                    <label key={tipo} className={`payment-option ${tipoPagamento === tipo ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="pagamento"
                        value={tipo}
                        checked={tipoPagamento === tipo}
                        onChange={() => setTipoPagamento(tipo)}
                      />
                      <span>{tipo === 'PIX' ? '🔑 PIX' : tipo === 'CREDITO' ? '💳 Crédito' : '💳 Débito'}</span>
                    </label>
                  ))}
                </div>
                <button
                  className="btn-primary checkout-next"
                  onClick={handleFinalizar}
                  disabled={loading}
                >
                  {loading ? 'Processando...' : 'Finalizar pedido'}
                </button>
              </div>
            )}
          </section>

          {/* Sidebar resumo */}
          <aside className="checkout-sidebar">
            <h3>Total do pedido</h3>
            <p className="checkout-total">
              {totalPreco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
            <p className="checkout-items-count">{itens.reduce((a, i) => a + i.quantidade, 0)} itens</p>
          </aside>
        </div>
      </div>
    </main>
  )
}
