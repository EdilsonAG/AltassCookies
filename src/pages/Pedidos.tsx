import { useEffect, useState } from 'react'
import { pedidoService } from '../services/api'
import type { PedidoResponse } from '../types'
import './Pedidos.css'

const statusLabel: Record<string, { label: string; color: string }> = {
  CRIADO:    { label: 'Criado',    color: '#7B5C3A' },
  PAGO:      { label: 'Pago',      color: '#4A7C59' },
  CANCELADO: { label: 'Cancelado', color: '#8B3A3A' },
  ENVIADO:   { label: 'Enviado',   color: '#2A6090' },
  ENTREGUE:  { label: 'Entregue',  color: '#4A7C59' },
}

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<PedidoResponse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    pedidoService.listar()
      .then(setPedidos)
      .catch(() => setPedidos([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="pedidos-loading">Carregando pedidos...</div>

  return (
    <main className="pedidos-page">
      <div className="container">
        <h1 className="page-title">Meus Pedidos</h1>

        {pedidos.length === 0 ? (
          <p className="empty-state">Você ainda não fez nenhum pedido.</p>
        ) : (
          <div className="pedidos-list">
            {pedidos.map(pedido => {
              const st = statusLabel[pedido.status] ?? { label: pedido.status, color: '#7B5C3A' }
              return (
                <div key={pedido.id} className="pedido-card">
                  <div className="pedido-card__header">
                    <h3>Pedido #{pedido.id}</h3>
                    <span className="pedido-card__status" style={{ color: st.color }}>
                      {st.label}
                    </span>
                  </div>

                  <div className="pedido-card__itens">
                    {pedido.itens.map(item => (
                      <div key={item.id} className="pedido-item">
                        <span>{item.nomeProduto} × {item.quantidade}</span>
                        <span>{(item.precoUnitario * item.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pedido-card__footer">
                    <span>Total</span>
                    <span className="pedido-card__total">
                      {pedido.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
